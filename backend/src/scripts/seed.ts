import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Product from '../models/Product';
import Content from '../models/Content';
import connectDB from '../config/db';

dotenv.config();

const products = [
    // Visible Products - Bundles/Extensions
    {
        name: 'Elegant Hair Stretch Braid Extension',
        description: 'High quality stretch braid extension.',
        price: 6.99,
        category: 'Bundles',
        isVisible: true,
        images: [], // Placeholders or empty for now
        stock: 100,
        options: []
    },
    {
        name: 'Elegant Hair Deep Wave Braid Extension',
        description: 'Deep wave texture for a stunning look.',
        price: 7.99,
        category: 'Bundles',
        isVisible: true,
        images: [],
        stock: 100,
        options: []
    },
    {
        name: 'Elegant Hair French Curls Extension',
        description: 'Beautiful French curls.',
        price: 7.99,
        category: 'Bundles',
        isVisible: true,
        images: [],
        stock: 100,
        options: []
    },
    {
        name: 'Elegant Hair Loose Curls Extension',
        description: 'Bouncy loose curls.',
        price: 7.99,
        category: 'Bundles',
        isVisible: true,
        images: [],
        stock: 100,
        options: []
    },
    {
        name: 'Elegant Hair Bone Straight Extension',
        description: 'Sleek and smooth bone straight hair.',
        price: 7.99,
        category: 'Bundles',
        isVisible: true,
        images: [],
        stock: 100,
        options: [
            {
                name: 'Length',
                values: [
                    { value: '24 inches', price: 7.99 },
                    { value: '28 inches', price: 8.99 },
                    { value: '30 inches', price: 10.99 }
                ]
            }
        ]
    },
    {
        name: 'Elegant Bulk Vixen Crotchet Bundle',
        description: 'Vixen crotchet bundle.',
        price: 9.99,
        category: 'Bundles',
        isVisible: true,
        images: [],
        stock: 100,
        options: [
            {
                name: 'Length',
                values: [
                    { value: '26 inches', price: 9.99 }
                ]
            }
        ]
    },
    // Visible - Remy Afro Kinky Bulk (Listed in Visible line 53)
    {
        name: 'Elegant Hair 100% Remy Afro Kinky Bulk',
        description: 'Premium 100% Remy Afro Kinky hair.',
        price: 32.99, // Starting price
        category: 'Bundles',
        isVisible: true,
        images: [],
        stock: 50,
        options: [
            {
                name: 'Length',
                values: [
                    { value: '12 inches', price: 32.99 },
                    { value: '14 inches', price: 34.99 },
                    { value: '16 inches', price: 36.99 },
                    { value: '18 inches', price: 38.99 },
                    { value: '20 inches', price: 40.99 },
                    { value: '22 inches', price: 42.99 }
                ]
            }
        ]
    },
    // Hidden Categories - Wigs / Human Hair Crotchet
    {
        name: 'Elegant Hand Made Feather Hair',
        description: 'Hand made feather hair. Available in Water wave, Deep wave, Afro Kinky, Body wave and Burmese curl.',
        price: 79.99,
        category: 'Wigs', // Using Wigs/Hidden category
        isVisible: false,
        images: [],
        stock: 20,
        options: [
            {
                name: 'Length',
                values: [
                    { value: '14 inches', price: 79.99 },
                    { value: '16 inches', price: 86.99 },
                    { value: '18 inches', price: 92.99 },
                    { value: '20 inches', price: 99.99 },
                    { value: '22 inches', price: 112.99 },
                    { value: '24 inches', price: 126.99 }
                ]
            }
        ]
    }
];

const contents = [
    {
        type: 'shipping_policy',
        content: `
      <h2>Shipping Policy</h2>
      <p><strong>Shipping Partners:</strong> United Kingdom (Royal Mail), International (DHL / FedEx / DPD)</p>
      <p><strong>Order Processing Time:</strong> Standard orders: 1–3 working days. Customized items: +2–5 additional working days. Urgent processing requires contact.</p>
      <p><strong>Shipping Time:</strong> UK: 2–7 working days. International (Express): 5–12 working days.</p>
      <p><strong>Shipping Costs:</strong> Vary based on location and weight.</p>
      <p><strong>Address Modification:</strong> Allowed within 12 hours of order placement.</p>
    `
    },
    {
        type: 'refund_policy',
        content: `
      <h2>Refund & Return Policy</h2>
      <p><strong>Refund Window:</strong> 14 days of purchase. Defective items reported within 14 days.</p>
      <p><strong>Non-Refundable Items:</strong> Customized wigs. Minor color differences.</p>
      <p><strong>Return Conditions:</strong> Unworn, unwashed, lace uncut, original packaging.</p>
    `
    },
    {
        type: 'contact_info',
        content: `
      <h2>Contact Us</h2>
      <p>Phone: 07831331434</p>
      <p>Email: justelegantimpressions@gmail.com</p>
    `
    }
];

const seedData = async () => {
    try {
        await connectDB();

        console.log('Clearing existing data...');
        await Product.deleteMany({});
        await Content.deleteMany({});

        console.log('Seeding Products...');
        await Product.insertMany(products);

        console.log('Seeding Content...');
        await Content.insertMany(contents);

        console.log('Data Seeding Complete!');
        process.exit();
    } catch (error) {
        console.error('Error with data seeding', error);
        process.exit(1);
    }
};

seedData();
