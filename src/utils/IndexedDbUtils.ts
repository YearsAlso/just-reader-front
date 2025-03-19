class IndexedDbUtils {
  private static dbName = 'book-store'
  private static storeName = 'books'

  static async openDb(): Promise<IDBDatabase> {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(this.dbName, 1)

      request.onerror = (event) => {
        console.error('Error opening database:', event)
        reject(event)
      }

      request.onsuccess = (event) => {
        resolve((event.target as IDBOpenDBRequest).result)
      }

      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result
        db.createObjectStore(this.storeName, {
          keyPath: 'id',
          autoIncrement: true
        })
      }
    })
  }
}

export { IndexedDbUtils }
