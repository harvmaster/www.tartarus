import { binToBase64 } from '@bitauth/libauth'

const hash = async (str, iterations = 1) => {
  const encoder = new TextEncoder()
  const bytes = encoder.encode(str)

  let hashed = bytes
  for (let i = 0; i < iterations; i++) {
    hashed = await hashBytes(hashed)
  }

  return binToBase64(hashed)
}

const hashBytes = async (bytes, returnString = false) => {
  bytes = bytes.buffer
  let hashed = await crypto.subtle.digest('SHA-256', bytes)
  if (returnString) hashed = binToBase64(new Uint8Array(hashed))
  else hashed = new Uint8Array(hashed)
  return hashed
}

const test = async () => {
  console.log(await hash('11')) // T8grJq7LR9KGjE7741gXMqPny8xsLvsyBiwIFwoF7rg=
  console.log(await hash('12')) // a1HUMd9dfxQcvs7M957fPdhhw7QGnwsRZho+76y7qRg=
  console.log(await hash('13')) // P9ujXwTcjEYphsmSvPh1VGJXETByqQnBYvfkcOWB4ng=
  console.log(await hash('14')) // hSeokeIkE2lQ/zLKIStFvJP2n7uAHDsevtrFJ3X5nmE=
} 

test()

export default { hash, hashBytes }