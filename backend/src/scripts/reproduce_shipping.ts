// src/scripts/reproduce_shipping.ts
import { calculateShippingCost } from '../services/shippingService';

console.log('--- Reproduction Test ---');

try {
    console.log('Test 1: Undefined Country');
    // @ts-ignore
    const cost1 = calculateShippingCost(undefined, 500);
    console.log(`Cost (Undefined): ${cost1}`);
} catch (error: any) {
    console.log(`Error (Undefined): ${error.message}`);
}

try {
    console.log('Test 2: Empty String Country');
    const cost2 = calculateShippingCost('', 500);
    console.log(`Cost (Empty): ${cost2}`);
} catch (error: any) {
    console.log(`Error (Empty): ${error.message}`);
}

try {
    console.log('Test 3: UK Explicit');
    const cost3 = calculateShippingCost('UK', 500);
    console.log(`Cost (UK): ${cost3}`);
} catch (error: any) {
    console.log(`Error (UK): ${error.message}`);
}
