import { ref } from 'vue'
import { useUserGroupStore } from '../stores/UserGroupStore'

export const useUserGroupService = (groupId) => {
  const loading = ref(false)
  const error = ref("")
  const usersGroup = ref([])
  const userGroupStore = useUserGroupStore()

  const fetchUserGroups = async () => {
    loading.value = true
    error.value = ""

    try {
      const response = await userGroupStore.fetchUsersGroup(groupId)

      usersGroup.value = response.map(userGroup => ({
        id: userGroup.user.id,
        firstName: userGroup.user.firstname,
        lastName: userGroup.user.lastname,
        isAdmin: userGroup.admin,
        joinedAt: userGroup.joinedAt
      }))
    } catch (err) {
      error.value = "Erreur lors du chargement des groupes de l'utilisateur"
      console.error('Error in useUserGroupService:', err)
    } finally {
      loading.value = false
    }
  }

  // Charger les groupes immédiatement
  fetchUserGroups()

  return {
    usersGroup,
    loading,
    error,
    refreshGroups: fetchUserGroups
  }
}
