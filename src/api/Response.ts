import Observable from './Obersvable'
import promiseState from './PromiseState'

class Response {

  cachePromise: Promise<T>
  apiPromise: Promise<T>

  constructor (cachePromise: Promise<T>, apiPromise: Promise<T>) {
    this.cachePromise = cachePromise
    this.apiPromise = apiPromise
  }

  observable () {
    const observable = new Observable()
    
    // Add cache unless api has returned first
    this.cachePromise.then(data => {
      promiseState(this.apiPromise, (state: any) => {
        if (state == 'pending') observable.set(data)
      })
    })

    // Add api result
    this.apiPromise.then(({data}) => {
      observable.set(data)
    })

    return observable
  }

  promises () {
    return {
      cache: this.cachePromise,
      api: this.apiPromise
    }
  }
}

export default Response