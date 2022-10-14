function promiseState(promise: Promise<T>, callback: (state: string) => void) {
  // Symbols and RegExps are never content-equal
  const uniqueValue = window['Symbol'] ? Symbol('unique') : /unique/

  function notifyPendingOrResolved(value) {
    if (value === uniqueValue) {
      return callback('pending')
    } else {
      return callback('fulfilled')
    }
  }

  function notifyRejected(reason) {
    return callback('rejected')
  }
  
  const race = [promise, Promise.resolve(uniqueValue)]
  Promise.race(race).then(notifyPendingOrResolved, notifyRejected)
}

export default promiseState