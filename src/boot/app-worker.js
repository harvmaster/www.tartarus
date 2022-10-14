let ports = new Map();
let interval = 0;

onconnect = function(e) {
  const port = e.ports[0];
  port.postMessage({ command: 'ready' })
}

onmessage = function (e) {
  const port = e.ports[0]
  if (e.data && e.data.command) {
    switch (e.data.command) {
      case 'connect':
        // i don't if u need the token, probably not, since the ideal is to rely on a cookie (http-only, same-domain, secure) to do the refresh.
        ports.set(e.data.id, { port, token: e.data.token });
        port.postMessage({ command: 'token', token: e.data.token })
        if (!interval) {
          interval = setInterval(function () {
            fetch('https://yoururl.com/refresh')
              .then(response => response.text())
              .then(data => {
                for (const [id, { token, port }] of ports) {
                  port.postMessage({ command: 'token', token: data  })
                }
              })
          }, 360000) // each 6 minutes
        }
        break;
      case 'disconnect':
        if (e.data.id) {
          if (map.has(e.data.id)) {
            map.delete(e.data.id);
          }
        } else {
          // disconnected all tabs
          map.clear()
          port.postMessage({ command: 'token', token: null })
        }
        if (ports.size === 0) {
          clearInterval(interval)
        }
        break;
      }
  }
}

/* To use
import { uid } from 'quasar'

function login () {
  const { data: token } = await this.$api.post('/login', ...)
  
  if (this.$worker) {
    const id = uid();
    this.$store.commit('app/id', id)
    this.$worker.port.postMessage({
      id: id,
      token: token,
      command: 'connect'
    });
  } else {
    this.$store.dispatch('app/setToken', token)
  }
}

function login () {
  await this.$api.post('/logout', ...)
  if (this.$worker) {
    // call 'disconnect' without id wll clear the token in all tabs.
    this.$worker.port.postMessage({ command: 'disconnect' });
  } else {
    this.$store.dispatch('app/setToken', null)
  }
}
*/