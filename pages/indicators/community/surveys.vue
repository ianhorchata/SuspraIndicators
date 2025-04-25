<script setup lang="ts">
  const uplink = '/indicators/community/';

  const indicators = useCommunityIndicators();
  const surveyCount = ref(indicators.value.surveyCount ?? 0)

  function updateIndicator() {
    indicators.value.surveyCount = surveyCount.value;
    saveIndicators(indicators);
  }

  function done() {
    navigateTo(uplink);
  }
</script>

<template>
  <p>
    <NuxtLink to="/">Suspra Indicators</NuxtLink>
    &gt; <NuxtLink :to="uplink">Community Indicators</NuxtLink>
    &gt; Surveys
  </p>
  <form @submit.prevent="updateIndicator">
    <p>
      Surveys given: <input type="number" required v-model="surveyCount">
      <input type="submit">
    </p>
  </form>
  <button @click="done">Done</button>
</template>
