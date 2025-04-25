<script setup lang="ts">
  const pathways = [
    { name: 'Community', link: 'community', indicators: useCommunityIndicators(), score: useCommunityScore(), started: useCommunityStarted() },
    { name: 'Food', link: 'food', indicators: useFoodIndicators(), score: useFoodScore(), started: useFoodStarted() },
  ];
  const totalScore = computed(() => {
    let scores = new Map()
    for (const pathway of pathways) {
      scores.set(pathway.indicators.value.indicators, pathway.score.value);
    }
    return suspraScore(scores);
  });
</script>

<template>
  <h1>Suspra Pathways</h1>
  <div class="grid">
    <p>Pathway</p>
    <p>Score</p>
    <p></p>
    <template v-for="pathway in pathways">
      <p>{{ pathway.name }}</p>
      <p>{{ pathway.score.value }}</p>
      <p><NuxtLink :to="`/indicators/${pathway.link}/`">{{ pathway.started.value ? 'Update' : 'Start' }}</NuxtLink></p>
    </template>
    <p>Suspra score</p>
    <p>{{ totalScore }}</p>
    <p></p>
  </div>
</template>

<style scoped>
.grid {
  display: grid;
  grid-template-columns: 3fr 1fr 1fr;
}
</style>
