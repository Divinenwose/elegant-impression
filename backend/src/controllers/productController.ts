import { Request, Response } from 'express';
import Product from '../models/Product';

export const getProducts = async (req: Request, res: Response) => {
    try {
        const { category, includeHidden } = req.query;

        let query: any = {};

        if (category) {
            query.category = category;
        }

        // Default to strict visibility unless includeHidden is specifically true (e.g. for admin, though no auth yet)
        // For now, public API assumes we only show visible products, or we filter by isVisible=true by default
        if (includeHidden !== 'true') {
            query.isVisible = true;
        }

        const products = await Product.find(query);
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

export const getProductById = async (req: Request, res: Response) => {
    try {
        const product = await Product.findById(req.params.id);
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
        const { name, description, price, category, isVisible, images, options, stock } = req.body;
        const product = new Product({
            name, description, price, category, isVisible, images, options, stock
        });
        const createdProduct = await product.save();
        res.status(201).json(createdProduct);
    } catch (error) {
        res.status(400).json({ message: 'Invalid product data', error: error });
    }
};
