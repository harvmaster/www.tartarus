import { importEncryptedKey } from '../keypair'

export interface EncryptedKeyPairInterface {
  id: string,
  privateKey: string,
  publicKey: string,
  secretHash: string,
  created: Date,
  exposed: Date,
  failed?: string
}

export class EncryptedKeyPair {
  id: string
  privateKey: string
  publicKey: string
  secretHash: string
  created: Date
  exposed: Date

  failed?: string // Used when decrypting to provide a description of why it couldnt be decrypted

  constructor ({ id, privateKey, publicKey, secretHash, created, exposed, failed }: EncryptedKeyPairInterface ) {
    this.id = id
    this.privateKey = privateKey
    this.publicKey = publicKey
    this.secretHash = secretHash
    this.created = created
    this.exposed = exposed
    this.failed = failed || ''
  }

  async unwrap (secret: string) {
    return await importEncryptedKey(this.privateKey, secret, { created: this.created, exposed: this.exposed }).catch(err => {
      this.failed = err.message
      return this 
    })
  }
}

export default EncryptedKeyPair