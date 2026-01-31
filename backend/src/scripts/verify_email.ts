import dotenv from 'dotenv';
// Load env first
dotenv.config();

import { sendOrderConfirmation } from '../services/emailService';

const testOrder = {
    _id: 'TEST-ORDER-12345',
    customer: {
        firstName: 'Test',
        lastName: 'User',
        email: process.env.ADMIN_EMAIL || 'agabus_lite_test@example.com', // Use admin email as recipient for safety
        address: {
            line1: '123 Test St',
            city: 'Test City',
            postal_code: 'TE1 1ST'
        }
    },
    items: [
        {
            product: { name: 'Test Product' },
            quantity: 1,
            price: 10.00
        }
    ],
    totalAmount: 13.99
};

const run = async () => {
    console.log('--- Email Verification Test ---');
    console.log(`Sending test email to: ${testOrder.customer.email}`);
    try {
        await sendOrderConfirmation(testOrder);
        console.log('Test function executed without crash.');
        console.log('Check console above for "[EMAIL] Sent successfully" or "[EMAIL] Resend Error"');
    } catch (error) {
        console.error('Test crashed:', error);
    }
};

run();
