import { boot } from 'quasar/wrappers'

export default boot(function ({ app, store }) {

  if (['spa', 'pwa', 'ssr', 'bex'].includes(process.env.MODE)) {
    if (!process.env.SERVER) {
      // mode: spa, pwa, bex, ssr (client-side only)
      const appWorker = new SharedWorker('app-worker.js');
      let resolve: type Promise['resolve']
      const ready = new Promise(r => {
        resolve = r
      })
      appWorker.port.addEventListener('message', (e) => {
        if (e.data && e.data.command) {
          case 'ready':
            resolve();
            break;
        }
      });
    
      appWorker.port.start();
      window.addEventListener('beforeunload', function() {
        appWorker.port.postMessage({
          id: store.state.app.id,
          command: 'disconnect'
        });
      });
      app.config.globalProperties.$worker = appWorker;
      return ready
    } else {
      // mode: ssr (server-side only)
      // at the server side, u just need to call the refresh endpoint once.
    }
  } else {
    // mode: electron, cordova, capacitor
    // there is no need for a shared worker.
    // just create a interval and don't worry about race conditions.
  }
})