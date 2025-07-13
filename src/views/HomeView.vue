<script setup>
  import { useRouter } from 'vue-router'

  const router = useRouter()

  function gotoCommunity() {
    router.push({ name: 'community' });
  }
</script>

<template>
  <div>
    <v-container fluid class="pa-4">
      <v-row>
        <v-col cols="12">
          <h1>Suspra Score Calculator</h1>
          <p class="text-body-1">This website will guide you through calculating your Sustainable Practices (Suspra) Score. As you follow this guide, you will be asked questions about your practices in each of the seven pathways to sustainability. Listed below are the pathways and the information you will need to gather to answer the questions posed by this guide. Click on the start button to go to the first pathway.</p>
          <h2>Pathways</h2>
          <details>
            <summary>Community</summary>
            Your latest score on a knowledge test.
          </details>
          <details>
            <summary>Food</summary>
            An estimate of how much of your meals are plant-based and what amount of your beverages are plain water.
          </details>
          <details>
            <summary>Water</summary>
            How much water, in gallons, you consume per day.
          </details>
          <details>
            <summary>Movement</summary>
            How much you choose to walk, bike or ride the bus for your daily trips versus use a car.
          </details>
          <details>
            <summary>Energy</summary>
            The amount, in gallons, of gasoline and diesel you use per day.
          </details>
          <details>
            <summary>Goods</summary>
            An estimate of how much you recycle the materials you purchase and compost your solid waste.
          </details>
          <details>
            <summary>Habitat</summary>
            How much synthetic fertilizer and pesticides you use.
          </details>
        </v-col>
      </v-row>
    </v-container>
    <div style="position: fixed; left: 0; right: 0; bottom: 32px; display: flex; justify-content: center; z-index: 10;">
      <v-btn color="primary" size="x-large" elevation="4" @click="gotoCommunity">
        Start
      </v-btn>
    </div>
  </div>
</template>
