const isUnitedKingdom = (country: string): boolean => {
    if (!country) return false;
    const normalized = country.toLowerCase().trim();
    return normalized === 'uk' || normalized === 'united kingdom' || normalized === 'great britain' || normalized === 'england';
};

export const getCarrier = (country: string): string => {
    return isUnitedKingdom(country) ? 'Royal Mail' : 'DHL/FedEx';
};

export const calculateShippingCost = (country: string, weightGrams: number): number => {
    const isUK = isUnitedKingdom(country);

    // Convert weight to kg for calculation
    const weightKg = weightGrams / 1000;

    if (isUK) {
        // UK Rates (Royal Mail Standard)
        // Standard: £3.99 for up to 1kg, then +£1 per kg
        let cost = 3.99;
        if (weightKg > 1) {
            cost += Math.ceil(weightKg - 1) * 1.00;
        }
        return parseFloat(cost.toFixed(2));
    } else {
        // International Rates (DHL/FedEx)
        // Base: £20.00 (Updated for DHL base) for up to 1kg, then +£10 per kg
        let cost = 20.00;
        if (weightKg > 1) {
            cost += Math.ceil(weightKg - 1) * 10.00;
        }
        return parseFloat(cost.toFixed(2));
    }
};

export const estimateDelivery = (country: string, isCustomized: boolean = false): string => {
    const normalizedCountry = country ? country.toLowerCase().trim() : '';
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
