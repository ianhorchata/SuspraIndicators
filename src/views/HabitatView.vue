<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { openDB } from 'idb'

const router = useRouter()

const h1 = ref(null)
const h2 = ref(null)
const h2a = ref('')
const h3 = ref(null)
const h4 = ref('')
const h4a = ref(null)
const h5 = ref(null)
const h6 = ref(null)
const h8 = ref(null)
const h7 = ref('')

const h1Options = [
  { text: 'Yes', value: 1 },
  { text: 'No', value: 2 },
  { text: 'Web Blank', value: 97 },
  { text: 'Don’t know', value: 98 },
]
const h2Options = [
  { text: 'Yes', value: 1 },
  { text: 'No', value: 2 },
  { text: 'Web Blank', value: 97 },
  { text: 'Don’t know', value: 98 },
]
const h3Options = [
  { text: 'Yes', value: 1 },
  { text: 'No', value: 2 },
  { text: 'Web Blank', value: 97 },
]
const h4aOptions = [
  { text: 'Less than 0.1 acre (e.g., small yard or patio)', value: 1 },
  { text: '0.1–0.25 acre (typical suburban lot)', value: 2 },
  { text: '0.25–1 acre', value: 3 },
  { text: '1–5 acres', value: 4 },
  { text: 'More than 5 acres', value: 5 },
  { text: 'Web Blank', value: 97 },
]
const h5Options = [
  { text: '0% (fully maintained or developed)', value: 1 },
  { text: '1–25%', value: 2 },
  { text: '26–50%', value: 3 },
  { text: '51–75%', value: 4 },
  { text: '76–100%', value: 5 },
  { text: 'Web Blank', value: 97 },
  { text: 'Don’t know', value: 98 },
]
const h6Options = [
  { text: 'Yes', value: 1 },
  { text: 'No', value: 2 },
  { text: 'Web Blank', value: 97 },
  { text: 'Don’t know', value: 98 },
]
const h8Options = [
  { text: 'Spot treatment only', value: 1 },
  { text: 'Less than 500 sq ft (e.g., flowerbeds or small garden)', value: 2 },
  { text: '500–2,000 sq ft (e.g., yard, landscaping, small lawn)', value: 3 },
  { text: '2,000–5,000 sq ft', value: 4 },
  { text: 'More than 5,000 sq ft', value: 5 },
  { text: 'Web Blank', value: 97 },
  { text: 'Don’t know', value: 98 },
]

async function startOver() {
  try {
    const suspraDB = await openDB('SuspraDB', 1)
    if (suspraDB.objectStoreNames.contains('habitat')) {
      await suspraDB.clear('habitat')
    }
    router.push({ name: 'home' })
  } catch (error) {
    router.push({ name: 'home' })
  }
}

function onNext() {
  // Save data to IndexedDB (optional, can be expanded)
  router.push({ name: 'score' })
}
function onBack() {
  router.push({ name: 'energy' })
}
</script>

<template>
  <v-container class="d-flex flex-column align-center justify-center" style="min-height: 100vh; max-width: 600px;">
    <v-card elevation="8" class="pa-6" style="width: 100%;">
      <div class="d-flex justify-space-between align-center mb-4">
        <h2>Habitat Pathway</h2>
        <v-btn color="error" variant="outlined" size="small" @click="startOver">Start Over</v-btn>
      </div>
      <form @submit.prevent="onNext">
        <!-- H1 -->
        <v-select
          v-model="h1"
          :items="h1Options"
          label="Does your current residence have any type of environmental or sustainability certification (such as LEED)?"
          class="mb-4"
        />
        <!-- H2 -->
        <v-select
          v-model="h2"
          :items="h2Options"
          label="Do you or your household donate to any organizations that focus on preserving or protecting natural land (such as land trusts, conservation groups, or reforestation efforts)?"
          class="mb-4"
        />
        <!-- H2a: Only show if H2 == 1 -->
        <v-text-field
          v-if="h2 == 1"
          v-model="h2a"
          label="About how much do you donate to land conservation efforts in a typical year? ($ per year)"
          type="number"
          min="0"
          class="mb-4"
          placeholder="e.g. 100"
        />
        <!-- H3 -->
        <v-select
          v-model="h3"
          :items="h3Options"
          label="Do you or your household own or control any land (including a yard, garden, or undeveloped property)?"
          class="mb-4"
        />
        <!-- H4: Only show if H3 == 1 -->
        <v-text-field
          v-if="h3 == 1"
          v-model="h4"
          label="How much land do you own, rent or control? (acres)"
          type="number"
          min="0"
          class="mb-2"
          placeholder="e.g. 0.25"
        />
        <!-- H4a: Only show if H3 == 1 and H4 != 97,98 -->
        <v-select
          v-if="h3 == 1 && h4 !== '' && h4 != 97 && h4 != 98"
          v-model="h4a"
          :items="h4aOptions"
          label="Would you say:"
          class="mb-4"
        />
        <!-- H5: Only show if H3 == 1 -->
        <v-select
          v-if="h3 == 1"
          v-model="h5"
          :items="h5Options"
          label="Roughly what percentage of that land is left in a natural or 'wild' state (e.g., not mowed, landscaped, or heavily maintained)?"
          class="mb-4"
        />
        <!-- H6: Only show if H3 == 1 -->
        <v-select
          v-if="h3 == 1"
          v-model="h6"
          :items="h6Options"
          label="Do you or your lawn service apply chemical pesticides, herbicides or synthetic fertilizers on your property?"
          class="mb-4"
        />
        <!-- H8: Only show if H6 == 1 -->
        <v-select
          v-if="h6 == 1"
          v-model="h8"
          :items="h8Options"
          label="To approximately how much of your land are they applied?"
          class="mb-4"
        />
        <!-- H7: Only show if H6 == 1 -->
        <v-text-field
          v-if="h6 == 1"
          v-model="h7"
          label="How many times per year are these applied?"
          type="number"
          min="0"
          class="mb-4"
          placeholder="e.g. 2"
        />
        <div class="d-flex justify-space-between mt-6">
          <v-btn color="secondary" @click="onBack">Back</v-btn>
          <v-btn color="primary" type="submit">Next</v-btn>
        </div>
      </form>
    </v-card>
  </v-container>
</template>
