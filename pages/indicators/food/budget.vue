<script setup lang="ts">
  const uplink = '/indicators/food/';

  const indicators = useFoodIndicators();
  const budget = ref(indicators.value.budget ?? 0)

  function updateIndicator() {
    const v = budget.value;
    if (typeof v !== "number") {
      return;
    }
    indicators.value.budget = v;
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
    &gt; Food Budget
  </p>
  <p>Food budget is measured in average dollars per day spent on food and drink in the course of one year.</p>
  <form @submit.prevent="updateIndicator">
    <p>
      Dollars per day: <input required v-model.number="budget">
      <input type="submit">
    </p>
  </form>
  <button @click="done">Done</button>
</template>
