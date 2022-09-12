interface ChannelInput {
  created: Date,
  name: string,
  type: string
}

class Channel {

  // channels: {[key: string]: Channel}
  type: string
  created: Date
  name: string

  constructor ({ created, name, type }: ChannelInput) {
    this.created = created
    this.name = name
    this.type = type
  }

  addChannel (channel: Channel) {
    console.log('')
  }

  removeChannel (name: string) {
    console.log('')
  }
}

export default Channel