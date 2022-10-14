import Response from '../Response'

import { api } from 'src/boot/axios'
import { Users as Servers } from 'src/db'

// upadte cache with api result
const getServer = (id: string): Response => {
  return new Response(
    Servers.findById(id),
    api.get(`/servers/${id}`)
  )
}

const getServers = (ids: string[]): Response => {
  const cachePromises = Promise.all(ids.map(id => Servers.findById(id).catch(() => ({}) )))
  const serverPromises = Promise.all(ids.map(id => api.get(`/servers/${id}`)))

  return new Response(cachePromises, serverPromises)  
}

const getAllServers = (): Response => {
  return new Response(
    Servers.find({}),
    api.get('/servers')
  )
}


export default { getServer, getServers, getAllServers }