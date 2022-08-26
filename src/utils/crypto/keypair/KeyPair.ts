import { utils } from '@noble/secp256k1'

import aes from '../aes'
import sha256 from '../sha256'

import { 
  instantiateSha256, 
  encodePrivateKeyWif, 
  generatePrivateKey,
  binToBase58,
  base58ToBin 
} from '@bitauth/libauth'

import * as ecies from 'ecies-wasm'

export interface keypairMeta {
  created?: Date,
  exposed?: Date
}

export class KeyPair {
  #privateKey: Uint8Array
  publicKey: Uint8Array

  created?: Date
  exposed?: Date

  #secp

  constructor (secp, { created, exposed }: keypairMeta, privateKey: Uint8Array) {
    this.#secp = secp
    this.#privateKey = privateKey

    this.created = created
    this.exposed = exposed
  }

  async generatePublicKey () {
    this.publicKey = this.#secp.derivePublicKeyCompressed(this.#privateKey)
  }

  async generatePair () {
    this.#privateKey = generatePrivateKey(() => utils.randomBytes(32))
    this.generatePublicKey()
  }

  static async encrypt (publicKey: string, data: Uint8Array) {
    const encrypted = ecies.encrypt(base58ToBin(publicKey), Uint8Array.from(data))
    return encrypted
  }

  async decrypt (data: Uint8Array) {
    const decrypted = ecies.decrypt(this.#privateKey, data)
    return decrypted
  }

  hasPrivateKey () {
    return !!this.#privateKey
  }

  async getWif () {
    const sha256 = await instantiateSha256()
    const wif = encodePrivateKeyWif(sha256, this.#privateKey, 'mainnet')

    return wif
  }

  async import () {
    return this
  }

  async export (secret: string) {
    const wif = await this.getWif()
    const privateKey = secret ? await this.wrap(secret) : this.#privateKey
    const publicKey = binToBase58(this.publicKey)
    const secretHash = await sha256.hash(secret)

    return {
      privateKey,
      publicKey,
      wif,
      secretHash
    }
  }

  /**
   * Encrypts the private key with the users password and email
   * @param {String} secret ('email' + 'password')
   * @returns {String}
   */
  async wrap (secret: string) {
    const aesKey = await aes.aesFromString(secret)
    const encrypted = await aesKey.encrypt(this.#privateKey)

    const encodedKey = binToBase58(new Uint8Array(encrypted))
    return encodedKey
  }

  /**
   * Decrypts private key and returns it as Uint8Array
   * @param {String} privateKey (Base58 Encoded) encrypted private key you'd like to import
   * @param {String} secret ('email' + 'password')
   * @retuns {Uint8Array}
   */
  async unwrap (privateKey: string, secret: string) {
    const privateKeyBin = base58ToBin(privateKey)
    const aesKey = await aes.aesFromString(secret)
    const decrypted = await aesKey.decrypt(privateKeyBin)

    const key = new Uint8Array(decrypted)

    this.#privateKey = key
    await this.generatePublicKey()

    return this
  }

  getCreated () {
    return this.created
  }
  getExposed () {
    return this.exposed
  }
}

export default KeyPair