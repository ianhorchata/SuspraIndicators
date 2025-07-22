import { openDB } from 'idb'

const answersDB = 'answers-db'
const storeName = 'answers'

// create database to store user inputs
async function getDB() {
  return openDB(answersDB, 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(storeName)) {
        db.createObjectStore(storeName)
      }
    }
  })
}

// ... existing code ...
async function writeData(data) {
  const db = await getDB()
  const tx = db.transaction(storeName, 'readwrite')
  const store = tx.objectStore(storeName)
  for (const [key, value] of Object.entries(data)) {
    await store.put(value, key)
  }
  await tx.done
}

// ... existing code ...
// Clear all data from the answers object store
async function clearAnswersDB() {
  const db = await getDB()
  const tx = db.transaction(storeName, 'readwrite')
  const store = tx.objectStore(storeName)
  await store.clear()
  await tx.done
}
