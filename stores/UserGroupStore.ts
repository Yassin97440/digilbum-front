import { defineStore } from 'pinia'

export const useUserGroupStore = defineStore(
  'userGroupStoreStore',
  {
    state: () => ({}),
    actions: {

      async fetchUsersGroup(groupId: number) {
        const response = await useAuthFetch(`user-group/users?groupId=${groupId}`, 'GET')
        return response
      }
    }
  })