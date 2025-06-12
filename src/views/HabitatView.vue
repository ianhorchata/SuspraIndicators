<script setup>
  import { useRouter } from 'vue-router'
  import { suspra } from '../suspra'

  const router = useRouter()

  function gotoScore() {
    router.push({ name: 'score' })
  }

  function saveHabitatToIndexedDB() {
    const dbName = 'SuspraDB';
    const storeName = 'habitat';
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
        id: 'habitat',
        ...suspra.value.habitat
      });
      tx.oncomplete = function() {
        alert('Habitat pathway info saved!');
      };
      tx.onerror = function() {
        alert('Failed to save habitat info.');
      };
    };
    request.onerror = function() {
      alert('Failed to open IndexedDB.');
    };
  }
</script>

<template>
  <main>
    <h1>Suspra Score Calculator - Habitat Pathway</h1>
    <p>
      <label for="habitat_gallonsSyntheticFertilizerApplied">Gallons of synthetic fertilizer applied to your yard per year</label>
      <input id="habitat_gallonsSyntheticFertilizerApplied" type="text" v-model="suspra.habitat.gallonsSyntheticFertilizerApplied">
    </p>
    <p>
      <label for="habitat_gallonsSyntheticPesticideApplied">Gallons of synthetic pesticide applied to your yard per year</label>
      <input id="habitat_gallonsSyntheticPesticideApplied" type="text" v-model="suspra.habitat.gallonsSyntheticPesticideApplied">
    </p>
    <button @click="gotoScore">Next</button>
    <button @click="saveHabitatToIndexedDB">Save</button>
  </main>
</template>
