/*
 * This file (which will be your service worker)
 * is picked up by the build system ONLY if
 * quasar.config.js > pwa > workboxMode is set to "injectManifest"
 */

declare const self: ServiceWorkerGlobalScope & typeof globalThis;
self.__WB_MANIFEST

import { initDb, Database } from './db'

// import { clientsClaim } from 'workbox-core';
// import {
//   precacheAndRoute,
//   cleanupOutdatedCaches,
//   // createHandlerBoundToURL,
// } from 'workbox-precaching';
// // import { registerRoute, NavigationRoute } from 'workbox-routing';

// self.skipWaiting();
// clientsClaim();

// // Use with precache injection

// cleanupOutdatedCaches();


// Non-SSR fallback to index.html
// Production SSR fallback to offline.html (except for dev)
// if (process.env.MODE !== 'ssr' || process.env.PROD) {
//   registerRoute(
//     new NavigationRoute(
//       createHandlerBoundToURL(process.env.PWA_FALLBACK_HTML),
//       { denylist: [/sw\.js$/, /workbox-(.)*\.js$/] }
//     )
//   );
// }
      
// import { openDB, deleteDB, wrap, unwrap } from 'idb';

let db : Database;
const loadDb = async () => {
  // db = await openDB('app', 2, {
  //   upgrade (db, old, newdb, tx) {
  //     db.createObjectStore('users', { keyPath: 'id' })
  //     console.log(db, old, newdb, tx)
  //   }
  // })
  db = await initDb()
  console.log(db)
  // const tx = db.transaction('users', 'readwrite')
  // await Promise.all([
  //   tx.store.add({
  //     id: '123456789',
  //     username: 'Test User Store',
  //     created: Date.now()
  //   }),
  //   tx.done
  // ])
}

loadDb()

self.addEventListener('fetch', (event) => {
  console.log('cunt')
})


/*
  data: {
    type [ 'db' ],
    command: [ 'find', 'findOne', 'findById' ]
  }
*/

const swInterfaces = {
  db: {
    find: (params) => {
      return db.find(params)
    },
    // findOne: () => {},
    // findById: () => {}
  }
}

const channel = new BroadcastChannel('tartarus');

self.addEventListener('message', async (event) => {
  // console.log(event.data)
  
  // Check supported type
  const {type, command, params} = event.data
  if (!Object.keys(swInterfaces).includes(type)) throw new Error('Invalid SW request')
  // Check type supports command
  // console.log(swInterfaces[type])
  // console.log(Object.keys(swInterfaces[type]))
  if (!Object.keys(swInterfaces[type]).includes(command)) throw new Error(`Invalid SW command on type '${type}'`)

  const res = await swInterfaces[type][command](params)
  
  // if (!self.clients) return
  // console.log(event)
  // const client = await self.clients.get(event.clientId);
  // if (!client) return;

  // console.log(res)
  channel.postMessage({ id: event.data.id, res: res });

  // console.log(res, client)
  // client.postMessage()
})

self.addEventListener("install", (event) => {
  self.skipWaiting()
  console.log('Installed Service Worker')
})


console.log('loaded service worker')