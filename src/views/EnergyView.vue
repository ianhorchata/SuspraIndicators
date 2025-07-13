<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { openDB } from 'idb'

const router = useRouter()

const e1 = ref(null)
const e2 = ref('')
const e2Error = ref('')
const e3 = ref(null)
const e10 = ref([])
const e10Options = [
  { text: 'Solar', value: 1 },
  { text: 'Wind', value: 2 },
  { text: 'Hydro', value: 3 },
  { text: 'None', value: 4 },
]
const e4 = ref(null)
const e5Therms = ref('')
const e5Gallons = ref('')
const e5CubicFeet = ref('')
const e5 = ref(null) // for 97/98
const e5Error = ref('')
const e9 = ref('')

const e1Options = [
  { text: 'Yes, I have access or know the amount', value: 1 },
  { text: 'No, I don’t have access and don’t know', value: 2 },
  { text: 'Web Blank', value: 97 },
  { text: 'Don’t know', value: 98 },
]
const e3Options = [
  { text: 'More than that', value: 1 },
  { text: 'About that amount', value: 2 },
  { text: 'Less than that', value: 3 },
  { text: 'Web Blank', value: 97 },
  { text: 'Don’t know', value: 98 },
]
const e4Options = [
  { text: 'Yes, I have access or know the amount', value: 1 },
  { text: 'No, I don’t have access and don’t know', value: 2 },
  { text: 'My household does not use gas', value: 3 },
  { text: 'Web Blank', value: 97 },
  { text: 'Don’t know', value: 98 },
]

async function startOver() {
  try {
    const suspraDB = await openDB('SuspraDB', 1)
    if (suspraDB.objectStoreNames.contains('energy')) {
      await suspraDB.clear('energy')
    }
    router.push({ name: 'home' })
  } catch (error) {
    router.push({ name: 'home' })
  }
}

function onNext() {
  e2Error.value = ''
  e5Error.value = ''
  // Validate E2: only allow 97/98 or a number
  if (e1.value == 1) {
    if (e2.value && (e2.value == 97 || e2.value == 98)) {
      e2Error.value = 'Please enter a number or select Web Blank/Don\'t know, not both.'
      return
    }
  }
  // Validate E5: only one of therms, gallons, or cubic feet or 97/98
  if (e4.value == 1) {
    const filled = [e5Therms.value, e5Gallons.value, e5CubicFeet.value].filter(v => v && v !== '97' && v !== '98')
    if (filled.length > 1) {
      e5Error.value = 'Please provide the amount in either therms per month, gallons per month or cubic feet per month, but not multiple.'
      return
    }
  }
  // Save data to IndexedDB (optional, can be expanded)
  router.push({ name: 'habitat' })
}
function onBack() {
  router.push({ name: 'water' })
}
</script>

<template>
  <v-container class="d-flex flex-column align-center justify-center" style="min-height: 100vh; max-width: 600px;">
    <v-card elevation="8" class="pa-6" style="width: 100%;">
      <div class="d-flex justify-space-between align-center mb-4">
        <h2>Energy Pathway</h2>
        <v-btn color="error" variant="outlined" size="small" @click="startOver">Start Over</v-btn>
      </div>
      <form @submit.prevent="onNext">
        <!-- E1 -->
        <v-select
          v-model="e1"
          :items="e1Options"
          label="Do you have access to your household’s electricity bill, or do you know how much electricity your household typically uses?"
          class="mb-4"
        />
        <!-- E2: Only show if E1 == 1 -->
        <div v-if="e1 == 1">
          <v-text-field
            v-model="e2"
            label="How much electricity does your household use in an average year? (kWh per year)"
            type="number"
            min="0"
            class="mb-2"
            placeholder="e.g. 10632"
          />
          <v-select
            v-if="!e2"
            v-model="e2"
            :items="[
              { text: 'Web Blank', value: 97 },
              { text: 'Don’t know', value: 98 }
            ]"
            label="Or select an option"
            class="mb-2"
          />
          <div v-if="e2Error" class="error" style="color: red;">{{ e2Error }}</div>
        </div>
        <!-- E3: Show if E1 != 1 or E2 is 97/98 -->
        <v-select
          v-if="e1 != 1 || e2 == 97 || e2 == 98"
          v-model="e3"
          :items="e3Options"
          label="On average, a U.S. household uses about 886 kWh of electricity per month. Based on that, do you think your household uses:"
          class="mb-4"
        />
        <!-- E10: On-site generators -->
        <v-select
          v-model="e10"
          :items="e10Options"
          label="Does your household have any of these on site electricity generators?"
          multiple
          class="mb-4"
        />
        <!-- E4: Gas usage access -->
        <v-select
          v-model="e4"
          :items="e4Options"
          label="Do you have access to your household’s natural gas or propane bill, or do you know how much gas your household typically uses?"
          class="mb-4"
        />
        <!-- E5: Only show if E4 == 1 -->
        <div v-if="e4 == 1">
          <v-text-field
            v-model="e5Therms"
            label="Therms per month"
            type="number"
            min="0"
            class="mb-2"
            placeholder="e.g. 50"
          />
          <v-text-field
            v-model="e5Gallons"
            label="Gallons per month"
            type="number"
            min="0"
            class="mb-2"
            placeholder="e.g. 30"
          />
          <v-text-field
            v-model="e5CubicFeet"
            label="Cubic feet per month"
            type="number"
            min="0"
            class="mb-2"
            placeholder="e.g. 400"
          />
          <v-select
            v-if="!e5Therms && !e5Gallons && !e5CubicFeet"
            v-model="e5"
            :items="[
              { text: 'Web Blank', value: 97 },
              { text: 'Don’t know', value: 98 }
            ]"
            label="Or select an option"
            class="mb-2"
          />
          <div v-if="e5Error" class="error" style="color: red;">{{ e5Error }}</div>
        </div>
        <!-- E9: Utility cost (show if E3 != 97,98 or E5 == 97,98) -->
        <v-text-field
          v-if="(e3 && e3 != 97 && e3 != 98) || e5 == 97 || e5 == 98"
          v-model="e9"
          label="How much do you pay in utilities for gas and electricity combined per month? ($ per month)"
          type="number"
          min="0"
          class="mb-4"
          placeholder="e.g. 150"
        />
        <div class="d-flex justify-space-between mt-6">
          <v-btn color="secondary" @click="onBack">Back</v-btn>
          <v-btn color="primary" type="submit">Next</v-btn>
        </div>
      </form>
    </v-card>
  </v-container>
</template>
