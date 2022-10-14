// class SWPromise {
  
//   id;
//   res;
//   rej;
//   promise;
//   constructor (message) {
//     this.id = Math.random().toString(36).substr(2, 14)
//     this.promise = new Promise((resolve: Function, reject) => {
//       this.res = resolve,
//       this.rej = reject
//       navigator.serviceWorker?.controller?.postMessage(message)
//     })
//   }

//   resolve (val) {
//     this.res(val)
//   }

//   reject (val) {
//     this.rej(val)
//   }
// }

// export default SWPromise

// export function* SWPromise(data) {
//   let resolve = (d) => {}
//   const p = new Promise((res, rej) => resolve = res)
//   navigator.serviceWorker?.controller?.postMessage(data)

//   yield p

//   resolve(data)

//   return
// } 

// export const SWPromise = (data) => {
//   return new Promise ((resolve, reject) => {
//     const handleMessage

//     addEventListener('message', handleMessage)
//   })
// }
const promises = {}
const handleMessage = (message) => {
  // console.log('SWPromise' ,message)
  const id = message.data.id
  if (!promises[id]) return

  promises[id](message.data.res)
  delete promises[id]
}

const channel = new BroadcastChannel('tartarus');
channel.onmessage = (message => handleMessage(message))

export function* SWPromiseGenerator(data) {

  let req = yield

  // Calling next makes req = { type: {}, command: {}, params: {} }
  while (true) {
    const id = Math.random().toString(36).substr(2, 14)
    const p = new Promise((res, rej) => {
      promises[id] = res
    })

    // console.log(req)
    if (!!req) navigator.serviceWorker?.controller?.postMessage({ id, ...req })

    req = yield p
  }

  return
}

const SWPromiseGen = SWPromiseGenerator()
SWPromiseGen.next()

export const SWPromise = (data) => {
  // console.log(data)
  return SWPromiseGen.next(data).value
}

export default SWPromise