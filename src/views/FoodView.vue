<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { openDB } from 'idb'

const router = useRouter()

const f1 = ref('')
const f1a = ref(null)
const f2 = ref(null)
const f3 = ref(null)
const f4 = ref(null)
const f4a = ref(null)
const f5 = ref(null)
const f5a = ref(null)
const f6 = ref(null)

const f1aOptions = [
  { text: 'Less than $50', value: 1 },
  { text: '$50–$99', value: 2 },
  { text: '$100–$149', value: 3 },
  { text: '$150–$199', value: 4 },
  { text: '$200–$299', value: 5 },
  { text: '$300 or more', value: 6 },
  { text: 'Web Blank', value: 97 },
]
const f2Options = [
  { text: 'None (0%)', value: 1 },
  { text: 'A little (1–25%)', value: 2 },
  { text: 'Some (26–50%)', value: 3 },
  { text: 'Most (51–75%)', value: 4 },
  { text: 'Nearly all (76–99%)', value: 5 },
  { text: 'All (100%)', value: 6 },
  { text: 'Web Blank', value: 97 },
  { text: 'Don’t know', value: 98 },
]
const f3Options = [
  { text: 'Never', value: 1 },
  { text: '1–2 times per week', value: 2 },
  { text: '3–4 times per week', value: 3 },
  { text: '5–6 times per week', value: 4 },
  { text: 'Once per day (7 times/week)', value: 5 },
  { text: 'More than once per day (8+ times/week)', value: 6 },
  { text: 'Web Blank', value: 97 },
]
const f4Options = [
  { text: 'Never', value: 1 },
  { text: 'A few times per year', value: 2 },
  { text: 'About once a month', value: 3 },
  { text: 'A few times per month', value: 4 },
  { text: 'Multiple times per week', value: 5 },
]
const f4aOptions = [
  { text: 'None', value: 1 },
  { text: 'A little (1–25%)', value: 2 },
  { text: 'Some (26–50%)', value: 3 },
  { text: 'Most (51–75%)', value: 4 },
  { text: 'Nearly all or all (76–100%)', value: 5 },
  { text: 'Web Blank', value: 97 },
  { text: 'Don’t know', value: 98 },
]
const f5Options = [
  { text: 'None', value: 1 },
  { text: 'A little (1–25%)', value: 2 },
  { text: 'Some (26–50%)', value: 3 },
  { text: 'Most (51–75%)', value: 4 },
  { text: 'Nearly all or all (76–100%)', value: 5 },
  { text: 'Web Blank', value: 97 },
  { text: 'Don’t know', value: 98 },
]
const f5aOptions = [
  { text: 'More than 6% organic', value: 1 },
  { text: 'About 6% organic', value: 2 },
  { text: 'Less than 6% organic', value: 3 },
  { text: 'Web Blank', value: 97 },
]
const f6Options = [
  { text: 'More than that', value: 1 },
  { text: 'About that amount', value: 2 },
  { text: 'Less than that', value: 3 },
  { text: 'Web Blank', value: 97 },
  { text: 'Don’t know', value: 98 },
]

async function startOver() {
  try {
    const suspraDB = await openDB('SuspraDB', 1)
    const storeNames = ['food']
    for (const storeName of storeNames) {
      if (suspraDB.objectStoreNames.contains(storeName)) {
        await suspraDB.clear(storeName)
      }
    }
    router.push({ name: 'home' })
  } catch (error) {
    router.push({ name: 'home' })
  }
}

function onNext() {
  // Save data to IndexedDB (optional, can be expanded)
  // Go to next pathway
  router.push({ name: 'water' })
}
function onBack() {
  router.push({ name: 'screener' })
}
</script>

<template>
  <v-container class="d-flex flex-column align-center justify-center" style="min-height: 100vh; max-width: 600px;">
    <v-card elevation="8" class="pa-6" style="width: 100%;">
      <div class="d-flex justify-space-between align-center mb-4">
        <h2>Food Pathway</h2>
        <v-btn color="error" variant="outlined" size="small" @click="startOver">Start Over</v-btn>
      </div>
      <form @submit.prevent="onNext">
        <!-- F1 -->
        <v-text-field
          v-model="f1"
          label="About how much money does your household spend on food and beverages in a typical week? ($ per week)"
          type="number"
          min="0"
          class="mb-4"
          placeholder="e.g. 150"
        />
        <v-select
          v-if="f1 === '' || f1 == 97 || f1 == 98"
          v-model="f1a"
          :items="f1aOptions"
          label="Or select a range"
          class="mb-4"
        />
        <!-- F2 -->
        <v-select
          v-model="f2"
          :items="f2Options"
          label="In a typical week, about how much of what you drink is tap water (not bottled or filtered)?"
          class="mb-4"
        />
        <!-- F3 -->
        <v-select
          v-model="f3"
          :items="f3Options"
          label="How often do you eat meals that include meat (such as beef, pork, poultry, etc.) in a typical week?"
          class="mb-4"
        />
        <!-- F4 (if F3 > 1) -->
        <v-select
          v-if="parseInt(f3) > 1"
          v-model="f4"
          :items="f4Options"
          label="How often do you eat beef?"
          class="mb-4"
        />
        <!-- F4a (if F3 > 1) -->
        <v-select
          v-if="parseInt(f3) > 1"
          v-model="f4a"
          :items="f4aOptions"
          label="How much of the meat you eat is certified organic?"
          class="mb-4"
        />
        <!-- F5 -->
        <v-select
          v-model="f5"
          :items="f5Options"
          label="In a typical week, how much of the food that you eat is certified organic or grown organically in your garden?"
          class="mb-4"
        />
        <!-- F5a (if F5 == 97 or 98) -->
        <v-select
          v-if="f5 == 97 || f5 == 98"
          v-model="f5a"
          :items="f5aOptions"
          label="Based on the U.S. average (6% organic), do you think you buy:"
          class="mb-4"
        />
        <!-- F6 -->
        <v-select
          v-model="f6"
          :items="f6Options"
          label="Do you think your household wastes more, about, or less than 3 pounds of edible food per week?"
          class="mb-4"
        />
        <div class="d-flex justify-space-between mt-6">
          <v-btn color="secondary" @click="onBack">Back</v-btn>
          <v-btn color="primary" type="submit">Next</v-btn>
        </div>
      </form>
    </v-card>
  </v-container>
</template>
