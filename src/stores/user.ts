import { defineStore } from 'pinia';
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
    logout () {
      this.user = {}
    }
  }
});
