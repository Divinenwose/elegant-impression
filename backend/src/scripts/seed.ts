import mongoose from 'mongoose';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import { parse } from 'csv-parse/sync';
import Product from '../models/Product';
import Content from '../models/Content';
import Category from '../models/Category';
import connectDB from '../config/db';
import { uploadImage } from '../services/imageService';

dotenv.config();

// --- Default Content Data ---
const contents = [
    {
        type: 'shipping_policy',
        content: `
      <h2>Shipping Policy</h2>
      <h3>8.1 Shipping Partners</h3>
      <ul>
        <li><strong>United Kingdom:</strong> Royal Mail</li>
        <li><strong>International:</strong> DHL / FedEx / DPD</li>
      </ul>
      <h3>8.2 Order Processing Time</h3>
      <ul>
        <li><strong>Standard orders:</strong> 1–3 working days</li>
        <li><strong>Customized items:</strong> (wigs, styling, colouring, bleaching, texturing, or increased density): +2–5 additional working days</li>
        <li>Urgent processing requires customer contact before order placement.</li>
      </ul>
      <h3>8.3 Shipping Time</h3>
      <ul>
        <li><strong>United Kingdom:</strong> 2–7 working days</li>
        <li><strong>International (Express):</strong> 5–12 working days</li>
      </ul>
      <p>98% of customers receive orders within 15 days.</p>
      <h3>8.4 Shipping Costs</h3>
      <p>Shipping costs vary based on Location and Order weight. Customer bears shipping costs for voluntary cancellations or returns.</p>
      <h3>8.5 Address Modification</h3>
      <p>Address changes allowed within 12 hours of order placement. Address cannot be changed after dispatch.</p>
    `
    },
    {
        type: 'refund_policy',
        content: `
      <h2>Refund & Return Policy</h2>
      <h3>9.1 Refund Window</h3>
      <ul>
        <li>Refunds or exchanges accepted within 14 days of purchase.</li>
        <li>Defective or incorrect items must be reported within 14 days of receipt.</li>
      </ul>
      <h3>9.2 Non-Refundable Items</h3>
      <ul>
        <li>Customized wigs (including custom cap size) are non-refundable.</li>
        <li>Minor colour differences due to lighting or screen resolution are not defects.</li>
      </ul>
      <h3>9.3 Return Conditions</h3>
      <p>Returned items must:</p>
      <ul>
        <li>Be unworn, unwashed, and uncombed</li>
        <li>Not be dyed or altered</li>
        <li>Have lace uncut</li>
        <li>Retain original packaging</li>
        <li>Maintain original texture and curls</li>
      </ul>
      <p>Used or damaged products may result in partial refunds or deductions.</p>
    `
    },
    {
        type: 'contact_info',
        content: `
      <h2>Contact Us</h2>
      <p><strong>Phone:</strong> 07831331434</p>
      <p><strong>Email:</strong> justelegantimpressions@gmail.com</p>
    `
    }
];

// --- Helpers ---

const cleanPrice = (priceStr: string): number => {
    if (!priceStr) return 0;
    const cleaned = priceStr.replace(/[^\d.]/g, '');
    return parseFloat(cleaned) || 0;
};

const findAndUploadImages = async (productName: string): Promise<string[]> => {
    const assetsDir = path.join(__dirname, '../../assets/product_images');
    if (!fs.existsSync(assetsDir)) {
        console.warn(`Warning: Assets directory not found at ${assetsDir}`);
        return [];
    }

    const allFiles = fs.readdirSync(assetsDir);
    const extensions = ['.jpg', '.jpeg', '.png', '.webp'];
    const images: string[] = [];

    // Heuristics for matching
    const cleanName = productName.replace(/Elegant Hair\s+/i, '').trim();
    const simpleName = cleanName.replace(/\s+/g, '-').toLowerCase();
    const nameWithoutExtension_word = cleanName.replace(/Extension/i, '').trim();

    // Spelling fixes
    const spellingFix = (name: string) => name.replace(/Crotchet/i, 'Crochet').replace(/Crochet/i, 'Crotchet');

    const searchTerms = [
        cleanName,
        nameWithoutExtension_word,
        simpleName,
        productName,
        spellingFix(cleanName),
        spellingFix(productName)
    ];

    console.log(`Searching images for "${productName}"...`);

    for (const file of allFiles) {
        const lowerFile = file.toLowerCase();
        const fileBase = path.parse(file).name;

        if (!extensions.some(ext => lowerFile.endsWith(ext))) continue;

        let match = false;
        for (const term of searchTerms) {
            const lowerTerm = term.toLowerCase();
            const lowerFileBase = fileBase.toLowerCase();

            if (lowerFileBase === lowerTerm) match = true;
            if (lowerFileBase.startsWith(lowerTerm)) match = true;

            // Fuzzy special cases
            if (productName.includes("Deep Wave") && lowerFile.includes("deep wave")) match = true;
            if (productName.includes("Afro Kinky") && lowerFile.includes("afro-kinky")) match = true;
            if (productName.includes("French Curls") && lowerFile.includes("french curl")) match = true;
            if (productName.includes("Loose Curls") && lowerFile.includes("loose curl")) match = true;
            if (productName.includes("Bone Straight") && lowerFile.includes("bone straight")) match = true;
        }

        if (match) {
            const filePath = path.join(assetsDir, file);
            try {
                console.log(`  > Found match: ${file}`);
                const url = await uploadImage(filePath, 'products');
                images.push(url);
            } catch (e) {
                console.error(`  > Failed to upload ${file}`, e);
            }
        }
    }

    return [...new Set(images)];
};

