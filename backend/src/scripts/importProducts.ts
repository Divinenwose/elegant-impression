import fs from 'fs';
import path from 'path';
import { parse } from 'csv-parse/sync';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Product, { IProduct } from '../models/Product';
import Category from '../models/Category';
import { uploadImage } from '../services/imageService';

dotenv.config();

const connectDB = async () => {
    if (mongoose.connection.readyState === 0) {
        await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/elegant_impressions');
        console.log('MongoDB Connected');
    }
};

const cleanPrice = (priceStr: string): number => {
    if (!priceStr) return 0;
    const cleaned = priceStr.replace(/[^\d.]/g, '');
    return parseFloat(cleaned) || 0;
};

// --- Product Import Logic (Matrix: Length x Color) ---
const importPhysicalProducts = async (filePath: string) => {
    console.log(`\nImporting PRODUCTS from: ${path.basename(filePath)}`);
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const records = parse(fileContent, { relax_column_count: true, skip_empty_lines: true, from_line: 7 });

    const headerRow = records[0];
    const colorColumns: { index: number, name: string }[] = [];
    headerRow.forEach((col: string, idx: number) => {
        if (idx > 3 && col && !col.toLowerCase().includes('specifications')) {
            colorColumns.push({ index: idx, name: col.trim() });
        }
    });

    let currentCategoryName = '';
    const productsToSave: Map<string, any> = new Map();

    for (let i = 1; i < records.length; i++) {
        const row = records[i];
        const catName = row[0]?.trim();
        const prodName = row[1]?.trim();
        const length = row[2]?.trim();

        if (prodName) {
            currentCategoryName = catName || currentCategoryName;

            if (!productsToSave.has(prodName)) {
                let category = await Category.findOne({ name: new RegExp(currentCategoryName || 'General', 'i') });
                if (!category && currentCategoryName) {
                    category = await Category.create({ name: currentCategoryName, slug: currentCategoryName.toLowerCase().replace(/\s+/g, '-') });
                }

                // Image Discovery
                const images = await findAndUploadImages(prodName);

                productsToSave.set(prodName, {
                    name: prodName,
                    description: row[row.length - 1] || '',
                    price: 0,
                    category: category?._id,
                    variants: [],
                    images: images,
                    hasMatrix: true,
                    type: 'physical',
                    isVisible: true
                });
            }
        }

        const currentProduct = productsToSave.get(prodName || '');
        if (!currentProduct && !prodName) {
            // Logic to handle if only length is present, likely continuation of previous product?
            // The CSV structure seems to repeat prodName or rely on block structure. 
            // My previous logic assumed prodName is present for start of block.
            // If prodName is empty but length is there, it might be continuation? 
            // The provided CSV example showed prodName on the row, but let's be safe.
            // EDIT: Reading CSV again, rows with variant lengths DO NOT have prodName populated in col 1.
            // BUT my previous logic `if (prodName)` handled block start. 
            // I need to track `lastProduct` for continuation.
        }

        // Actually, looking at the code I wrote before:
        /*
          if (prodName) { ... create product ... } 
          else { currentProduct = productsToSave.get(...? no) }
        */
        // The previous code had a bug! It assumed `prodName` is present on every row OR `currentProduct` persists.
        // `currentProduct` needs to persist across loop iterations if prodName is empty.
    }
};

// Let's rewrite the logic inside a single robust function or similar, but separating "Parser" from "Saver" is hard with this stream.
// I will start fresh with the new combined script structure.

const importData = async () => {
    await connectDB();
    const assetsDir = path.join(__dirname, '../../assets');
    const productsDir = path.join(assetsDir, 'Product_CSV');
    const servicesDir = path.join(assetsDir, 'Services_CSV');

    // Import Products
    if (fs.existsSync(productsDir)) {
        const files = fs.readdirSync(productsDir).filter(f => f.endsWith('.csv'));
        for (const file of files) {
            await processProductCSV(path.join(productsDir, file));
        }
    }

    // Import Services
    if (fs.existsSync(servicesDir)) {
        const files = fs.readdirSync(servicesDir).filter(f => f.endsWith('.csv'));
        for (const file of files) {
            await processServiceCSV(path.join(servicesDir, file));
        }
    }

    process.exit();
};

