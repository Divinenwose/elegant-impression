import mongoose, { Schema, Document } from 'mongoose';

export interface IProduct extends Document {
    name: string;
    description?: string;
    price: number;
    category: mongoose.Types.ObjectId;
    isVisible: boolean;
    images: string[];
    variants: {
        attributes: Map<string, string>;
        price: number;
        stock: number;
        sku?: string;
    }[];
    hasMatrix: boolean;
    type: 'physical' | 'service';
    options?: { // Keeping for simple products or backwards compat if needed
        name: string;
        values: {
            value: string;
            price?: number;
        }[];
    }[];
    stock: number;
    weight_grams?: number;
    reviews: {
        user: string;
        rating: number;
        comment: string;
        verified: boolean;
        createdAt: Date;
    }[];
    averageRating: number;
    numReviews: number;
}

const ProductSchema: Schema = new Schema({
    name: { type: String, required: true },
    description: { type: String },
    price: { type: Number, required: true },
    category: { type: Schema.Types.ObjectId, ref: 'Category', required: true },
    isVisible: { type: Boolean, default: true },
    images: [{ type: String }],
    variants: [{
        attributes: { type: Map, of: String },
        price: { type: Number, required: true },
        stock: { type: Number, default: 0 },
        sku: { type: String }
    }],
    hasMatrix: { type: Boolean, default: false },
    type: { type: String, enum: ['physical', 'service'], default: 'physical' },
    options: [{
        name: { type: String },
        values: [{
            value: { type: String },
            price: { type: Number }
        }]
    }],
    stock: { type: Number, default: 0 },
    weight_grams: { type: Number, default: 0 },
    reviews: [{
        user: { type: String, required: true },
        rating: { type: Number, required: true, min: 1, max: 5 },
        comment: { type: String, required: true },
        verified: { type: Boolean, default: false },
        createdAt: { type: Date, default: Date.now }
    }],
    averageRating: { type: Number, default: 0 },
    numReviews: { type: Number, default: 0 }
}, {
    timestamps: true
});

export default mongoose.model<IProduct>('Product', ProductSchema);
