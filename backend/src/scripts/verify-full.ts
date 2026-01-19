import mongoose from 'mongoose';
import dotenv from 'dotenv';
import connectDB from '../config/db';
import Category from '../models/Category';
import Product from '../models/Product';
import Content from '../models/Content';

dotenv.config();

const verify = async () => {
    try {
        await connectDB();
        console.log('--- VERIFICATION START ---');

        const categories = await Category.find({});
        console.log(`Categories Found: ${categories.length}`);
        categories.forEach(c => console.log(`- ${c.name} (${c.slug}) [Visible: ${c.isVisible}]`));

        const products = await Product.find({});
        console.log(`Products Found: ${products.length}`);

        const contents = await Content.find({});
        console.log(`Content Policies Found: ${contents.length}`);
        contents.forEach(c => console.log(`- ${c.type}`));

        console.log('--- VERIFICATION END ---');
        process.exit(0);
    } catch (error) {
        console.error('Verification Failed:', error);
        process.exit(1);
    }
};

verify();
