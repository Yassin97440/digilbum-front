import { ref } from 'vue'
import { useGroupStore } from '../stores/GroupStore'

export const useMyGroups = () => {
    const loading = ref(false)
    const error = ref(null)
    const myGroups = ref([])
    const groupStore = useGroupStore()

    const fetchMyGroups = async () => {
        loading.value = true
        error.value = null

        try {
            myGroups.value = await groupStore.fetchUserGroups()
        } catch (err) {
            error.value = "Erreur lors du chargement des groupes"
            console.error(err)
        } finally {
            loading.value = false
        }
    }

    // Charger les groupes immédiatement
    fetchMyGroups()

    return {
        myGroups,
        loading,
        error,
        refreshGroups: fetchMyGroups
    }
} 