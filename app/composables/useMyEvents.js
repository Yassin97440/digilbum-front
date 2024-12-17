export const useMyEvents = () => {
    const events = ref([])
    const loading = ref(true)
    const error = ref(null)

    const fetchMyEvents = async () => {
        try {
            loading.value = true
            const response = await useAuthFetch('event/', 'GET')
            events.value = response
        } catch (err) {
            error.value = "Erreur lors du chargement des événements"
            console.error(err)
        } finally {
            loading.value = false
        }
    }

    onMounted(() => {
        fetchMyEvents()
    })

    return {
        myEvents: events,
        loading,
        error,
        refresh: fetchMyEvents
    }
} 