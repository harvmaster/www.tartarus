import Channel from './Channel'

interface RoomInput {
  channels: {[key: string]: Channel},
  created: Date,
  name: string
}

class Room {

  channels: {[key: string]: Channel}
  created: Date
  name: string

  constructor ({ channels, created, name }: RoomInput) {
    this.channels = channels
    this.created = created
    this.name = name
  }

  addChannel (channel: Channel) {
    console.log()
  }

  removeChannel (name: string) {
    console.log()
  }
}

export default Room