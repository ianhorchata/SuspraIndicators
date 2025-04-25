const dbName = 'suspra';
const dbVersion = 1;
const storeName = 'indicators';

function readStore(resolve: (value: unknown) => void, ostore: IDBObjectStore) {
  const community = useCommunityIndicators();
  const food = useFoodIndicators();

  ostore.openCursor().onsuccess = (event) => {
    const cursor = (event.target as IDBRequest).result;
    if (!cursor) {
      resolve({ success: true });
      return;
    }

    const v = cursor.value;
    switch (v.indicators) {
      case 'community':
        community.value = v;
        break;
      case 'food':
        food.value = v;
        break;
    }

    cursor.continue();
  }
}

export function loadIndicators(resolve: (value: unknown) => void, reject: (reason?: any) => void) {
  const request = window.indexedDB.open(dbName, dbVersion);

  request.onerror = (_event: unknown) => {
    console.error(`Error opening database: ${dbName}.${dbVersion}`);
    reject(`${dbName}.${dbVersion}: cannot open`);
  };

  request.onupgradeneeded = (event) => {
    const db = (event.target as IDBRequest).result;
    db.createObjectStore(storeName, { keyPath: 'indicators' });
  };

  request.onsuccess = (event) => {
    const db = (event.target as IDBRequest).result;
    const txn = db.transaction(storeName);

    txn.onerror = (_e: unknown) => {
      console.error(`Error loading indicators from database: ${dbName}.${dbVersion}`);
      reject(`${dbName}.${dbVersion}: cannot load indicators`);
    };

    const ostore = txn.objectStore(storeName);
    readStore(resolve, ostore);
  }
}

export function saveIndicators<T extends { indicators: 'community' | 'food' }>(indicators: T) {
  const request = window.indexedDB.open(dbName, dbVersion);

  request.onerror = (_event: unknown) => {
    console.error(`Error opening database for saving ${indicators.indicators} indicators: ${dbName}.${dbVersion}`);
  };

  request.onupgradeneeded = (_event: unknown) => {
    console.error(`Database should have been been initialized before saving indicators: ${dbName}.${dbVersion}`);
  }

  request.onsuccess = (event) => {
    const db = (event.target as IDBRequest).result;
    const txn = db.transaction(storeName, 'readwrite');

    txn.onerror = (_e: unknown) => {
      console.error(`Error saving ${indicators.indicators} indicators to database: ${dbName}.${dbVersion}`);
    }

    const ostore = txn.objectStore(storeName);
    while (isRef(indicators)) {
      indicators = toRaw(indicators.value) as T;
    }
    ostore.put(indicators);
  }
}
