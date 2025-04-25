export const useFoodIndicators = () =>
  useState<FoodIndicators>('foodIndicators', defaultFoodIndicators);
