import { Request, Response } from 'express';
import Product from '../models/Product';
import Category from '../models/Category';

export const getProducts = async (req: Request, res: Response) => {
    try {
        const { category, includeHidden } = req.query;

        let query: any = {};

        if (category) {
            // Find category by slug (or name) first if passed as string
            const categoryDoc = await Category.findOne({ slug: category });
            if (categoryDoc) {
                query.category = categoryDoc._id;
            } else {
                // If category slug passed doesn't exist, return empty
                return res.json([]);
            }
        }

        // Default to strict visibility unless includeHidden is specifically true (e.g. for admin)
        if (includeHidden !== 'true') {
            query.isVisible = true;
        }

        const products = await Product.find(query).populate('category', 'name slug');
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

export const getProductById = async (req: Request, res: Response) => {
    try {
        const product = await Product.findById(req.params.id).populate('category', 'name slug');
        if (product) {
            res.json(product);
        } else {
            res.status(404).json({ message: 'Product not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

export const createProduct = async (req: Request, res: Response) => {
    try {
        const { name, description, price, category, isVisible, images, options, stock, weight_grams, slug } = req.body;

        // Ensure category exists
        const categoryExists = await Category.findById(category);
        if (!categoryExists) {
            return res.status(400).json({ message: 'Invalid Category ID' });
        }

        const product = new Product({
            name, description, price, category, isVisible, images, options, stock, weight_grams, slug
        });
        const createdProduct = await product.save();
        res.status(201).json(createdProduct);
    } catch (error) {
        res.status(400).json({ message: 'Invalid product data', error: error });
    }
};

export const updateProduct = async (req: Request, res: Response) => {
    try {
        const product = await Product.findById(req.params.id);

        if (product) {
            product.name = req.body.name || product.name;
            product.slug = req.body.slug || product.slug;
            product.description = req.body.description || product.description;
            product.price = req.body.price || product.price;
            product.category = req.body.category || product.category;
            product.images = req.body.images || product.images;
            product.options = req.body.options || product.options;
            product.stock = req.body.stock || product.stock;
            product.weight_grams = req.body.weight_grams || product.weight_grams;

            if (req.body.isVisible !== undefined) {
                product.isVisible = req.body.isVisible;
            }

            const updatedProduct = await product.save();
            res.json(updatedProduct);
        } else {
            res.status(404).json({ message: 'Product not found' });
        }
    } catch (error) {
        res.status(400).json({ message: 'Invalid product data', error: error });
    }
};

export const deleteProduct = async (req: Request, res: Response) => {
    try {
        const product = await Product.findById(req.params.id);

        if (product) {
            await product.deleteOne();
            res.json({ message: 'Product removed' });
        } else {
            res.status(404).json({ message: 'Product not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

export const createProductReview = async (req: Request, res: Response) => {
    try {
        const { rating, comment } = req.body;
        const product = await Product.findById(req.params.id);

        if (product) {
            const alreadyReviewed = product.reviews.find(
                (r) => r.user.toString() === req.user._id.toString()
            );

            if (alreadyReviewed) {
                return res.status(400).json({ message: 'Product already reviewed' });
            }

            const review = {
                user: req.user._id,
                rating: Number(rating),
                comment,
                verified: false,
                createdAt: new Date(),
            };

            product.reviews.push(review);

            product.numReviews = product.reviews.length;

            product.averageRating =
                product.reviews.reduce((acc, item) => item.rating + acc, 0) /
                product.reviews.length;

            await product.save();
            res.status(201).json({ message: 'Review added' });
        } else {
            res.status(404).json({ message: 'Product not found' });
        }
    } catch (error) {
        res.status(400).json({ message: 'Error adding review', error });
    }
};
