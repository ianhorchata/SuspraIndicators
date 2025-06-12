<script setup>
  import { useRouter } from 'vue-router'
  import { suspra } from '../suspra'

  const router = useRouter()

  function nextPathway() {
    router.push({ name: 'water' })
  }

  function saveFoodToIndexedDB() {
    const dbName = 'SuspraDB';
    const storeName = 'food';
    const request = indexedDB.open(dbName, 1);
    request.onupgradeneeded = function(event) {
      const db = event.target.result;
      if (!db.objectStoreNames.contains(storeName)) {
        db.createObjectStore(storeName, { keyPath: 'id' });
      }
    };
    request.onsuccess = function(event) {
      const db = event.target.result;
      const tx = db.transaction(storeName, 'readwrite');
      const store = tx.objectStore(storeName);
      store.put({
        id: 'food',
        ...suspra.value.food
      });
      tx.oncomplete = function() {
        alert('Food pathway info saved!');
      };
      tx.onerror = function() {
        alert('Failed to save food info.');
      };
    };
    request.onerror = function() {
      alert('Failed to open IndexedDB.');
    };
  }
</script>

<template>
  <main>
    <h1>Suspra Score Calculator - Food Pathway</h1>
    <p>
      <label for="food_percentagePlantBased">Plant-based meals as a percentage of total meals</label>
      <input id="food_percentagePlantBased" type="text" v-model="suspra.food.percentagePlantBased">
    </p>
    <p>
      <label for="food_percentageWater">Plain water as a percentage of total beverages consumed</label>
      <input id="food_percentageWater" type="text" v-model="suspra.food.percentageWater">
    </p>
    <button @click="nextPathway">Next</button>
    <button @click="saveFoodToIndexedDB">Save</button>
  </main>
</template>
