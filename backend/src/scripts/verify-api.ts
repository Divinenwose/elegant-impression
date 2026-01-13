import dotenv from 'dotenv';
import mongoose from 'mongoose';
import connectDB from '../config/db';
import Order from '../models/Order';

dotenv.config();

const API_URL = `http://localhost:${process.env.PORT || 5000}`;

const verifyApi = async () => {
    try {
        console.log(`Checking API at ${API_URL}...`);

        // 1. Fetch Products
        console.log('\n--- 1. Fetching Products ---');
        const productsRes = await fetch(`${API_URL}/api/products`);
        console.log(`Status: ${productsRes.status}`);
        const products: any[] = await productsRes.json();
        console.log(`Products Found: ${products.length}`);
        if (products.length > 0) {
            console.log('Sample Product:', products[0].name);
        }

        // 2. Fetch Content
        console.log('\n--- 2. Fetching Shipping Policy ---');
        const contentRes = await fetch(`${API_URL}/api/content/shipping_policy`);
        console.log(`Status: ${contentRes.status}`);
        if (contentRes.ok) {
            console.log('Content Retrieved successfully.');
        } else {
            console.log('Error fetching content.');
        }

        // 3. Create Dummy Order
        console.log('\n--- 3. Creating Dummy Order ---');
        if (products.length > 0) {
            const product = products[0];
            const orderData = {
                customer: {
                    name: 'Test User',
                    email: 'test@example.com',
                    address: {
                        line1: '123 Test St',
                        city: 'Test City',
                        postalCode: '12345',
                        country: 'UK'
                    }
                },
                items: [{
                    product: product._id,
                    name: product.name,
                    quantity: 1,
                    priceAtPurchase: product.price
                }],
                shippingCost: 5.00,
                totalAmount: product.price + 5.00
            };

            const orderRes = await fetch(`${API_URL}/api/orders`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(orderData)
            });

            console.log(`Status: ${orderRes.status}`);
            const responseData: any = await orderRes.json();

            if (orderRes.ok) {
                console.log(`Order Created: ID ${responseData.order._id}`);
                console.log(`Client Secret Received: ${responseData.clientSecret ? 'Yes' : 'No'}`);

                // Clean up
                await connectDB();
                await Order.findByIdAndDelete(responseData.order._id);
                console.log('Dummy order deleted from DB.');
            } else {
                console.log('Order creation failed.');
                console.log('Server Message:', responseData.message);
                if (responseData.error && responseData.error.includes('api_key')) {
                    console.log('NOTE: Stripe API Key is invalid or missing in .env. This is expected if you haven\'t added your real key yet.');
                }
            }

            process.exit(0);
        } else {
            console.log('Skipping order creation - no products found.');
            process.exit(0);
        }
    } catch (error) {
        console.error('Error:', error);
        process.exit(1);
    }
};

verifyApi();
