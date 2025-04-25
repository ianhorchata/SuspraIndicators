export const useFoodStarted = () => {
  const indicators = useFoodIndicators();
  return computed(() => {
    return Object.getOwnPropertyNames(indicators.value).length > 1;
  });
}
