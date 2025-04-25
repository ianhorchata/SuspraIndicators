export const useCommunityStarted = () => {
  const indicators = useCommunityIndicators();
  return computed(() => {
    return Object.getOwnPropertyNames(indicators.value).length > 1;
  });
}
