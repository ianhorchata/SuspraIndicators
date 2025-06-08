<template>
  <div>
    <h2 v-if="name">Welcome, {{ name }}!</h2>
    <button v-if="name && !editing" @click="editName">Change Name</button>
    <form v-if="!name || editing" @submit.prevent="saveName">
      <label for="username">Enter your name:</label>
      <input id="username" v-model="inputName" required />
      <button type="submit">Save</button>
      <button v-if="editing" type="button" @click="cancelEdit">Cancel</button>
    </form>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { openDB } from 'idb'

const dbName = 'user-db'
const storeName = 'user-info'

const name = ref('')
const inputName = ref('')
const editing = ref(false)

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
  name.value = await db.get(storeName, 'name') || ''
}

async function saveName() {
  const db = await getDB()
  await db.put(storeName, inputName.value, 'name')
  name.value = inputName.value
  editing.value = false
}

function editName() {
  inputName.value = name.value
  editing.value = true
}

function cancelEdit() {
  editing.value = false
}

onMounted(loadName)
</script> 