class Obersvable {
  
  value
  subscriptions:{ (value: any): void }[]

  constructor () {
    this.value = {}
    this.subscriptions = []
  }

  set (value: any) {
    this.value = value
    this.#callSubcriptions()
  }

  subscribe (cb: (value: any) => void) {
    this.subscriptions.push(cb)
    return this
  }

  #callSubcriptions () {
    this.subscriptions.forEach(cb => cb(this.value))
  }
}

export default Obersvable