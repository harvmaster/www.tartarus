import Database from './Database';

export const Authed = new Database('authed')
export const Channels = new Database('channels')
export const Keys = new Database('keys')
export const Messages = new Database('messages')
export const Servers = new Database('servers')
export const Users = new Database('users')

export default { Authed, Channels, Keys, Messages, Servers, Users }