<script setup>
import { ref, computed, onMounted } from 'vue'
import { RouterView, RouterLink, useRoute } from 'vue-router'
import { openDB } from 'idb'

const route = useRoute()
const drawer = ref(false)
const surveyCompleted = ref(false)

// Check if survey has been completed by looking for data in IndexedDB
async function checkSurveyCompletion() {
  try {
    const db = await openDB('SuspraDB', 1)
    
    // First check for explicit completion flag
    if (db.objectStoreNames.contains('survey-status')) {
      const status = await db.get('survey-status', 'status')
      if (status && status.completed) {
        surveyCompleted.value = true
        return
      }
    }
    
    // Fallback: check if we have data in survey sections
    const storeNames = ['food', 'water', 'energy', 'goods', 'habitat', 'movement', 'community']
    
    let hasData = false
    for (const storeName of storeNames) {
      if (db.objectStoreNames.contains(storeName)) {
        const data = await db.get(storeName, storeName)
        if (data) {
          hasData = true
          break
        }
      }
    }
    
    surveyCompleted.value = hasData
  } catch (error) {
    console.log('No survey data found or database not accessible')
    surveyCompleted.value = false
  }
}

// Show app bar only after survey has been completed
const showAppBar = computed(() => {
  return surveyCompleted.value
})

const pathwayItems = [
  { to: '/community', label: 'Community' },
  { to: '/food', label: 'Food' },
  { to: '/water', label: 'Water' },
  { to: '/movement', label: 'Movement' },
  { to: '/energy', label: 'Energy' },
  { to: '/goods', label: 'Goods' },
  { to: '/habitat', label: 'Habitat' },
  { to: '/score', label: 'Score' },
  { to: '/user', label: 'User' },
]

onMounted(checkSurveyCompletion)

// Import version from version.txt using Vite's raw import
import version from '../version.txt?raw'
</script>

<template>
  <v-app>
    <v-app-bar v-if="showAppBar" app color="primary" dark>
      <v-app-bar-nav-icon @click="drawer = !drawer" />
      <v-toolbar-title>SuspraIndicators</v-toolbar-title>
    </v-app-bar>
    <v-navigation-drawer v-if="showAppBar" app v-model="drawer">
      <v-list>
        <v-list-item>
          <RouterLink to="/">
            <v-list-item-title>Home</v-list-item-title>
          </RouterLink>
        </v-list-item>
        <v-divider></v-divider>
        <v-list-item v-for="item in pathwayItems" :key="item.to">
          <RouterLink :to="item.to">
            <v-list-item-title>{{ item.label }}</v-list-item-title>
          </RouterLink>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-main>
      <v-container fluid>
        <RouterView />
      </v-container>
    </v-main>
    <div class="app-version-footer">
      v{{ version.trim() }}
    </div>
  </v-app>
</template>

<style>
.app-version-footer {
  position: fixed;
  right: 16px;
  bottom: 8px;
  color: #888;
  font-size: 0.9em;
  z-index: 9999;
  pointer-events: none;
  user-select: none;
}
</style>
