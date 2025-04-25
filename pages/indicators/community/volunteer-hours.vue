<script setup lang="ts">
  const uplink = '/indicators/community/';

  const indicators = useCommunityIndicators();
  const hours = ref(indicators.value.volunteerHours ?? 0)

  function updateIndicator() {
    indicators.value.volunteerHours = hours.value;
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
    &gt; Volunteer Hours
  </p>
  <form @submit.prevent="updateIndicator">
    <p>
      Volunteer hours: <input type="number" required v-model="hours">
      <input type="submit">
    </p>
  </form>
  <button @click="done">Done</button>
</template>
