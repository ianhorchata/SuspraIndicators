<script setup>
import { score } from '../suspra'
import { onMounted } from 'vue'
import { openDB } from 'idb'

// Mark survey as completed when user reaches score page
async function markSurveyCompleted() {
  try {
    const db = await openDB('SuspraDB', 1)
    const storeName = 'survey-status'
    
    // Create the store if it doesn't exist
    if (!db.objectStoreNames.contains(storeName)) {
      db.createObjectStore(storeName)
    }
    
    // Mark survey as completed
    await db.put(storeName, { completed: true, completedAt: new Date().toISOString() }, 'status')
  } catch (error) {
    console.error('Failed to mark survey as completed:', error)
  }
}

onMounted(markSurveyCompleted)
</script>

<template>
  <main>
    <h1>Suspra Score Calculator</h1>
    <p>Score: {{ score }}</p>
  </main>
</template>
