interface ChannelInput {
  channels: {[key: string]: Channel},
  created: Date,
  name: string
}

class Channel {

  // channels: {[key: string]: Channel}
  created: Date
  name: string

  constructor ({ channels, created, name }: ChannelInput) {
    // this.channels = channels
    this.created = created
    this.name = name
  }

  addChannel (channel: Channel) {

  }

  removeChannel (name: string) {

  }
}

export default Channel