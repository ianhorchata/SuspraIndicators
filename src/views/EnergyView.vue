<script setup>
  import { useRouter } from 'vue-router'
  import { suspra } from '../suspra'

  const router = useRouter()

  function nextPathway() {
    router.push({ name: 'goods' })
  }

  function saveEnergyToIndexedDB() {
    const dbName = 'SuspraDB';
    const storeName = 'energy';
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
        id: 'energy',
        ...suspra.value.energy
      });
      tx.oncomplete = function() {
        alert('Energy pathway info saved!');
      };
      tx.onerror = function() {
        alert('Failed to save energy info.');
      };
    };
    request.onerror = function() {
      alert('Failed to open IndexedDB.');
    };
  }
</script>

<template>
  <main>
    <h1>Suspra Score Calculator - Energy Pathway</h1>
    <p>
      <label for="energy_gallonsGasolineConsumed">Gallons of gasoline consumed per person per day</label>
      <input id="energy_gallonsGasolineConsumed" type="text" v-model="suspra.energy.gallonsGasolineConsumed">
    </p>
    <p>
      <label for="energy_gallonsDieselConsumed">Gallons of diesel consumed per person per day</label>
      <input id="energy_gallonsDieselConsumed" type="text" v-model="suspra.energy.gallonsDieselConsumed">
    </p>
    <button @click="nextPathway">Next</button>
    <button @click="saveEnergyToIndexedDB">Save</button>
  </main>
</template>
