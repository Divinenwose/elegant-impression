import mongoose, { Schema, Document } from 'mongoose';

export interface ICategory extends Document {
    name: string;
    slug: string;
    isVisible: boolean;
}

const CategorySchema: Schema = new Schema({
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    isVisible: { type: Boolean, default: true }
}, {
    timestamps: true
});

export default mongoose.model<ICategory>('Category', CategorySchema);
