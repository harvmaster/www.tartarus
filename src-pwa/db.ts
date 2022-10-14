import { openDB, IDBPDatabase } from 'idb'

/*
  authed: { information about the authed user
    id: string,
    username: string,
    accountCode: number,
    bio: string,
    avatar: url,

    keypairs: [{
      id: string,
      publicKey: string,
      privateKey: string,
      secretHash: string,
      created: Date,
      exposed: Date
    }],
    created: Date
  }

  users: { Other users you know
    id: string,
    username: string,
    accountCode: number,
    bio: string,
    avatar: url,

    keypairs: [{
      id: string,
      publicKey: string,
      created: Date
    }]
    memberships: [{
      server: id,
      nickname: string
      roles: [{
        id: string,
        name: string,
        hierarchy: number,
        permissions: Number
      }]
    }],
    relationship: string    friends | blocked | none,
    created: Date
  }

  servers: { servers you are a member to
    id: string,
    name: string,
    description: string,
    shortId: string,
    avatar: url,
    roles: [{
      id: string,
      name: string,
      permissions: Number
    }],
    membership: {
      id: string,
      nickname: string,
      roles: [{
        id: string,
        name: string,
        permissions: Number
      }]
    }
    created: Date
  }

  channels: { channels are apart of servers or private conversations
    id: string,
    name: string,
    shortId: string,
    type: string        Text | Voice
    permittedRoles: [id:role],
    created: Date
  },

  messages: { messages sent in each channel
    id: string,
    sender: id:user,
    content: Array Buffer | string      undecided,
    keyUsed: keyHash:key,
    mentions: [ id:user ],
    revision: string,
    created: Date,
  },

  keys: {
    id: string,
    publicKey: publicKey:keyPairs:authed,
    key: Array Buffer | string,
    keyHash: string,
    created: Date,
    exposed: Date
  }
*/

export const initDb = async () => {
  const db = await openDB('test', 2, {
    upgrade (db, old, newdb, tx) {
      db.createObjectStore('authed', { keyPath: 'id'})
      db.createObjectStore('users', { keyPath: 'id' })
      db.createObjectStore('servers', { keyPath: 'id' })
      db.createObjectStore('channels', { keyPath :'id' })
      db.createObjectStore('messages', { keyPath: 'id' })
      db.createObjectStore('keys', { keyPath: 'keyHash' })
      console.log(db, old, newdb, tx)
    }
  })
  console.log(db)
  
  // const tx = db.transaction('users', 'readwrite')
  // await Promise.all([
  //   tx.store.add({
  //     id: '123456788',
  //     username: 'Test User2',
  //     created: Date.now()
  //   }),
  //   tx.done
  // ])

  // const tx = db.transaction('users', 'readwrite')
  // const users = new Array(50).fill(0).map(() => tx.store.add({
  //   id: Math.floor(Math.random() * 100000),
  //   username: `user${Math.floor(Math.random() * 1000)}`,
  //   created: Date.now()
  // }))
  // await Promise.all([
  //   ...users,
  //   tx.done
  // ])

  const wrappedDb = new Database(db)
  return wrappedDb


}

interface queryParams {
  storeName: string,
  query?: any
}

export class Database {

  db;
  constructor (database: IDBPDatabase<unknown>) {
    this.db = database
  }

  async find (params: queryParams) {
    // console.log(params)
    let cursor = await this.db.transaction(params.storeName).store.openCursor()
    // console.log(cursor)

    const results = []
    while (true) {
      if (!cursor) break;

      const [key, value] = [cursor.key, cursor.value]
      if (!params.query) {
        results.push(value)
      } else {
        if (compare(params.query, value)) results.push(value)
      }
      cursor = await cursor.continue()
    }

    // console.log(results)
    return results
  }

  // async findOne (params) {

  // }

  async findById (params) {
    const res = await this.db.get(params.storeName, params.query?.key)
    return res
  }

}

const compare = (query, obj, allowNull = true) => {
  const val : boolean = Object.keys(query).every(key => {
    const value = query[key]
    if (value instanceof Object && obj[key]) return compare(value, obj[key])
    return value == obj[key] || (allowNull && obj[key] == null)
  }) as boolean

  return val
}

export default initDb