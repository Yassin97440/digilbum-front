import { defineStore } from "pinia";

export const useAuthStore = defineStore("authStore", {
  state: () => {
    return {
      user: {},
      token: "",
    }
  },
  actions: {
    async register(user) {
      const { token } = await $fetch(
        "http://localhost:8080/api/v1/auth/register",
        {
          headers: { "Content-Type": "application/json", 'Access-Control-Allow-Origin': '*', },
          mode: "cors",
          method: "POST",
          body: user,
        }
      );

      console.log(token);
      const tokenCookie = useCookie('authToken');
      tokenCookie.value = token;
      this.token = token;
      navigateTo('/')
    },
    async login(data) {
      const { token } = await $fetch(
        "http://localhost:8080/api/v1/auth/login",
        { //'Access-Control-Allow-Credentials': true, 'Origin': 'http://localhost:8080/'
          headers: { "Content-Type": "application/json", 'Access-Control-Allow-Origin': '*', },
          method: "POST",
          body: data,
        }
      );
      const tokenCookie = useCookie('authToken');
      tokenCookie.value = token;

      this.token = token;
      navigateTo('/')
    },
    async logout() {
      const { res } = await $fetch("http://localhost:8080/api/v1/auth/logout",
        {
          headers: { 'Authorization': useCookie('authToken').value },
          method: "GET",
        })
      const tokenCookie = useCookie('authToken');
      tokenCookie.value = undefined;
    },
  },
});
