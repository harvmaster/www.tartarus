import { encrypt } from 'ecies-wasm'
import { base58ToBin } from '@bitauth/libauth'
import { AESKey, aesFromRandom } from 'src/utils/crypto/aes'

interface UserInput {
  accountCode: number,
  publicKey: string,
  username: string
}

export class User {
  
  accountCode: number
  publicKey: string
  username: string

  constructor ({ accountCode, publicKey, username }: UserInput) {
    this.accountCode = accountCode
    this.publicKey = publicKey
    this.username = username
  }

  encrypt (data: Iterable<number>) {
    const pubKey = base58ToBin(this.publicKey) as Uint8Array
    const d = Uint8Array.from(data)

    return encrypt(pubKey, d)
  }

  async sendAesKey (key: AESKey) {
    const encryptedKey = this.encrypt(key)

    // Send to api
    

  }

  async createAesKey () {
    const key = await aesFromRandom()
    await this.sendAesKey(key)


  }

}

export default User