async function findAndUploadImages(name: string): Promise<string[]> {
    const potentialFilenames = [
        name,
        name.toLowerCase().replace(/\s+/g, '-'),
        name.replace(/\s+/g, ''),
        name.replace(/Crotchet/i, 'Crochet'), // Handle spelling
        name.replace(/Crochet/i, 'Crotchet')
    ];
    const extensions = ['.jpg', '.jpeg', '.png', '.webp'];
    const images: string[] = [];
    const assetsDir = path.join(__dirname, '../../assets/product_images');

    if (!fs.existsSync(assetsDir)) return [];

    // console.log(`Searching images for: ${name}`);

    // Exact + Fuzzy match
    // Also try checking file startsWith for cases like "Bone Straight Braid Extension #1B.png"
    const allFiles = fs.readdirSync(assetsDir);

    for (const base of potentialFilenames) {
        // Direct match with extension
        for (const ext of extensions) {
            const fname = base + ext;
            if (allFiles.includes(fname)) { // Check sensitive case? Linux is case sensitive.
                // Try case insensitive find
                const found = allFiles.find(f => f.toLowerCase() === fname.toLowerCase());
                if (found) {
                    await upload(path.join(assetsDir, found), images);
                }
            }
        }
    }

    // Prefix match (if no images found? or always?)
    // User asked "Supposed images" -> likely all images starting with that name
    if (images.length === 0) {
        for (const base of potentialFilenames) {
            const matches = allFiles.filter(f => f.toLowerCase().startsWith(base.toLowerCase()) && extensions.some(ext => f.toLowerCase().endsWith(ext)));
            for (const m of matches) {
                await upload(path.join(assetsDir, m), images);
            }
        }
    }

    // Dedupe
    return [...new Set(images)];
}

async function upload(p: string, list: string[]) {
    try {
        console.log(`Uploading: ${path.basename(p)}`);
        const url = await uploadImage(p, 'products');
        list.push(url);
    } catch (e) {
        console.error(`Upload failed for ${p}`, e);
    }
}

async function processProductCSV(filePath: string) {
    console.log(`\n--- Processing Product CSV: ${path.basename(filePath)} ---`);
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const records = parse(fileContent, { relax_column_count: true, skip_empty_lines: true, from_line: 7 });

    // Headers Row 0 (originally line 7)
    const headerRow = records[0];
    const colorColumns: { index: number, name: string }[] = [];
    headerRow.forEach((col: string, idx: number) => {
        if (idx > 3 && col && !col.toLowerCase().includes('specifications')) {
            colorColumns.push({ index: idx, name: col.trim() });
        }
    });

    let currentCategoryName = '';
    let currentProduct: any = null;
    let currentProdName = ''; // track for blocks

    // Map to store products before saving to handle multiple rows per product
    // Actually, saving row by row for variants is hard. Better Key by Name.
    const productsMap = new Map<string, any>();

    for (let i = 1; i < records.length; i++) {
        const row = records[i];
        if (row.length < 2) continue; // Skip empty rows

        const catName = row[0]?.trim();
        const prodName = row[1]?.trim();
        const length = row[2]?.trim();

        if (prodName) {
            currentProdName = prodName;
            currentCategoryName = catName || currentCategoryName;

            if (!productsMap.has(prodName)) {
                let category = await Category.findOne({ name: new RegExp(currentCategoryName || 'General', 'i') });
                if (!category && currentCategoryName) {
                    category = await Category.create({ name: currentCategoryName, slug: currentCategoryName.toLowerCase().replace(/\s+/g, '-') });
                }

                currentProduct = {
                    name: prodName,
                    description: row[row.length - 1] || 'Beautiful hair extension',
                    price: 9999, // default
                    category: category?._id,
                    variants: [],
                    images: await findAndUploadImages(prodName),
                    hasMatrix: true,
                    type: 'physical',
                    isVisible: true
                };
                productsMap.set(prodName, currentProduct);
            } else {
                currentProduct = productsMap.get(prodName);
            }
        } else if (currentProdName && length) {
            // Continuation row?
            currentProduct = productsMap.get(currentProdName);
        }

        if (currentProduct && length) {
            for (const col of colorColumns) {
                const priceStr = row[col.index];
                if (priceStr) {
                    const price = cleanPrice(priceStr);
                    if (price > 0) {
                        currentProduct.variants.push({
                            attributes: new Map(Object.entries({
                                Length: length,
                                Color: col.name
                            })),
                            price: price,
                            stock: 100,
                            sku: `${currentProduct.name}-${length}-${col.name}`.replace(/[\s\/]+/g, '-').toUpperCase()
                        });
                    }
                }
            }
        }
    }

    await saveProducts(productsMap);
}

