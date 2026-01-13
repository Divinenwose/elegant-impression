import mongoose, { Schema, Document } from 'mongoose';

export interface IContent extends Document {
    type: 'shipping_policy' | 'refund_policy' | 'contact_info';
    content: string; // HTML or Markdown content
    lastUpdated: Date;
}

const ContentSchema: Schema = new Schema({
    type: { type: String, required: true, unique: true, enum: ['shipping_policy', 'refund_policy', 'contact_info'] },
    content: { type: String, required: true },
    lastUpdated: { type: Date, default: Date.now }
}, {
    timestamps: true
});

export default mongoose.model<IContent>('Content', ContentSchema);
