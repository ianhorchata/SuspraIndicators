<template>
  <v-container class="d-flex flex-column align-center justify-center" style="min-height: 100vh; max-width: 600px;">
    <v-card elevation="8" class="pa-6" style="width: 100%;">
      <h1 class="mb-4">Welcome to the Suspra Score Calculator</h1>
      <div class="mb-4">
        <p>This website will guide you through calculating your Sustainable Practices (Suspra) Score. As you follow this guide, you will be asked questions about your practices in each of the seven pathways to sustainability.</p>
        <ul>
          <li>It will take 10 minutes to complete our survey.</li>
          <li>Privacy: all data stored on your computer, not uploaded to the cloud.</li>
          <li>We are a small company headquartered in Maine called Sustainable Practice (the publisher).</li>
          <li>Take this survey to discover how sustainable your current practices are and identify areas where you can make a significant impact.</li>
          <li>What to have handy to answer the survey (e.g. electricity bills).</li>
          <li>What happens to results: stays on this computer, up to you what happens next.</li>
          <li>You can update your answers and see if your score improves.</li>
          <li>First pass is high level, you can dig deeper if you want (but you don’t have to).</li>
        </ul>
      </div>
      <v-divider class="my-4" />
      <form @submit.prevent="saveName" class="d-flex flex-column align-center">
        <label for="username" class="mb-2">Enter your name to get started:</label>
        <v-text-field
          id="username"
          v-model="inputName"
          required
          variant="outlined"
          class="mb-2"
          style="max-width: 300px;"
        />
        <v-btn color="primary" type="submit" :disabled="!inputName">Start</v-btn>
      </form>
    </v-card>
  </v-container>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { openDB } from 'idb'
const emit = defineEmits(['name-saved'])

const dbName = 'user-db'
const storeName = 'user-info'
const inputName = ref('')

async function getDB() {
  return openDB(dbName, 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(storeName)) {
        db.createObjectStore(storeName)
      }
    }
  })
}

async function loadName() {
  const db = await getDB()
  inputName.value = await db.get(storeName, 'name') || ''
}

async function saveName() {
  const db = await getDB()
  await db.put(storeName, inputName.value, 'name')
  emit('name-saved', inputName.value)
}

onMounted(loadName)
</script> 