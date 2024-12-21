import { ref } from 'vue'
import { useGroupStore } from '../stores/GroupStore'

export const useGroup = (groupId) => {
    const loading = ref(false)
    const error = ref(null)
    const group = ref(null)
    const groupStore = useGroupStore()

    const fetchGroup = async () => {
        loading.value = true
        error.value = null

        try {
            group.value = await groupStore.fetchGroupById(groupId)
        } catch (err) {
            error.value = "Erreur lors du chargement du groupe"
            console.error(err)
        } finally {
            loading.value = false
        }
    }

    // Charger le groupe immédiatement
    fetchGroup()

    return {
        group,
        loading,
        error,
        refreshGroup: fetchGroup
    }
} 