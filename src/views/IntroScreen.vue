<template>
  <v-container class="d-flex flex-column align-center justify-center" style="min-height: 100vh; max-width: 500px;">
    <v-card elevation="4" class="pa-8" style="width: 100%;">
      <h1 class="text-center mb-6">Sustainability Score Calculator</h1>
      
      <p class="text-center mb-6">
        Discover how sustainable your current practices are and identify areas for improvement.
        This survey takes about 10 minutes to complete.
      </p>
      
      <v-divider class="my-6" />
      
      <form @submit.prevent="saveName" class="d-flex flex-column align-center">
        <v-text-field
          v-model="inputName"
          label="Enter your name to begin"
          required
          variant="outlined"
          class="mb-6"
          style="max-width: 300px;"
        />
        <v-btn 
          color="primary" 
          size="large"
          type="submit" 
          :disabled="!inputName.trim()"
        >
          Start Survey
        </v-btn>
      </form>
    </v-card>
  </v-container>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { openDB } from 'idb'
import { useRouter } from 'vue-router'

const router = useRouter()
const inputName = ref('')

const dbName = 'user-db'
const storeName = 'user-info'

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
  await db.put(storeName, inputName.value.trim(), 'name')
  router.push({ name: 'screener' })
}

onMounted(loadName)
</script> 