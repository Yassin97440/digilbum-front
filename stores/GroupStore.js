import { defineStore } from 'pinia'

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
      const res = await useAuthFetch(`group/byJoinCode?joinCode=${joinCode}`, "GET")
      console.log("res for findByJoinCode : ", res)
      return res
    }
  }
})
