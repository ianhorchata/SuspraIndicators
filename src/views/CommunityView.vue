<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { openDB } from 'idb'

const router = useRouter()

const c1 = ref(null)
const c2 = ref(null)
const c2Alt = ref(null)
const c3 = ref('')
const c3OutOf = ref('')
const c3Percent = ref('')
const c3Error = ref('')
const c4 = ref(null)
const c6 = ref('')

const c1Options = [
  { text: 'No', value: 1 },
  { text: 'Yes', value: 2 },
  { text: 'Web Blank', value: 97 },
]
const c1AltOptions = [
  { text: 'Yes, I took your test', value: 1 },
  { text: 'No, but I’ve taken a similar test elsewhere', value: 2 },
  { text: 'No, I haven’t taken any sustainability knowledge test', value: 3 },
  { text: 'Web Blank', value: 97 },
]
const c2Options = [
  { text: 'Yes', value: 1 },
  { text: 'No', value: 2 },
]
const c4Options = [
  { text: 'Yes', value: 1 },
  { text: 'No', value: 2 },
]

function validateC3() {
  c3Error.value = ''
  if (c3.value && c3Percent.value) {
    c3Error.value = 'Please provide the amount in either numeric score or percentage, but not both.'
    return false
  }
  return true
}

async function startOver() {
  try {
    const suspraDB = await openDB('SuspraDB', 1)
    if (suspraDB.objectStoreNames.contains('community')) {
      await suspraDB.clear('community')
    }
    router.push({ name: 'home' })
  } catch (error) {
    router.push({ name: 'home' })
  }
}

function onNext() {
  if (!validateC3()) return
  // Save data to IndexedDB (optional, can be expanded)
  router.push({ name: 'score' })
}
function onBack() {
  router.push({ name: 'movement' })
}
</script>

<template>
  <v-container class="d-flex flex-column align-center justify-center" style="min-height: 100vh; max-width: 600px;">
    <v-card elevation="8" class="pa-6" style="width: 100%;">
      <div class="d-flex justify-space-between align-center mb-4">
        <h2>Community Pathway</h2>
        <v-btn color="error" variant="outlined" size="small" @click="startOver">Start Over</v-btn>
      </div>
      <form @submit.prevent="onNext">
        <!-- C1: Have you ever done a survey like this before? -->
        <v-select
          v-model="c1"
          :items="c1Options"
          label="Have you ever done a survey like this before? (Carbon footprint calculator, etc.)"
          class="mb-4"
        />
        <!-- C2: Have you successfully encouraged others? -->
        <v-select
          v-model="c2"
          :items="c2Options"
          label="Have you successfully encouraged other people to take a survey like this to assess the sustainability of their practices?"
          class="mb-4"
        />
        <!-- C1 alt: Have you taken our Sustainability Knowledge Test? -->
        <v-select
          v-model="c2Alt"
          :items="c1AltOptions"
          label="Have you taken our Sustainability Knowledge Test?"
          class="mb-4"
        />
        <!-- C2 alt: If C1 alt == 1, what score did you receive? -->
        <v-text-field
          v-if="c2Alt == 1"
          v-model="c3"
          label="What score did you receive on our Sustainability Knowledge Test?"
          type="number"
          min="0"
          class="mb-4"
        />
        <!-- C3: If C1 alt == 2, what was your score and total possible points? -->
        <div v-if="c2Alt == 2">
          <v-text-field
            v-model="c3"
            label="Score:"
            type="number"
            min="0"
            class="mb-2"
          />
          <v-text-field
            v-model="c3OutOf"
            label="Out of:"
            type="number"
            min="0"
            class="mb-2"
          />
          <v-text-field
            v-model="c3Percent"
            label="Percent:"
            type="number"
            min="0"
            max="100"
            class="mb-2"
          />
          <div v-if="c3Error" class="error" style="color: red;">{{ c3Error }}</div>
        </div>
        <!-- C4: Would you like to take the test now? (if C1 alt == 3 or C2/C3 == 97/98) -->
        <v-select
          v-if="c2Alt == 3 || c3 == 97 || c3 == 98 || c3OutOf == 97 || c3OutOf == 98 || c3Percent == 97 || c3Percent == 98"
          v-model="c4"
          :items="c4Options"
          label="Would you like to take our Sustainability Knowledge Test now? (Click here to take the test)"
          class="mb-4"
        />
        <!-- C6: In the past month, about how many hours have you spent volunteering? -->
        <v-text-field
          v-model="c6"
          label="In the past month, about how many hours have you spent volunteering?"
          type="number"
          min="0"
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
