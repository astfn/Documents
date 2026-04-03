import CryptoJS from 'crypto-js'
import { isNullOrUndefined } from './validator'

const AesKey = 'Ly78Fr29Pu25BgEu'

export function AES_Dencrypt(word: string) {
  try {
    if (!word) return ''
    let keys = CryptoJS.enc.Utf8.parse(AesKey)
    let decrypt = CryptoJS.AES.decrypt(word, keys, {
      mode: CryptoJS.mode.ECB,
      padding: CryptoJS.pad.Pkcs7,
    })
    let decryptedStr = decrypt.toString(CryptoJS.enc.Utf8)
    return decryptedStr.toString()
  } catch (e) {
    console.error(e)
    return word
  }
}

export function AES_Encrypt(word: string) {
  try {
    if (!word) return ''
    let srcs = CryptoJS.enc.Utf8.parse(word)
    let keys = CryptoJS.enc.Utf8.parse(AesKey)
    let encrypted = CryptoJS.AES.encrypt(srcs, keys, {
      mode: CryptoJS.mode.ECB,
      padding: CryptoJS.pad.Pkcs7,
    })
    let hexStr = encrypted.ciphertext.toString().toUpperCase()
    let oldHexStr = CryptoJS.enc.Hex.parse(hexStr)
    return CryptoJS.enc.Base64.stringify(oldHexStr)
  } catch (e) {
    console.error(e)
    return word
  }
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
type TSingleValueToArrayRes<T> = T extends (infer _U)[]
  ? T
  : T extends null | undefined
  ? []
  : T[]
export function singleValueToArray<T>(value: T): TSingleValueToArrayRes<T> {
  if (Array.isArray(value)) {
    return value as TSingleValueToArrayRes<T>
  }
  return (isNullOrUndefined(value) ? [] : [value]) as TSingleValueToArrayRes<T>
}

type TArrayToSingleValueRes<T> = T extends (infer U)[] ? U : T
export function arrayToSingleValue<T>(value: T): TArrayToSingleValueRes<T> {
  if (Array.isArray(value)) {
    return value?.[0]
  }
  return value as TArrayToSingleValueRes<T>
}
