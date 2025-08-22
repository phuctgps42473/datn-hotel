import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    accessToken: typeof localStorage.getItem("accessToken") !== "undefined" ? localStorage.getItem("accessToken") : null,
    userInfo: typeof localStorage.getItem("user") !== "undefined" ? JSON.parse(localStorage.getItem("user")) : null,
  }),
  actions: {
    setAccessToken(token) {
      this.accessToken = token;
    },
    setUserInfo(info) {
      this.userInfo = info;
    },
    clear() {
      this.accessToken = null;
      this.userInfo = null;
    }
  }
})
