import SWPromise from './ServiceWorkerPromises';



class Database {

  storeName;

  constructor (storeName: string) {
    this.storeName = storeName
  }

  async find (query: any) {
    const request = SWPromise({ type: 'db', command: 'find', params: { storeName: this.storeName, query }})
    return request
  } 

  async findOne (query: any) {
    const request = SWPromise({ type: 'db', command: 'findOne', params: { storeName: this.storeName, query }})
    return request
  }

  async findById (id: string) {
    const request = SWPromise({ type: 'db', command: 'findById', params: { storeName: this.storeName, id }})
    return request
  }
}

export default Database