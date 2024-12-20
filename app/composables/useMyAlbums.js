export const useMyAlbums = () => {
    const albums = ref([])
    const loading = ref(true)
    const error = ref(null)

    const fetchMyAlbums = async () => {
        try {
            loading.value = true
            const response = await useAuthFetch('album/forOwner', 'GET')
            albums.value = response
        } catch (err) {
            error.value = "Erreur lors du chargement des albums"
            console.error(err)
        } finally {
            loading.value = false
        }
    }

    onMounted(() => {
        fetchMyAlbums()
    })

    return {
        myAlbums: albums,
        loading,
        error,
        refresh: fetchMyAlbums
    }
} 