import { stackItemIsTruthy } from '@bitauth/libauth';
import { defineStore } from 'pinia';
import { api } from 'src/boot/axios';

import { importRooms } from 'src/utils/app'
import Room from 'src/utils/app/Room';

export const useAppStore = defineStore('counter', {
  state: () => ({
    darkTheme: true,
    rooms: [] as Room[]
  }),

  getters: {
    isDarkTheme (state) {
      return state.darkTheme
    },
    getRooms (state) {
      return this.rooms
    }
  },

  actions: {
    async loadRooms () {
      const { data: { servers } } = await api.get('/users/memberships')
      const rooms = importRooms(servers)
      this.rooms = rooms
    },
    setDarkTheme (bool: boolean) {
      this.darkTheme = bool
    },
    toggleDarkTheme () {
      this.darkTheme = !this.darkTheme
    }
  }
});
