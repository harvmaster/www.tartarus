import { base58ToBin } from '@bitauth/libauth'
import { api } from 'boot/axios'
import { LocalStorage } from 'quasar'
import { KeyPair, EncryptedKeyPair } from '../crypto/keypair'
import sha256 from '../crypto/sha256'
import AuthRequest from './AuthRequest'
import AuthResponse from './AuthResponse'

class User {

  id = ''
  accountCode = 0
  email = ''
  username = ''
  keypairs?: {
    decrypted: KeyPair[],
    encrypted: EncryptedKeyPair[]
  }
  
  // For singup
  password = ''
  dob?: Date

  errors = {
    email: '',
    password: '',
    username: ''
  }

  loading = false

  get secret(): Promise<string> {
    return new Promise((resolve) => {
      sha256.hash(this.password).then(sPassword => resolve(`${this.email}${sPassword}`))
    })
  }

  async login () {
    const request = new AuthRequest({ email: this.email, password: this.password })
    try {
      this.loading = true
      const response = await request.login()
      await this.setUser(response)
    } catch (err) {
      if (err.response?.status == 401) this.errors.password = 'Email or password incorrect'
    } finally {
      this.loading = false
    }
  }

  async register () {
    const request = new AuthRequest({ email: this.email, password: this.password, username: this.username, dob: this.dob })
    try {
      this.loading = true
      const response = await request.register()
      await this.setUser(response)
    } catch (err) {
      if (err.response?.status == 409) return this.errors.email = 'Email already in use'
      console.error(err)
    } finally {
      this.loading = false
    }
  }

  async setUser (user: AuthResponse) {
    this.id = user.id
    this.accountCode = user.accountCode
    this.username = user.username
    this.keypairs = await user.decryptKeys(await this.secret)

    api.defaults.headers.common.authorization = 'Token ' + user.jwt
    LocalStorage.set('user', {
      id: this.id,
      accountCode: this.accountCode,
      username: this.username,
      keypairs: this.keypairs,
      jwt: user.jwt
    })
  }

  async getNewestKeyPair () {
    if (!this.keypairs?.decrypted) return null
    let newest: KeyPair = this.keypairs.decrypted[0]

    this.keypairs.decrypted.forEach((key: KeyPair) => (key.created || 0) > (newest.created || 0) ? newest = key : {})
    return newest
  }

  async findFromPublic (publicKey: string) {
    const pubKey = base58ToBin(publicKey)
    const match = this.keypairs?.decrypted?.find((key: KeyPair) => key.publicKey == pubKey)

    return match
  } 
}

export default User