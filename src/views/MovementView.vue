<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { openDB } from 'idb'

import {
  getAnswersDB,
  writeData,
  checkIfInAnswersDB,
  getValFromAnswersDB,
  clearAnswersDB,
  updateData} from '../suspra/db'

import { answerVars } from '@/suspra/answerVars'

const answers = answerVars.MovementViewVars


const router = useRouter()
console.log("hello, running from the top!")
// const m1 = ref(null)
// const m3 = ref('')
// const m4 = ref('')
// const m5 = ref('')
// const m6 = ref(null)
// const m6Other = ref('')
// const m7 = ref('')




//log answer values:
for (const [key, value] of Object.entries(answers)) {
  console.log(key + ": " + value)
}

const m1Options = [
  { text: '0-25%', value: 1 },
  { text: '26-50%', value: 2 },
  { text: '51-75%', value: 3 },
  { text: '76-100%', value: 4 },
]
const m6Options = [
  { text: 'Gas-powered car or truck (you drive)', value: 1 },
  { text: 'Electric vehicle (EV) (you drive)', value: 2 },
  { text: 'Plug-in hybrid (you drive)', value: 3 },
  { text: 'Motorcycle or scooter', value: 4 },
  { text: 'Public transit (bus, train, subway)', value: 5 },
  { text: 'Bicycle', value: 6 },
  { text: 'Walking', value: 7 },
  { text: 'Work from home / do not commute', value: 8 },
  { text: 'Other (please specify)', value: 96 },
  { text: 'Web Blank', value: 97 },
]

async function startOver() {
  try {
    const suspraDB = await openDB('SuspraDB', 1)
    if (suspraDB.objectStoreNames.contains('movement')) {
      await suspraDB.clear('movement')
    }
    router.push({ name: 'home' })
  } catch (error) {
    router.push({ name: 'home' })
  }
}

function onNext() {
  // Save data to IndexedDB (optional, can be expanded)
  writeData(answers)
  updateData(answers)
  router.push({ name: 'community' })
}
function onBack() {
  router.push({ name: 'habitat' })
}
</script>

<template>
  <v-container class="d-flex flex-column align-center justify-center" style="min-height: 100vh; max-width: 600px;">
    <v-card elevation="8" class="pa-6" style="width: 100%;">
      <div class="d-flex justify-space-between align-center mb-4">
        <h2>Movement Pathway</h2>
        <v-btn color="error" variant="outlined" size="small" @click="startOver">Start Over</v-btn>
      </div>
      <form @submit.prevent="onNext">
        <!-- M1 -->
        <v-select
          v-model="answers.m1"
          :items="m1Options.text"
          label="Of all the trips you take in a typical week, what percent are active (meaning walking, biking or taking public transit)?"
          class="mb-4"
        />
        <!-- M3: About how many miles does your household drive in an average month? -->
        <v-text-field
          v-model="answers.m3"
          label="About how many miles does your household drive in an average month?"
          type="number"
          min="0"
          class="mb-4"
          placeholder="e.g. 1200"
        />
        <!-- M4: How far is your one-way commute to work or school? -->
        <v-text-field
          v-model="answers.m4"
          label="How far is your one-way commute to work or school? (miles)"
          type="number"
          min="0"
          class="mb-4"
          placeholder="e.g. 10"
        />
        <!-- M5: Only show if M4 > 0 -->
        <v-text-field
          v-if="answers.m4 && Number(answers.m4) > 0"
          v-model="answers.m5"
          label="How many days per week do you typically commute to work or school?"
          type="number"
          min="0"
          max="7"
          class="mb-4"
          placeholder="e.g. 5"
        />
        <!-- M6: Only show if M4 > 0 -->
        <v-select
          v-if="answers.m4 && Number(answers.m4) > 0"
          v-model="answers.m6"
          :items="m6Options"
          label="What is your primary mode of transportation for commuting?"
          class="mb-4"
        />
        <!-- M6 Other: Only show if M6 == 96 -->
        <v-text-field
          v-if="answers.m6 == 96"
          v-model="answers.m6Other"
          label="Please specify your primary mode of transportation:"
          class="mb-4"
        />
        <!-- M7: How many hours have you flown in the past year? -->
        <v-text-field
          v-model="answers.m7"
          label="How many hours have you flown in the past year?"
          type="number"
          min="0"
          class="mb-4"
          placeholder="e.g. 10"
        />
        <div class="d-flex justify-space-between mt-6">
          <v-btn color="secondary" @click="onBack">Back</v-btn>
          <v-btn color="primary" type="submit">Next</v-btn>
        </div>
      </form>
    </v-card>
  </v-container>
</template>
