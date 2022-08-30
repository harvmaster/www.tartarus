import { api } from "src/boot/axios"
import Room from "./Room"

export const importRooms = (rooms: any) => {
  console.log(rooms)

}

export const createRoom = async (name: string) => {
  const room = new Room({
    channels: {},
    created: new Date(),
    name
  })

  const { data } = await api.post('')
}

export default { importRooms }