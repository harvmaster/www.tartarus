import { api } from 'boot/axios'
import keypair from '../crypto/keypair'
import sha256 from '../crypto/sha256'
import AuthResponse from './AuthResponse'

interface AuthParameters {
  email: string,
  password: string,
  username?: string,
  dob?: Date
}

class AuthRequest {

  params: AuthParameters

  get passwords (): Promise<{ sPassword: string, pPassword: string }> {
    return new Promise((resolve) => {
      sha256.hash(this.params.password)   // Private password which is used to encrypt on the client
      .then(sPassword => { 
        sha256.hash(sPassword)            // Public password which is sent to the server
        .then(pPassword => resolve({sPassword, pPassword})) 
      }) 
    })
  }

  get secret(): Promise<string> {
    return new Promise((resolve) => {
      sha256.hash(this.params.password).then(sPassword => resolve(`${this.params.email}${sPassword}`))
    })
  }

  constructor (params: AuthParameters) {
    this.params = params
  }

  async login () {
    const { pPassword } = await this.passwords

    const { data } = await api.post('/users/login', { user: { email: this.params.email, password: pPassword } })

    const authed = new AuthResponse(data)
    return authed
  }

  async register () {
    const { pPassword } = await this.passwords
    const secret = await this.secret

    // Create new key pair
    const pair = await keypair.createKeyPair(null)
    const encryptedKey = await pair.export(secret)

    // Send post request
    const body = { user: {
      email: this.params.email,
      password: pPassword,
      username: this.params.username,
      dob: this.params.dob,
      ...encryptedKey
    }}

    const { data } = await api.post('/users', body)
    console.log(data)

    return new AuthResponse(data)
  }
}

export default AuthRequest