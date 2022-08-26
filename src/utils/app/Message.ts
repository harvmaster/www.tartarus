import { base64ToBin, binToUtf8 } from '@bitauth/libauth'
import KeyManager from './KeyManager'

interface MessageInput {
  id: string,
  sender: string, // Should make a public key object
  content: string, // base64 encoded Encrypted Message
  keyHash: string, // hash of the key used to encrypt message
  created: Date,
}

class Message {

  id: string
  sender: string
  encryptedContent: string
  content: string
  keyHash: string
  created: Date

  constructor ({ content, created, id, keyHash, sender }: MessageInput) {
    this.content = ''
    this.encryptedContent = content
    this.decrypt(this.encryptedContent)

    this.created = created
    this.id = id
    this.keyHash = keyHash
    this.sender = sender
  }

  async decrypt (message: string) {
    const bytes = base64ToBin(message)
    const key = KeyManager.getKey(this.keyHash)
    if (!key) throw new Error(`Unable to decrypt message ${this.id}`)

    const decrypted = await key.decrypt(bytes)
    const encoded = await binToUtf8(decrypted)

    this.content = encoded
    return encoded
  }



  
}

export default Message