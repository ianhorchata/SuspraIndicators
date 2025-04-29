<script setup lang="ts">
  const uplink = '/indicators/water/';

  const indicators = useWaterIndicators();
  const practices = ref(indicators.value.waterProtectingPracticesPercentage ?? 0)

  function updateIndicator() {
    const v = practices.value;
    if (typeof v !== "number") {
      return;
    }
    if (v < 0) {
      return;
    }
    if (v <= 1) {
      indicators.value.waterProtectingPracticesPercentage = v * 100;
      return;
    }
    indicators.value.waterProtectingPracticesPercentage = v;
    saveIndicators(indicators);
  }

  function done() {
    navigateTo(uplink);
  }
</script>

<template>
  <p>
    <NuxtLink to="/">Suspra Indicators</NuxtLink>
    &gt; <NuxtLink :to="uplink">Water Indicators</NuxtLink>
    &gt; Water-Protecting Practices
  </p>
  <p>Enter the percentage of water-protecting practices being followed in your household.</p>
  <form @submit.prevent="updateIndicator">
    <p>
      Percentage: <input required v-model.number="practices">
      <input type="submit">
    </p>
  </form>
  <button @click="done">Done</button>
</template>