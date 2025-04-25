export const useFoodScore = () => {
  const indicators = useFoodIndicators();
  return computed(() => {
    return foodScore(indicators.value);
  });
}
