export const calculateShippingCost = (country: string, weightGrams: number): number => {
    // Normalize country input
    const normalizedCountry = country.toLowerCase().trim();
    const isUK = normalizedCountry === 'uk' || normalizedCountry === 'united kingdom' || normalizedCountry === 'great britain';

    // Convert weight to kg for calculation
    const weightKg = weightGrams / 1000;

    if (isUK) {
        // UK Rates (Placeholder)
        // Standard: £3.99 for up to 1kg, then +£1 per kg
        let cost = 3.99;
        if (weightKg > 1) {
            cost += Math.ceil(weightKg - 1) * 1.00;
        }
        return parseFloat(cost.toFixed(2));
    } else {
        // International Rates (Placeholder)
        // Base: £14.99 for up to 1kg, then +£5 per kg
        let cost = 14.99;
        if (weightKg > 1) {
            cost += Math.ceil(weightKg - 1) * 5.00;
        }
        return parseFloat(cost.toFixed(2));
    }
};

export const estimateDelivery = (country: string, isCustomized: boolean = false): string => {
    const normalizedCountry = country.toLowerCase().trim();
    const isUK = normalizedCountry === 'uk' || normalizedCountry === 'united kingdom' || normalizedCountry === 'great britain';

    let minDays, maxDays;

    if (isUK) {
        minDays = 2;
        maxDays = 7;
    } else {
        // International
        minDays = 5;
        maxDays = 12;
    }

    if (isCustomized) {
        minDays += 2;
        maxDays += 5;
    }

    return `${minDays}-${maxDays} working days`;
};
