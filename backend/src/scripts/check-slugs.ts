// src/scripts/check-slugs.ts
import mongoose from 'mongoose';
import Product from '../models/Product';
import connectDB from '../config/db';
import dotenv from 'dotenv';

dotenv.config();

const check = async () => {
    await connectDB();
    const products = await Product.find({}, 'name slug images');
    console.table(products.map(p => ({
        id: p._id.toString(),
        name: p.name,
        slug: p.slug,
        imagesCount: p.images.length
    })));
    process.exit();
};
check();
