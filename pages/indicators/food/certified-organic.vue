<script setup lang="ts">
  const uplink = '/indicators/food/';

  const indicators = useFoodIndicators();
  const indicator = ref(indicators.value.certifiedOrganicPercentage ?? 0)

  function updateIndicator() {
    const v = indicator.value;
    if (typeof v !== "number") {
      return;
    }
    if (v < 0) {
      return;
    }
    if (v <= 1) {
      indicators.value.certifiedOrganicPercentage = v * 100;
      return;
    }
    indicators.value.certifiedOrganicPercentage = v;
    saveIndicators(indicators);
  }

  function done() {
    navigateTo(uplink);
  }
</script>

<template>
  <p>
    <NuxtLink to="/">Suspra Indicators</NuxtLink>
    &gt; <NuxtLink :to="uplink">Food Indicators</NuxtLink>
    &gt; Certified Organic Percentage
  </p>
  <p>Enter the proportion of the food that you buy that has been certified organic.</p>
  <form @submit.prevent="updateIndicator">
    <p>
      Percentage: <input required v-model.number="indicator">
      <input type="submit">
    </p>
  </form>
  <button @click="done">Done</button>
</template>
