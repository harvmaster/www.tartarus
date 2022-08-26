# Quasar App (-www)

A Quasar Project

## Install the dependencies
```bash
yarn
# or
npm install
```

### Start the app in development mode (hot-code reloading, error reporting, etc.)
```bash
quasar dev
```


### Lint the files
```bash
yarn lint
# or
npm run lint
```


### Format the files
```bash
yarn format
# or
npm run format
```



### Build the app for production
```bash
quasar build
```

### Customize the configuration
See [Configuring quasar.config.js](https://v2.quasar.dev/quasar-cli-webpack/quasar-config-js).


### REMEMBERS:
- services/sha256 still contains test code in it

## AUTH FLOW
```
  secret = 'email'+sha256('password')
  keyPair = randomKeyPair()
  /*
    {
      publicKey,
      privateKey
    }
  */

  aesKey = DeriveAES(PBKDF2(secret)) // 100000 iterations
  encryptedPrivateKey = aesKey(keyPair.privateKey)
  /*
    {
      encryptedKey,
      sourceHash: sha256(secret)
    }
  */


  axios.post('/create', {
    email,
    sha256('password'),
    encryptedPrivateKey.privateKey,
    encryptedPrivateKey.sourceHash, // Used to quickly know if the current password is usable for a key
    keyPair.publicKeym
  })
```
```
  axios.post('/login', {
    email,
    sha256('password')
  })