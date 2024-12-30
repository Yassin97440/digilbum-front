import { defineStore } from 'pinia'
const config = useRuntimeConfig();

export const useGroupStore = defineStore('groupStore', {

  state: () => ({
    groups: [],
    loading: false,
    error: null
  }),
  actions: {
    async create(newGroupData) {
      if (newGroupData.groupType === "Famille") newGroupData.groupType = "Familly";
      if (newGroupData.groupType === "Amis") newGroupData.groupType = "Friends";
      if (newGroupData.groupType === "Entreprise") newGroupData.groupType = "Company";
      const res = await useAuthFetch("group/", "POST", newGroupData)
      console.log("res for create : ", res)
      this.groups.push(res)
    },
    async addMember(joinCode) {
      const res = await useAuthFetch("group/addMember", "POST", joinCode)
      console.log("res for addMember : ", res)
      return res
    },
    async findByJoinCode(joinCode) {
      try {
        const SERVER_HOST = config.public.apiBaseUrl;
        const res = await $fetch(`${SERVER_HOST}/api/v2/group/byJoinCode?joinCode=${joinCode}`,
          {
            method: "GET",
          })

        return res
      } catch (err) {
        console.error("Erreur lors de la recherche du groupe:", err)
        this.error = "Impossible de trouver le groupe avec ce code"
        return this.error
      }
    },

    async fetchUserGroups() {
      try {
        this.loading = true
        const response = await useAuthFetch('group/', 'GET')
        this.userGroups = response
        return response
      } catch (error) {
        this.error = "Erreur lors du chargement des groupes"
        console.error(error)
      } finally {
        this.loading = false
      }
    },

    async fetchGroupById(groupId) {

      const response = await useAuthFetch(`group/${groupId}`, 'GET')
      console.log("response for fetchGroupById : ", response)
      return response
    }
  }
})