// --- CSV Processors ---

async function processProductCSV(filePath: string) {
    console.log(`\nImporting PRODUCTS from: ${path.basename(filePath)}`);
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const records = parse(fileContent, { relax_column_count: true, skip_empty_lines: true, from_line: 1 });

    const headerRow = records[0];
    const colorColumns: { index: number, name: string }[] = [];
    headerRow.forEach((col: string, idx: number) => {
        if (idx > 3 && col && !col.toLowerCase().includes('specifications')) {
            colorColumns.push({ index: idx, name: col.trim() });
        }
    });

    let currentCategoryName = '';
    let currentProdName = '';
    const productsMap = new Map<string, any>();

    console.log(`Parsed ${records.length} records.`);

    for (let i = 1; i < records.length; i++) {
        const row = records[i];
        if (row.length < 2) continue;

        const catName = row[0]?.trim();
        const prodName = row[1]?.trim();
        const length = row[2]?.trim();

        let productToUpdate = null;

        if (prodName) {
            currentProdName = prodName;
            currentCategoryName = catName || currentCategoryName;

            if (!productsMap.has(prodName)) {
                let category = await Category.findOne({ name: new RegExp(currentCategoryName || 'General', 'i') });
                if (!category) {
                    const catName = currentCategoryName || 'General';
                    category = await Category.create({ name: catName, slug: catName.toLowerCase().replace(/\s+/g, '-') });
                }

                // Initial Product Object
                productToUpdate = {
                    name: prodName,
                    slug: prodName.toLowerCase().trim().replace(/[^\w\s-]/g, '').replace(/[\s_-]+/g, '-'),
                    description: row[row.length - 1] || '',
                    price: 9999, // placeholder
                    category: category?._id,
                    variants: [],
                    images: await findAndUploadImages(prodName),
                    hasMatrix: true,
                    type: 'physical',
                    isVisible: true,
                    content: ''
                };
                productsMap.set(prodName, productToUpdate);
            } else {
                productToUpdate = productsMap.get(prodName);
            }
        } else if (currentProdName && length) {
            productToUpdate = productsMap.get(currentProdName);
        }

        if (productToUpdate && length) {
            for (const col of colorColumns) {
                const priceStr = row[col.index];
                if (priceStr) {
                    const price = cleanPrice(priceStr);
                    if (price > 0) {
                        productToUpdate.variants.push({
                            attributes: new Map(Object.entries({
                                Length: length,
                                Color: col.name
                            })),
                            price: price,
                            stock: 100,
                            sku: `${productToUpdate.name}-${length}-${col.name}`.replace(/[\s\/]+/g, '-').toUpperCase()
                        });
                    }
                }
            }
        }
    }

    // Save
    for (const [name, pData] of productsMap) {
        if (pData.variants.length > 0) {
            pData.price = Math.min(...pData.variants.map((v: any) => v.price));
        }

        // Ensure unique slug
        let slug = pData.slug;
        let counter = 1;
        while (await Product.findOne({ slug })) {
            slug = `${pData.slug}-${counter}`;
            counter++;
        }
        pData.slug = slug;

        await Product.create(pData);
        console.log(`Saved Product: ${name} (${pData.variants.length} variants) - Slug: ${slug}`);
    }
}

