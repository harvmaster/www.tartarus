import { KeyPair, EncryptedKeyPair } from "../crypto/keypair"
import { aesFromRandom } from '../crypto/aes'
import { 
  base58ToBin,
  // binToBase58 
} from '@bitauth/libauth'

interface AuthedUserInterface {
  id: string,
  accountCode: number,
  email: string,
  secret: string,
  username: string,
  keypairs: {
    decrypted: KeyPair[],
    encrypted: EncryptedKeyPair[]
  }
}

class AuthedUser {
  
  id: string
  accountCode: number
  email: string
  secret: string
  username: string
  keypairs: {
    decrypted: KeyPair[],
    encrypted: EncryptedKeyPair[]
  }

  constructor ({ id, accountCode, email, username, secret, keypairs }: AuthedUserInterface) {
    this.id = id
    this.accountCode = accountCode
    this.email = email
    this.secret = secret
    this.username = username
    this.keypairs = keypairs
  }

  async decryptKeys (secret = this.secret) {
    const computedPromises = this.keypairs.encrypted.map(key => key.unwrap(secret))
    const computed = await Promise.all(computedPromises)

    const decrypted: KeyPair[] = computed.filter((key) => key instanceof KeyPair) as KeyPair[]
    const encrypted: EncryptedKeyPair[] = computed.filter((key) => key instanceof EncryptedKeyPair) as EncryptedKeyPair[]

    this.keypairs.decrypted.concat(decrypted)
    this.keypairs.encrypted = encrypted
    return this
  }

  async getNewestKeyPair () {
    let newest: KeyPair = this.keypairs.decrypted[0]
    if (!newest) return null

    this.keypairs.decrypted.forEach((key: KeyPair) => key.created > newest.created ? newest = key : {})
    return newest
  }

  async findFromPublic (publicKey: string) {
    const pubKey = base58ToBin(publicKey)
    const match = this.keypairs.decrypted?.find((key: KeyPair) => key.publicKey == pubKey)

    return match
  } 

  async createAESKey () {

  }
}

export default AuthedUser