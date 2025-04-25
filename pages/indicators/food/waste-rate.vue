<script setup lang="ts">
  const uplink = '/indicators/food/';

  const indicators = useFoodIndicators();
  const indicator = ref(indicators.value.wasteRate ?? 0)

  function updateIndicator() {
    const v = indicator.value
    if (typeof v !== "number") {
      return;
    }
    indicators.value.wasteRate = v;
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
    &gt; Food Waste Rate
  </p>
  <p>Enter the amount of food wasted as an average per day over the course of one year.</p>
  <form @submit.prevent="updateIndicator">
    <p>
      kg/day: <input required v-model.number="indicator">
      <input type="submit">
    </p>
  </form>
  <button @click="done">Done</button>
</template>
