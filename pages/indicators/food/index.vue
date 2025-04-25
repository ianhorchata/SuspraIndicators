<script setup lang="ts">
  const pages = [
    { title: 'Food Budget', link: 'budget' },
    { title: 'Tap Water Percentage', link: 'tap-water' },
    { title: 'Certified Organic Percentage', link: 'certified-organic' },
    { title: 'Food Waste Rate', link: 'waste-rate' },
  ];
  const score = useFoodScore();

  function done() {
    navigateTo('/');
  }
</script>

<template>
  <NuxtLink to="/">Suspra Pathways</NuxtLink>
  &gt; Food Indicators
  <div class="grid">
    <template v-for="page in pages">
      <p>{{ page.title }}</p>
      <p><NuxtLink :to="'/indicators/food/' + page.link">Edit</NuxtLink></p>
    </template>
  </div>
  <p>Score: {{ score }}</p>
  <button @click="done">Done</button>
</template>

<style scoped>
.grid {
  display: grid;
  grid-template-columns: 2fr 1fr;
}
</style>
