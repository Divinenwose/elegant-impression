import { Request, Response } from 'express';
import Stripe from 'stripe';
import Order from '../models/Order';
import Product from '../models/Product';
import dotenv from 'dotenv';

dotenv.config();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
    apiVersion: '2025-12-15.clover',
});

export const createOrder = async (req: Request, res: Response) => {
    try {
        const { customer, items, shippingCost } = req.body;

        // 1. Calculate Total Amount Server-Side
        let calculatedTotal = 0;
        const processedItems = [];

        for (const item of items) {
            const product = await Product.findById(item.product);
            if (!product) {
                return res.status(404).json({ message: `Product not found: ${item.product}` });
            }

            // Determine price: Loop through selected options to find price overrides
            let unitPrice = product.price;

            // item.options might be Map or Object. In JSON Body it's Object.
            // Model has options as [{name: string, values: [...]}]
            // Item has options as { "Length": "24 inches" }
            if (item.options && product.options) {
                for (const [key, value] of Object.entries(item.options)) {
                    const productOption = product.options.find(opt => opt.name === key);
                    if (productOption) {
                        const selectedValue = productOption.values.find(v => v.value === value);
                        if (selectedValue && selectedValue.price) {
                            unitPrice = selectedValue.price;
                        }
                    }
                }
            }

            calculatedTotal += unitPrice * item.quantity;

            processedItems.push({
                product: product._id,
                name: product.name,
                quantity: item.quantity,
                options: item.options,
                priceAtPurchase: unitPrice
            });
        }

        const totalAmount = calculatedTotal + shippingCost;

        // 2. Create Stripe Payment Intent
        const paymentIntent = await stripe.paymentIntents.create({
            amount: Math.round(totalAmount * 100), // Stripe uses cents
            currency: 'gbp',
            automatic_payment_methods: {
                enabled: true,
            },
            metadata: {
                customer_email: customer.email,
                customer_name: customer.name
            }
        });

        // 3. Create Order in Database
        const order = new Order({
            customer,
            items: processedItems,
            shippingCost,
            totalAmount,
            status: 'pending',
            paymentStatus: 'pending',
            stripePaymentIntentId: paymentIntent.id
        });

        const createdOrder = await order.save();

        res.status(201).json({
            order: createdOrder,
            clientSecret: paymentIntent.client_secret
        });
    } catch (error: any) {
        console.error('Create Order Error:', error);
        res.status(400).json({ message: 'Invalid order data', error: error.message });
    }
};

export const getOrderById = async (req: Request, res: Response) => {
    try {
        const order = await Order.findById(req.params.id);
        if (order) {
            res.json(order);
        } else {
            res.status(404).json({ message: 'Order not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};
