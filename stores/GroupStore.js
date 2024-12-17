import { defineStore } from 'pinia'
const config = useRuntimeConfig();

export const useGroupStore = defineStore({
  id: 'myGroupStoreStore',
  state: () => ({
    groups: []
  }),
  actions: {
    async create(newGroupData) {
      const res = await useAuthFetch("group", "POST", newGroupData)
      console.log("res for create : ", res)
      this.groups.push(res)
    },
    async addMember(joinCode) {
      const res = await useAuthFetch("group/addMember", "POST", joinCode)
      console.log("res for addMember : ", res)
      this.groups.push(res)
    },
    async findByJoinCode(joinCode) {
      const SERVER_HOST = config.public.apiBaseUrl;
      console.log("joinCode : ", joinCode)
      const res = await $fetch(`http://${SERVER_HOST}/api/v2/group/byJoinCode?joinCode=${joinCode}`,
        {
          method: "GET",
        })
      console.log("res for findByJoinCode : ", res);
      return res
    }
  }
})
