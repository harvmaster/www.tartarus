import {
  instantiateSecp256k1
} from '@bitauth/libauth'

import { KeyPair, keypairMeta } from './KeyPair'
import { EncryptedKeyPair, EncryptedKeyPairInterface } from './EncryptedKeyPair'

export { KeyPair }
export { EncryptedKeyPair }
export type { EncryptedKeyPairInterface }

export const createKeyPair = async (privateKey: Uint8Array) => {
  const curve = await instantiateSecp256k1()

  const keypairMeta = { created: new Date() }
  const keyPair = new KeyPair(curve, keypairMeta, null)
  if (!privateKey) await keyPair.generatePair()
  else await keyPair.generatePublicKey()

  return keyPair
}

export const importWif = async (wif) => {
  console.log(wif)
}

export const importPrivateKey = async (privateKey) => {
  console.log(privateKey)
}

export const importEncryptedKey = async (privateKey: string, secret: string, keypairMeta: keypairMeta) => {
  const curve = await instantiateSecp256k1()
  try {
    if (!keypairMeta) keypairMeta = { created: new Date() }
    const keyPair = new KeyPair(curve, keypairMeta, null)
    await keyPair.unwrap(privateKey, secret)

    return keyPair
  } catch (err) {
    throw err
    // console.error(err)
    // const keyPair = new EncryptedKeyPair(privateKey)
  }
}

export default { KeyPair, createKeyPair, importWif, importPrivateKey, importEncryptedKey }