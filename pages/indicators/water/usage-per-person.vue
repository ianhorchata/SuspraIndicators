<script setup lang="ts">
  const uplink = '/indicators/water/';

  const indicators = useWaterIndicators();
  const usage = ref(indicators.value.waterUsagePerPerson ?? 0)

  function updateIndicator() {
    const v = usage.value;
    if (typeof v !== "number") {
      return;
    }
    indicators.value.waterUsagePerPerson = v;
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
    &gt; Water Usage Per Person
  </p>
  <p>Enter the amount of water used per person per year in cubic meters.</p>
  <form @submit.prevent="updateIndicator">
    <p>
      Cubic meters per year: <input required v-model.number="usage">
      <input type="submit">
    </p>
  </form>
  <button @click="done">Done</button>
</template>