async function processServiceCSV(filePath: string) {
    console.log(`\nImporting SERVICES from: ${path.basename(filePath)}`);
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const records = parse(fileContent, { relax_column_count: true, skip_empty_lines: true });

    let currentCategoryName = 'Services';
    let category: any = null;

    // Linear Scan
    for (let i = 0; i < records.length; i++) {
        const row = records[i];

        // Detect Category Block
        if (row[1] && row[1].startsWith('Services Under')) {
            currentCategoryName = row[1].replace('Services Under', '').trim();
            // Find/Create specific service category
            category = await Category.findOne({ name: new RegExp(currentCategoryName, 'i') });
            if (!category) {
                category = await Category.create({ name: currentCategoryName, slug: currentCategoryName.toLowerCase().replace(/\s+/g, '-') });
            }
            continue;
        }

        // Header Check
        if (row[2] === 'Length' && row[5] === 'Price') continue;

        // Data Check
        const serviceName = row[1]?.trim();
        const length = row[2]?.trim();
        const sizeStr = row[3]?.trim();
        const priceStr = row[5]?.trim();

        if (serviceName && length && sizeStr && priceStr) {
            const sizes = sizeStr.split(',').map((s: string) => s.trim());
            const prices = priceStr.split(',').map((s: string) => cleanPrice(s));

            // Find or Create Product (Service)
            let service = await Product.findOne({ name: serviceName, type: 'service' });

            if (!service) {
                // Ensure default category if we haven't hit a block yet
                if (!category) {
                    category = await Category.findOne({ name: 'Services' });
                    if (!category) category = await Category.create({ name: 'Services', slug: 'services' });
                }

                // Create temporary object to verify data and slug
                const tempService = {
                    name: serviceName,
                    slug: serviceName.toLowerCase().trim().replace(/[^\w\s-]/g, '').replace(/[\s_-]+/g, '-'),
                    description: `Professional ${serviceName} service`,
                    category: category._id,
                    variants: [] as any[],
                    images: await findAndUploadImages(serviceName),
                    hasMatrix: true,
                    type: 'service',
                    isVisible: true,
                    content: ''
                };
                // Ensure unique slug
                let slug = tempService.slug;
                let counter = 1;
                while (await Product.findOne({ slug })) {
                    slug = `${tempService.slug}-${counter}`;
                    counter++;
                }
                tempService.slug = slug;

                // Create variants for new service
                for (let j = 0; j < sizes.length; j++) {
                    const s = sizes[j];
                    const priceIndex = Math.min(j, prices.length - 1);
                    const finalPrice = prices[priceIndex] || prices[0];
                    if (s && finalPrice > 0) {
                        tempService.variants.push({
                            attributes: new Map(Object.entries({ Length: length, Size: s })),
                            price: finalPrice,
                            stock: 999,
                            sku: `${serviceName}-${length}-${s}`.replace(/[\s\/]+/g, '-').toUpperCase()
                        });
                    }
                }

                // Calculate base price
                if (tempService.variants.length > 0) {
                    (tempService as any).price = Math.min(...tempService.variants.map((v: any) => v.price));
                } else {
                    (tempService as any).price = 0;
                }

                service = await Product.create(tempService);
                console.log(`Created Service: ${serviceName}`);
            } else {
                // Existing service, just add variants
                const newVariants: any[] = [];
                for (let j = 0; j < sizes.length; j++) {
                    const s = sizes[j];
                    const priceIndex = Math.min(j, prices.length - 1);
                    const finalPrice = prices[priceIndex] || prices[0];
                    if (s && finalPrice > 0) {
                        newVariants.push({
                            attributes: new Map(Object.entries({ Length: length, Size: s })),
                            price: finalPrice,
                            stock: 999,
                            sku: `${serviceName}-${length}-${s}`.replace(/[\s\/]+/g, '-').toUpperCase()
                        });
                    }
                }

                await Product.findOneAndUpdate(
                    { name: serviceName, type: 'service' },
                    {
                        // Don't change slug or other props, maybe update price if lower?
                        // Keep it simple.
                        $addToSet: { variants: { $each: newVariants } }
                    },
                    { upsert: true, new: true }
                );
            }
            console.log(`Updated Service: ${serviceName}`);
        }
    }
}


// --- Main ---

const seedData = async () => {
    try {
        await connectDB();
        console.log('--- CLEAN SEED STARTED ---');
        console.log('Clearing ALL existing data...');
        await Product.deleteMany({});
        await Content.deleteMany({});
        await Category.deleteMany({});

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

        console.log('Seeding Content...');
        await Content.insertMany(contents);

        console.log('--- CLEAN SEED COMPLETE ---');
        process.exit();
    } catch (error) {
        console.error('Error with data seeding', error);
        process.exit(1);
    }
};

seedData();
