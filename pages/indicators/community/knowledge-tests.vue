<script setup lang="ts">
  const uplink = '/indicators/community/';

  const indicators = useCommunityIndicators();
  const tests = indicators.value.knowledgeTests ?? [];
  const testName = ref();
  const dateTaken = ref();
  const maxScore = ref();
  const testScore = ref();

  function addTest() {
    tests.push({
      description: testName.value,
      maximumScore: maxScore.value,
      dateTaken: dateTaken.value,
      score: testScore.value
    });
    indicators.value.knowledgeTests = tests;
    saveIndicators(indicators);
    testName.value = undefined;
    dateTaken.value = undefined;
    maxScore.value = undefined;
    testScore.value = undefined;
  }

  function done() {
    navigateTo(uplink);
  }
</script>

<template>
  <p>
    <NuxtLink to="/">Suspra Indicators</NuxtLink>
    &gt; <NuxtLink :to="uplink">Community Indicators</NuxtLink>
    &gt; Knowledge Tests
  </p>
  <div class="grid">
    <p class="me-1">Test</p>
    <p class="me-1">Date Taken</p>
    <p class="me-1">Maximum Score</p>
    <p class="me-1">Your Score</p>
    <p class="me-1"></p>
    <template v-for="test in tests">
      <p class="my-0">{{ test.description }}</p>
      <p class="my-0">{{ test.dateTaken }}</p>
      <p class="my-0">{{ test.maximumScore }}</p>
      <p class="my-0">{{ test.score }}</p>
      <p class="my-0"></p>
    </template>
  </div>
  <form @submit.prevent="addTest">
    <div class="grid">
      <p><input type="text" required v-model="testName"></p>
      <p><input type="text" required v-model="dateTaken"></p>
      <p><input type="number" required v-model="maxScore"></p>
      <p><input type="number" required v-model="testScore"></p>
      <p><input type="submit"></p>
    </div>
  </form>
  <button @click="done">Done</button>
</template>

<style scoped>
.grid {
  display: grid;
  grid-template-columns: 3fr 2fr 1fr 1fr 1fr;
}

.me-1 {
  margin-block-end: 0.25em;
}

.my-0 {
  margin-block-start: 0;
  margin-block-end: 0;
}
</style>
