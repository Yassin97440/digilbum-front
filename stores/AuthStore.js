import { defineStore } from "pinia";
const config = useRuntimeConfig();
export const useAuthStore = defineStore("authStore", {
  state: () => {
    return {
      user: {},
      newGroup: {},
      token: "",
    }
  },
  actions: {
    async register(user, dataGroup) {
      // Traduction des types de groupes
      if (dataGroup.groupType === "Famille") dataGroup.groupType = "Familly";
      if (dataGroup.groupType === "Amis") dataGroup.groupType = "Friends";
      if (dataGroup.groupType === "Entreprise") dataGroup.groupType = "Company";

      const SERVER_HOST = config.public.apiBaseUrl;

      try {
        // Appel à l'API pour l'inscription
        const { token } = await $fetch(`${SERVER_HOST}/api/v1/auth/register`, {
          headers: {
            "Content-Type": "application/json",
          },
          mode: "cors",
          method: "POST",
          body: { user, group: dataGroup },
        });

        if (!token) {
          throw new Error("Token non reçu depuis le serveur.");
        }

        // Ajout du token dans localStorage comme fallback
        if (process.client) {
          localStorage.setItem("authToken", token);
        }

        // Ajout du token dans un cookie avec des options adaptées
        const tokenCookie = useCookie("authToken", {
          sameSite: "None", // Pour compatibilité avec requêtes cross-site
          secure: true,     // Obligatoire si HTTPS
        });
        tokenCookie.value = token;

        // Mise à jour du store avec le token
        this.token = token;

        // Redirection après succès
        return navigateTo("/");
      } catch (error) {
        console.error("Erreur lors de la création de compte :", error.message);
        throw error;
      }
    }
    ,
    async login(data) {
      const SERVER_HOST = config.public.apiBaseUrl;

      const { token } = await $fetch(
        `${SERVER_HOST}/api/v1/auth/login`,
        {
          headers: { "Content-Type": "application/json", },
          method: "POST",
          body: data,
        }
      );
      const tokenCookie = useCookie("authToken", {
        sameSite: "None", // Pour compatibilité avec requêtes cross-site
        secure: true,     // Obligatoire si HTTPS
      });
      tokenCookie.value = token;

      this.token = token;
      return navigateTo('/')
    },
    async logout() {
      const SERVER_HOST = config.public.apiBaseUrl;
      const { res } = await $fetch(`${SERVER_HOST}/api/v1/auth/logout`,
        {
          headers: { 'Authorization': useCookie('authToken').value },
          method: "POST",
        })
      const tokenCookie = useCookie('authToken');
      tokenCookie.value = undefined;
      this.token = undefined
      return navigateTo('/Login')

    },


  },
});
