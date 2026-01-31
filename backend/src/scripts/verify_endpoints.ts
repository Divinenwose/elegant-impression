import dotenv from 'dotenv';
dotenv.config();

const API_URL = `http://localhost:${process.env.PORT || 5000}/api`;

const check = async () => {
    try {
        console.log('--- Verifying Endpoints ---');

        // 1. Check Products
        console.log('Checking GET /products...');
        const resProducts = await fetch(`${API_URL}/products?type=physical`);
        if (!resProducts.ok) throw new Error(`Products endpoint failed: ${resProducts.status}`);
        const products = await resProducts.json() as any[];

        console.log(`Products Found: ${products.length}`);
        if (products.length > 0) {
            console.log('Sample Product:', products[0].name);
        } else {
            console.error('ERROR: No products found');
        }

        // 2. Check Services
        console.log('\nChecking GET /services...');
        const resServices = await fetch(`${API_URL}/services`);
        if (!resServices.ok) throw new Error(`Services endpoint failed: ${resServices.status}`);
        const services = await resServices.json() as any[];

        console.log(`Services Found: ${services.length}`);
        if (services.length > 0) {
            console.log('Sample Service:', services[0].name);
        } else {
            console.error('ERROR: No services found');
        }

    } catch (error: any) {
        console.error('Verification Failed:', error.message);
    }
};

check();
