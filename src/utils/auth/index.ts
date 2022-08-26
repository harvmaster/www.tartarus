import { api } from 'boot/axios'
import keypair from 'src/services/keypair'
import sha256 from 'src/services/sha256'

interface User {
  email: String,
  password: String,
  username: String
}

interface UserRes {
  id: String,
  accountCode: String,
  username: String,
  keypairs: KeyPair[]
}

interface KeyPair {
  id: String,
  privateKey: String,
  publicKey: String,
  secretHash: String,
  user: String
}

/**
  * Returns the response from the '/login' post request with computed keypairs
  * @param {Object} user { email: String, password: String }
  * @returns {Object} data
  */
export const login = async (user: User) => {
  const { email, password } = user
  if (!email) throw new Error('Email cannot be blank')
  if (!password) throw new Error('Password cannot be blank')

  const sPassword: String = await sha256.hash(password) // Used to encrypt keys. 'secret password'
  const pPassword: String = await sha256.hash(sPassword) // Used to log in to account (the password the server sees). 'public password'

  const { data }: { data: UserRes } = await api.post('/users/login', { user: { email, password: pPassword} })
  console.log(data)

  const secret: String = `${email}${sPassword}`
  const secretHash: String = await sha256.hash(secret)

  const encryptedKeypairs = data.keypairs
  const keypairs = await decryptKeys(encrypedKeypairs, secret)

}

export const register = async (user) => {

}

export const decryptKeys = async (keys, secret) => {
  const secretHash = await sha256.hash(secret)
  const failed: KeyPair[] = keys.filter(key => key.secretHash != secretHash).map(key => key.failed = 'Incorrect password')
  
  const decrypted = keys.filter(key => key.secretHash == secretHash).map(key => keypair.importEncryptedKey(secret))
  await Promise.all(decrypted)

  return [decrypted, failed]
}

export default { login, register }