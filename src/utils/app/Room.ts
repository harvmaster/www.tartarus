import { api } from 'src/boot/axios'
import Channel from './Channel'
import Member from './Member'

interface RoomInput {
  shortId?: string,
  members?: Member[],
  channels: {[key: string]: Channel},
  created: Date,
  name: string
}

class Room {

  shortId: string | undefined
  members: Member[] | undefined
  channels: {[key: string]: Channel}
  created: Date
  name: string

  constructor ({ shortId, members, channels, created, name }: RoomInput) {
    this.shortId = shortId
    this.members = members
    this.channels = channels
    this.created = created
    this.name = name
  }

  createChannel (name: string, type: string) {
    const channel = new Channel({
      created: new Date(),
      name,
      type
    })
    api.post(`${this.shortId}/channels/create`, {channel})
  }

  addChannel (channel: Channel) {
    console.log(channel)
  }

  removeChannel (name: string) {
    console.log()
  }
}

export default Room