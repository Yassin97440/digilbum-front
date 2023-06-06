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
      console.log("PUUUTES");
      const { token } = await $fetch(
        "http://localhost:8080/api/v1/auth/register",
        {
          headers: { "Content-Type": "application/json" },
          method: "POST",
          body: user,
        }
      );

      console.log(token);
      this.token = token;
      // console.log("bite ", response.PromiseResult);
      //data : firsname, lastname, email, password
      //encrypter password
      //call api register
      //stocker user data et jwt
    },
    async login(data) {
      console.log("bouyachaka")
      const { token } = await $fetch(
        "http://localhost:8080/api/v1/auth/login",
        {
          headers: { "Content-Type": "application/json" },
          method: "POST",
          body: data,
        }
      );

      this.token = token;

    },
    logout(data) { },
  },
  // const { data : register} = await useAsyncData("register",() =>
  //      $fetch("http://localhost:8080/api/v1/auth/register", {
  //        headers: { "Content-Type": "application/json" },
  //        method: "POST",
  //        body: user,
  //      })
  //    );
});
