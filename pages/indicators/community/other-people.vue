<script setup lang="ts">
  const uplink = '/indicators/community/';

  const indicators = useCommunityIndicators();
  const count = ref(indicators.value.otherPeopleSurveyedTested ?? 0)

  function updateIndicator() {
    indicators.value.otherPeopleSurveyedTested = count.value;
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
    &gt; Tests/Surveys by Other People
  </p>
  <form @submit.prevent="updateIndicator">
    <p>
      Number of tests and/or surveys given to other people: <input type="number" required v-model="count">
      <input type="submit">
    </p>
  </form>
  <button @click="done">Done</button>
</template>