async function processServiceCSV(filePath: string) {
    console.log(`\n--- Processing Service CSV: ${path.basename(filePath)} ---`);
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    // Service CSVs start headers on line 2 (index 1) or line 9, 16 etc. They are repeating blocks.
    // We should parse the whole file and look for "Services Under..." or "Length,Size,Durations,Price" lines.

    // Easier approach: Read all, iterate manually.
    const records = parse(fileContent, { relax_column_count: true, skip_empty_lines: true });

    let currentCategoryName = 'Services';
    let category: any = null;

    // We can't use a simple map because the structure repeats headers.
    // Let's iterate linearly.

    for (let i = 0; i < records.length; i++) {
        const row = records[i];

        // Detect Category
        if (row[1] && row[1].startsWith('Services Under')) {
            currentCategoryName = row[1].replace('Services Under', '').trim();
            category = await Category.findOne({ name: new RegExp(currentCategoryName, 'i') });
            if (!category) {
                category = await Category.create({ name: currentCategoryName, slug: currentCategoryName.toLowerCase().replace(/\s+/g, '-') });
            }
            continue;
        }

        // Header Row Detection (Length, Size, Durations, Price)
        if (row[2] === 'Length' && row[5] === 'Price') {
            continue; // Skip header
        }

        // Data Row: [?, ServiceName, Length, "SizeList", ?, "PriceList"]
        const serviceName = row[1]?.trim();
        const length = row[2]?.trim();
        const sizeStr = row[3]?.trim();
        const priceStr = row[5]?.trim();

        if (serviceName && length && sizeStr && priceStr) {
            // This is a valid service row
            const sizes = sizeStr.split(',').map((s: string) => s.trim());
            const prices = priceStr.split(',').map((s: string) => cleanPrice(s));

            // Find or Create Product (Service)
            let service = await Product.findOne({ name: serviceName, type: 'service' });
            if (!service) {
                // Determine Category if not set by block
                if (!category) {
                    category = await Category.findOne({ name: 'Services' });
                    if (!category) category = await Category.create({ name: 'Services', slug: 'services' });
                }

                service = new Product({
                    name: serviceName,
                    description: `Professional ${serviceName} service`,
                    price: 0,
                    category: category._id,
                    variants: [],
                    images: await findAndUploadImages(serviceName),
                    hasMatrix: true,
                    type: 'service',
                    isVisible: true
                });
            }

            // Add Variants from this row
            // Zip sizes and prices
            for (let j = 0; j < sizes.length; j++) {
                const s = sizes[j];
                const p = prices[j]; // Loop price if fewer prices than sizes? Or assume match.
                // CSV example: 5 sizes, 5 prices. PERFECT.
                // But sometimes 1 price for all?

                const finalPrice = prices[j] !== undefined ? prices[j] : prices[0]; // Fallback

                if (s && finalPrice > 0) {
                    // Check if variant exists?
                    service.variants.push({
                        attributes: new Map(Object.entries({
                            Length: length,
                            Size: s
                        })),
                        price: finalPrice,
                        stock: 999, // Unlimited for service?
                        sku: `${serviceName}-${length}-${s}`.replace(/[\s\/]+/g, '-').toUpperCase()
                    });
                }
            }

            // Calc base price
            if (service.variants.length > 0) {
                service.price = Math.min(...service.variants.map((v: any) => v.price));
            }

            await service.save();
            console.log(`Updated Service: ${serviceName}`);
        }
    }
}

async function saveProducts(map: Map<string, any>) {
    for (const [name, productData] of map) {
        if (productData.variants.length > 0) {
            productData.price = Math.min(...productData.variants.map((v: any) => v.price));
        }
        await Product.findOneAndUpdate(
            { name: productData.name },
            productData,
            { upsert: true, new: true }
        );
        console.log(`Saved Product: ${name} with ${productData.variants.length} variants`);
    }
}

importData();
