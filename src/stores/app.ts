import { stackItemIsTruthy } from '@bitauth/libauth';
import { defineStore } from 'pinia';
import { api } from 'src/boot/axios';

import { importRooms } from 'src/utils/app'

export const useAppStore = defineStore('counter', {
  state: () => ({
    darkTheme: true,
    rooms: []
  }),

  getters: {
    isDarkTheme (state) {
      return state.darkTheme
    }
  },

  actions: {
    async loadRooms () {
      const { data } = await api.get('/users/')
      importRooms(data)
    },
    setDarkTheme (bool: boolean) {
      this.darkTheme = bool
    },
    toggleDarkTheme () {
      this.darkTheme = !this.darkTheme
    }
  }
});
