export interface FoodIndicators {
  indicators: 'food';
  budget?: number;
  tapWaterPercentage?: number;
  certifiedOrganicPercentage?: number;
  wasteRate?: number;
};

export function defaultFoodIndicators(): FoodIndicators {
  return { indicators: 'food' };
}

export function foodScore(indicators: FoodIndicators) {
  return (indicators.budget ?? 0)
    + (indicators.tapWaterPercentage ?? 0)
    + (indicators.certifiedOrganicPercentage ?? 0)
    + (indicators.wasteRate ?? 0);
}
