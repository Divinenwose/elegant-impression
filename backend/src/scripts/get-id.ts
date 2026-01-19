import mongoose from 'mongoose';
import Product from '../models/Product';
import dotenv from 'dotenv';

dotenv.config();

const getProductId = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/elegant_impressions');
        const product = await Product.findOne();
        if (product) {
            console.log(product._id);
        } else {
            console.log('NO_PRODUCT');
        }
        process.exit();
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

getProductId();
