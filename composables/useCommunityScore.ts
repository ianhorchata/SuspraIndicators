export const useCommunityScore = () => {
  const indicators = useCommunityIndicators();
  return computed(() => {
    return communityScore(indicators.value);
  });
}
