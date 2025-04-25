<script setup lang="ts">
  const pages = [
    { title: 'Knowledge Tests', link: 'knowledge-tests' },
    { title: 'Surveys', link: 'surveys' },
    { title: 'Tests/Surveys by Other People', link: 'other-people' },
    { title: 'Volunteer Hours', link: 'volunteer-hours' },
  ];
  const score = useCommunityScore();

  function done() {
    navigateTo('/');
  }
</script>

<template>
  <p>
    <NuxtLink to="/">Suspra Pathways</NuxtLink>
    &gt; Community Indicators
  </p>
  <div class="grid">
    <template v-for="page in pages">
      <p>{{ page.title }}</p>
      <p><NuxtLink :to="'/indicators/community/' + page.link">Edit</NuxtLink></p>
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
