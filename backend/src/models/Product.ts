import mongoose, { Schema, Document } from 'mongoose';

export interface IProduct extends Document {
    name: string;
    description?: string;
    price: number;
    category: mongoose.Types.ObjectId;  // Changed to ObjectId
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
    weight_grams?: number; // Added handling for shipping calc
}

const ProductSchema: Schema = new Schema({
    name: { type: String, required: true },
    description: { type: String },
    price: { type: Number, required: true },
    category: { type: Schema.Types.ObjectId, ref: 'Category', required: true }, // Ref to Category
    isVisible: { type: Boolean, default: true },
    images: [{ type: String }],
    options: [{
        name: { type: String },
        values: [{
            value: { type: String },
            price: { type: Number }
        }]
    }],
    stock: { type: Number, default: 0 },
    weight_grams: { type: Number, default: 0 }
}, {
    timestamps: true
});

export default mongoose.model<IProduct>('Product', ProductSchema);
