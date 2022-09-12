import { api } from "src/boot/axios"
import Room from "./Room"
import Channel from './Channel'
import Member from './Member'

export const importRooms = (rooms: any) => {
  // console.log(rooms)
  const servers = rooms as [{
    shortId: string,
    members: Member[],
    channels: {[key: string]: Channel},
    created: Date,
    name: string
  }]
  // console.log(servers)
  const privates = rooms.private

  const res = servers.map(server => {
    const room = new Room(server)
    return room
  })

  console.log(res)
  return res
}

export const createRoom = async (name: string) => {
  const room = new Room({
    channels: {},
    created: new Date(),
    name
  })

  const { data } = await api.post('/servers/create', { server: room })
  console.log(data)
}

export default { importRooms }