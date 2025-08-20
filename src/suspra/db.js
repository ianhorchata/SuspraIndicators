import { openDB } from 'idb'

const answersDB = 'answers-db'
const storeName = 'answers'

// create database to store user inputs
async function getAnswersDB() {
  return openDB(answersDB, 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(storeName)) {
        db.createObjectStore(storeName)
      }
    }
  })
}

//write data to the answers db
async function writeData(data) {
  const db = await getAnswersDB()
  const tx = db.transaction(storeName, 'readwrite')
  const store = tx.objectStore(storeName)
  
  // Handle the data object directly
  for (const [key, value] of Object.entries(data)) {
    // Handle Vue refs by extracting their value
    const valueToStore = value && typeof value === 'object' && 'value' in value ? value.value : value
    await store.put(valueToStore, key)
  }
  await tx.done
}

// check if a key exists in the answers db
async function checkIfInAnswersDB(key) {
  const db = await getAnswersDB()
  const tx = db.transaction(storeName, 'readonly')
  const store = tx.objectStore(storeName)
  const value = await store.get(key)
  return value !== undefined
}

async function updateData(data){
  const db = await getAnswersDB()
  const tx = db.transaction(storeName, 'readwrite')
  const store = tx.objectStore(storeName)
  for (const [key] of Object.entries(data)) {
    const value = await store.get(key)
    data[key] = value
  }
  await tx.done
}

//get the value of a key from the answers db
async function getValFromAnswersDB(key) {
  const db = await getAnswersDB()
  const tx = db.transaction(storeName, 'readonly')
  const store = tx.objectStore(storeName)
  const value = await store.get(key)
  console.log("got val: " + value + " for key: " + key)
  return value
}

// Clear all data from the answers object store
async function clearAnswersDB() {
  const db = await getAnswersDB()
  const tx = db.transaction(storeName, 'readwrite')
  const store = tx.objectStore(storeName)
  await store.clear()
  await tx.done
}

export {
  getAnswersDB,
  writeData,
  checkIfInAnswersDB,
  getValFromAnswersDB,
  clearAnswersDB,
  updateData
}