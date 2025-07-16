<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { openDB } from 'idb'

const router = useRouter()

const w1 = ref(null)
const w2Gallons = ref('')
const w2CubicFeet = ref('')
const w2 = ref(null) // for 97/98
const w2Error = ref('')
const w2a = ref(null)
const w3 = ref(null)

const w1Options = [
  { text: 'Yes, I have access or know the amount', value: 1 },
  { text: 'No, I don’t have access and don’t know', value: 2 },
  { text: 'Web Blank', value: 97 },
  { text: 'Don’t know', value: 98 },
]
const w2aOptions = [
  { text: 'More than that', value: 1 },
  { text: 'About that amount', value: 2 },
  { text: 'Less than that', value: 3 },
  { text: 'Web Blank', value: 97 },
]
const w3Options = [
  { text: 'Frequently (multiple times per week)', value: 1 },
  { text: 'Occasionally (a few times per month)', value: 2 },
  { text: 'Rarely (a few times per year)', value: 3 },
  { text: 'Never', value: 4 },
  { text: 'Web Blank', value: 97 },
]

async function startOver() {
  try {
    const suspraDB = await openDB('SuspraDB', 1)
    if (suspraDB.objectStoreNames.contains('water')) {
      await suspraDB.clear('water')
    }
    router.push({ name: 'home' })
  } catch (error) {
    router.push({ name: 'home' })
  }
}

function onNext() {
  w2Error.value = ''
  // Validate W2: only one of gallons or cubic feet or 97/98
  if (w1.value == 1) {
    if ((w2Gallons.value && w2CubicFeet.value) ||
        ((w2Gallons.value && (w2Gallons.value == 97 || w2Gallons.value == 98)) && w2CubicFeet.value) ||
        ((w2CubicFeet.value && (w2CubicFeet.value == 97 || w2CubicFeet.value == 98)) && w2Gallons.value)) {
      w2Error.value = 'Please provide the amount in either gallons per month or cubic feet per month, but not both.'
      return
    }
  }
  // Save data to IndexedDB (optional, can be expanded)
  router.push({ name: 'energy' })
}
function onBack() {
  router.push({ name: 'food' })
}
</script>

<template>
  <v-container class="d-flex flex-column align-center justify-center" style="min-height: 100vh; max-width: 600px;">
    <v-card elevation="8" class="pa-6" style="width: 100%;">
      <div class="d-flex justify-space-between align-center mb-4">
        <h2>Water Pathway</h2>
        <v-btn color="error" variant="outlined" size="small" @click="startOver">Start Over</v-btn>
      </div>
      <form @submit.prevent="onNext">
        <!-- W1 -->
        <v-select
          v-model="w1"
          :items="w1Options"
          label="Do you have access to your household’s water bill, or do you know how much water your household uses?"
          class="mb-4"
        />
        <!-- W2: Only show if W1 == 1 -->
        <div v-if="w1 == 1">
          <v-text-field
            v-model="w2Gallons"
            label="Gallons per month"
            type="number"
            min="0"
            class="mb-2"
            placeholder="e.g. 9000"
          />
          <v-text-field
            v-model="w2CubicFeet"
            label="Cubic feet per month"
            type="number"
            min="0"
            class="mb-2"
            placeholder="e.g. 1200"
          />
          <v-select
            v-if="!w2Gallons && !w2CubicFeet"
            v-model="w2"
            :items="[
              { text: 'Web Blank', value: 97 },
              { text: 'Don’t know', value: 98 }
            ]"
            label="Or select an option"
            class="mb-2"
          />
          <div v-if="w2Error" class="error" style="color: red;">{{ w2Error }}</div>
        </div>
        <!-- W2a: Show if W1 != 1 or W2 is 97/98 -->
        <v-select
          v-if="w1 != 1 || w2 == 97 || w2 == 98"
          v-model="w2a"
          :items="w2aOptions"
          label="On average, a U.S. household uses about 9,000 gallons of water per month. Based on that, do you think your household uses:"
          class="mb-4"
        />
        <!-- W3 -->
        <v-select
          v-model="w3"
          :items="w3Options"
          label="How often do you use strong chemical cleaners (like bleach, ammonia, or drain openers) in your home?"
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
