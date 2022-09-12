import { defineStore } from 'pinia';
import { LocalStorage } from 'quasar';
import { api } from 'src/boot/axios';
import User from 'src/utils/auth/User'

export const useUserStore = defineStore('user', {
  state: () => ({
    user: {}
  }),

  getters: {
    getUser (state) {
      return state.user;
    }
  },

  actions: {
    setUser (user: User) {
      this.user = user
    },
    loadUserFromStorage () {
      console.log('Loading User From Storage')
      const user = LocalStorage.getItem('user') || {}
      api.defaults.headers.common.authorization = 'Token ' + user.jwt
      this.user = user
    },
    logout () {
      this.user = {}
    }
  }
});
