import mongoose, { Schema, Document } from 'mongoose';

export interface IOrder extends Document {
    customer: {
        name: string;
        email: string;
        phone?: string;
        address: {
            line1: string;
            line2?: string;
            city: string;
            postalCode: string;
            country: string;
        };
    };
    items: {
        product: mongoose.Types.ObjectId;
        name: string; // distinct info in case product changes
        quantity: number;
        options?: { [key: string]: string }; // e.g., { "Length": "24 inches" }
        priceAtPurchase: number;
    }[];
    shippingCost: number;
    totalAmount: number;
    status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
    paymentStatus: 'pending' | 'paid' | 'failed';
    stripePaymentIntentId?: string;
}

const OrderSchema: Schema = new Schema({
    customer: {
        name: { type: String, required: true },
        email: { type: String, required: true },
        phone: { type: String },
        address: {
            line1: { type: String, required: true },
            line2: { type: String },
            city: { type: String, required: true },
            postalCode: { type: String, required: true },
            country: { type: String, required: true }
        }
    },
    items: [{
        product: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
        name: { type: String, required: true },
        quantity: { type: Number, required: true },
        options: { type: Map, of: String },
        priceAtPurchase: { type: Number, required: true }
    }],
    shippingCost: { type: Number, required: true },
    totalAmount: { type: Number, required: true },
    status: { type: String, enum: ['pending', 'processing', 'shipped', 'delivered', 'cancelled'], default: 'pending' },
    paymentStatus: { type: String, enum: ['pending', 'paid', 'failed'], default: 'pending' },
    stripePaymentIntentId: { type: String }
}, {
    timestamps: true
});

export default mongoose.model<IOrder>('Order', OrderSchema);
