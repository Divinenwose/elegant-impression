// src/scripts/verify_shipping_fix.ts
import { calculateShippingCost } from '../services/shippingService';
// Note: We can only unit test the service logic here. 
// The controller logic (defaulting to UK) needs to be tested via API or inferred.
// However, since we added defensive coding to the service, we can test that it doesn't crash on undefined.

console.log('--- Verification Test ---');

try {
    console.log('Test 1: Undefined Country (Service Layer)');
    // @ts-ignore
    const cost1 = calculateShippingCost(undefined, 500);
    console.log(`Cost (Undefined): ${cost1}`);
    if (cost1 === 20.00) console.log('PASS: Service defaults to International (safe fallback)');
} catch (error: any) {
    console.log(`FAIL: Service crashed: ${error.message}`);
}

try {
    console.log('Test 2: Empty String Country (Service Layer)');
    const cost2 = calculateShippingCost('', 500);
    console.log(`Cost (Empty): ${cost2}`);
    if (cost2 === 20.00) console.log('PASS: Service defaults to International');
} catch (error: any) {
    console.log(`FAIL: Service crashed: ${error.message}`);
}

try {
    console.log('Test 3: UK Explicit');
    const cost3 = calculateShippingCost('UK', 500);
    console.log(`Cost (UK): ${cost3}`);
    if (cost3 === 3.99) console.log('PASS: UK Rate applied');
} catch (error: any) {
    console.log(`FAIL: Service crashed: ${error.message}`);
}
