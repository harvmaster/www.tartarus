import { AESKey } from '../crypto/aes'

class KeyManager {
  
  keys: {[key: string]: AESKey} = {} 

  addKey (key: AESKey) {
    if (this.keys[key.id]) throw new Error('Key already exists. Please use setKey to overwrite key data')

    this.keys[key.id] = key
    return this
  }

  removeKey (key: AESKey) {
    if (!this.keys[key.id]) throw new Error('Key could not be found')

    delete this.keys[key.id]
    return this
  }

  setKey (key: AESKey) {
    if (!this.keys[key.id]) throw new Error('Key does not already exist. Please use AddKey to create a new entry')

    this.keys[key.id] = key
    return this
  }

  getKey (keyHash: string) {
    return this.keys[keyHash]
  }

}

export default new KeyManager()