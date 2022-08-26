class AESKey {

  id;
  key;
  iv;

  getKey () {
    return this.key
  }

  setIV (iv) {
    this.iv = iv
  }

  async debugKey () {
    const jwk = await window.crypto.subtle.exportKey('jwk', this.key)
    console.log(jwk)
  }

  async encrypt (data) {
    if (!this.key) throw new Error('The key must be initialised before encrypting')

    const encrypted = await window.crypto.subtle.encrypt(
      {
        name: 'AES-GCM',
        iv: this.iv
      },
      this.getKey(),
      data
    )

    return encrypted
  }

  async decrypt (data) {
    if (!this.key) throw new Error('The key must be initialised before decrypting')

    try {
      const decrypted = await window.crypto.subtle.decrypt(
        {
          name: 'AES-GCM',
          iv: this.iv
        },
        this.getKey(),
        data
      )

      return decrypted
    } catch (err) {
      throw new Error('Failed to decrypt data. This could be caused by an incorrect aes key.')
    }
  }

  async import (key) {
    const k = await window.crypto.subtle.importKey(
      'jwk',
      key,
      {
        name: 'AES-GCM',
        length: 256
      },
      true,
      ['encrypt', 'decrypt']
    );

    this.key = k
    return this
  }

  async export (key = this.key) {
    const exported = await window.crypto.subtle.exportKey(
      'jwk',
      key
    );

    return exported
  }

  async createRandomKey () {
    let key = await window.crypto.subtle.generateKey(
      {
        name: 'AES-GCM',
        length: 256
      },
      true,
      ['encrypt', 'decrypt']
    );
    this.key = key
    this.iv = window.crypto.getRandomValues(new Uint8Array(12))

    return this
  }

  async createFromBytes (bytes, salt) {
    const pbkdf = await window.crypto.subtle.importKey('raw', bytes, 'PBKDF2', false, ['deriveBits', 'deriveKey'])
    const key = await window.crypto.subtle.deriveKey(
    {
      'name': 'PBKDF2',
      salt: salt,
      'iterations': 100000,
      'hash': 'SHA-256'
    },
      pbkdf,
    { 
      'name': 'AES-GCM',
      'length': 256
    },
      true,
    [ 'encrypt', 'decrypt' ]
    )

    this.key = key

    return this
  }
}

export default AESKey