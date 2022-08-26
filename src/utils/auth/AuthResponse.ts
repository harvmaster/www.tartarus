import { KeyPair, EncryptedKeyPair, EncryptedKeyPairInterface } from 'src/utils/crypto/keypair'

interface AuthResponseInput {
  id: string,
  accountCode: number,
  username: string,
  keypairs: EncryptedKeyPairInterface[],
  jwt: string
}

class AuthResponse {
  
  id: string
  accountCode: number
  username: string
  keypairs: EncryptedKeyPair[]
  jwt: string

  constructor ({ id, accountCode, username, keypairs, jwt }: AuthResponseInput) {
    this.id = id
    this.accountCode = accountCode
    this.username = username
    this.keypairs = this.mapEncryptedKeyPairs(keypairs)
    this.jwt = jwt
  }

  mapEncryptedKeyPairs (keypairs: EncryptedKeyPairInterface[]) {
    const encryptedKeyPairs: EncryptedKeyPair[] = keypairs.map((keypair: EncryptedKeyPairInterface) => new EncryptedKeyPair(keypair))

    return encryptedKeyPairs
  } 

  async decryptKeys (secret: string): Promise<{decrypted: KeyPair[], encrypted: EncryptedKeyPair[]}> {
    const computedPromises = this.keypairs.map(key => key.unwrap(secret))
    const computed = await Promise.all(computedPromises)

    const decrypted: KeyPair[] = computed.filter((key) => key instanceof KeyPair) as KeyPair[]
    const encrypted: EncryptedKeyPair[] = computed.filter((key) => key instanceof EncryptedKeyPair) as EncryptedKeyPair[]

    return {decrypted, encrypted}
  }

}

export default AuthResponse