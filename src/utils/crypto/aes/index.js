import AESKey from './key'

export { AESKey }

const sha256 = async (data) => {
  data = new ArrayBuffer(data)
  const hash = await crypto.subtle.digest('SHA-256', data)
  return hash
}
// Factory methods for creating AES keys
export const aesFromString = async (str) => {
  const encoder = new TextEncoder()
  const bytes = encoder.encode(str)

  return await aesFromBytes(bytes)
}

export const aesFromBytes = async (bytes) => {
  if (!(bytes instanceof Uint8Array)) throw new Error('aesFromBytes Input Error. The input must be in a Uint8Array format')

  const keyVal = await sha256(bytes)
  const iv = await sha256(keyVal).then(hash => hash.slice(0, 12))

  const key = await new AESKey().createFromBytes(bytes, keyVal)
  key.setIV(iv)

  return key
}

export const aesFromRandom = async () => {
  const key = await new AESKey().createRandomKey()

  return key
}

export default { AESKey, aesFromBytes, aesFromString, aesFromRandom }