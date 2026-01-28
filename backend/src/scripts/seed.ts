import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Product from '../models/Product';
import Content from '../models/Content';
import Category from '../models/Category';
import connectDB from '../config/db';

dotenv.config();

const visibleCategories = [
    { name: 'Bundles', slug: 'bundles', isVisible: true },
    { name: 'Elegant Hair Stretch Braid Extension', slug: 'stretch-braid', isVisible: true },
    { name: 'Elegant Hair Deep Wave Braid Extension', slug: 'deep-wave-braid', isVisible: true },
    { name: 'Elegant Hair 100% Remy Afro Kinky Bulk', slug: 'afro-kinky-bulk', isVisible: true },
    { name: 'Elegant Hair French Curls Extension', slug: 'french-curls', isVisible: true },
    { name: 'Elegant Hair Loose Curls Extension', slug: 'loose-curls', isVisible: true },
    { name: 'Elegant Hair Bone Straight Extension', slug: 'bone-straight', isVisible: true }
];

const hiddenCategories = [
    { name: 'Wigs', slug: 'wigs', isVisible: false },
    { name: 'Human Hair Bundles', slug: 'human-hair-bundles', isVisible: false },
    { name: 'Hair Care Products', slug: 'hair-care', isVisible: false },
    { name: 'Hair Accessories', slug: 'accessories', isVisible: false }
];

// Content Data based on User Request
const contents = [
    {
        type: 'shipping_policy',
        content: `
      <h2>Shipping Policy</h2>
      <h3>8.1 Shipping Partners</h3>
      <ul>
        <li><strong>United Kingdom:</strong> Royal Mail</li>
        <li><strong>International:</strong> DHL / FedEx / DPD</li>
      </ul>
      <h3>8.2 Order Processing Time</h3>
      <ul>
        <li><strong>Standard orders:</strong> 1–3 working days</li>
        <li><strong>Customized items:</strong> (wigs, styling, colouring, bleaching, texturing, or increased density): +2–5 additional working days</li>
        <li>Urgent processing requires customer contact before order placement.</li>
      </ul>
      <h3>8.3 Shipping Time</h3>
      <ul>
        <li><strong>United Kingdom:</strong> 2–7 working days</li>
        <li><strong>International (Express):</strong> 5–12 working days</li>
      </ul>
      <p>98% of customers receive orders within 15 days.</p>
      <h3>8.4 Shipping Costs</h3>
      <p>Shipping costs vary based on Location and Order weight. Customer bears shipping costs for voluntary cancellations or returns.</p>
      <h3>8.5 Address Modification</h3>
      <p>Address changes allowed within 12 hours of order placement. Address cannot be changed after dispatch.</p>
    `
    },
    {
        type: 'refund_policy',
        content: `
      <h2>Refund & Return Policy</h2>
      <h3>9.1 Refund Window</h3>
      <ul>
        <li>Refunds or exchanges accepted within 14 days of purchase.</li>
        <li>Defective or incorrect items must be reported within 14 days of receipt.</li>
      </ul>
      <h3>9.2 Non-Refundable Items</h3>
      <ul>
        <li>Customized wigs (including custom cap size) are non-refundable.</li>
        <li>Minor colour differences due to lighting or screen resolution are not defects.</li>
      </ul>
      <h3>9.3 Return Conditions</h3>
      <p>Returned items must:</p>
      <ul>
        <li>Be unworn, unwashed, and uncombed</li>
        <li>Not be dyed or altered</li>
        <li>Have lace uncut</li>
        <li>Retain original packaging</li>
        <li>Maintain original texture and curls</li>
      </ul>
      <p>Used or damaged products may result in partial refunds or deductions.</p>
    `
    },
    {
        type: 'contact_info',
        content: `
      <h2>Contact Us</h2>
      <p><strong>Phone:</strong> 07831331434</p>
      <p><strong>Email:</strong> justelegantimpressions@gmail.com</p>
    `
    }
];

const seedData = async () => {
    try {
        await connectDB();

        console.log('Clearing existing data...');
        await Product.deleteMany({});
        await Content.deleteMany({});
        await Category.deleteMany({});

        console.log('Seeding Categories...');
        const visibleCats = await Category.insertMany(visibleCategories);
        const hiddenCats = await Category.insertMany(hiddenCategories);

        // Helper to find category ID
        const getCatId = (slug: string) => {
            const cat = [...visibleCats, ...hiddenCats].find(c => c.slug === slug);
            return cat?._id;
        };

        // Define Products mapped to Categories
        // Note: Mapping products to specific categories based on name
        const products = [
            {
                name: 'Elegant Hair Stretch Braid Extension',
                description: 'High quality stretch braid extension.',
                price: 6.99,
                category: getCatId('stretch-braid'),
                isVisible: true,
                images: [],
                stock: 100,
                options: []
            },
            {
                name: 'Elegant Hair Deep Wave Braid Extension',
                description: 'Deep wave texture for a stunning look.',
                price: 7.99,
                category: getCatId('deep-wave-braid'),
                isVisible: true,
                images: [],
                stock: 100,
                options: []
            },
            {
                name: 'Elegant Hair French Curls Extension',
                description: 'Beautiful French curls.',
                price: 7.99,
                category: getCatId('french-curls'),
                isVisible: true,
                images: [],
                stock: 100,
                options: []
            },
            {
                name: 'Elegant Hair Loose Curls Extension',
                description: 'Bouncy loose curls.',
                price: 7.99,
                category: getCatId('loose-curls'),
                isVisible: true,
                images: [],
                stock: 100,
                options: []
            },
            {
                name: 'Elegant Hair Bone Straight Extension',
                description: 'Sleek and smooth bone straight hair.',
                price: 7.99,
                category: getCatId('bone-straight'),
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
                name: 'Elegant Hair 100% Remy Afro Kinky Bulk',
                description: 'Premium 100% Remy Afro Kinky hair.',
                price: 32.99,
                category: getCatId('afro-kinky-bulk'),
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
            // Hidden Product Example
            {
                name: 'Elegant Hand Made Feather Hair',
                description: 'Hand made feather hair.',
                price: 79.99,
                category: getCatId('wigs'),
                isVisible: false,
                images: [],
                stock: 20,
                options: [
                    {
                        name: 'Length',
                        values: [
                            { value: '14 inches', price: 79.99 },
                            { value: '16 inches', price: 86.99 }
                        ]
                    }
                ]
            }
        ];

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
