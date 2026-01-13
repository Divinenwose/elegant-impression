import mongoose, { Schema, Document } from 'mongoose';

export interface IProduct extends Document {
    name: string;
    description?: string;
    price: number;
    category: string;
    isVisible: boolean;
    images: string[];
    options?: {
        name: string; // e.g., "Length", "Texture"
        values: {
            value: string;
            price?: number; // Override price or add to base price? simplest is specific price for that option
        }[];
    }[];
    stock: number;
}

const ProductSchema: Schema = new Schema({
    name: { type: String, required: true },
    description: { type: String },
    price: { type: Number, required: true },
    category: { type: String, required: true },
    isVisible: { type: Boolean, default: true },
    images: [{ type: String }],
    options: [{
        name: { type: String },
        values: [{
            value: { type: String },
            price: { type: Number } // If present, overrides base price for this specific choice
        }]
    }],
    stock: { type: Number, default: 0 }
}, {
    timestamps: true
});

export default mongoose.model<IProduct>('Product', ProductSchema);
