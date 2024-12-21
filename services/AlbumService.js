import { useAuthFetch } from '~/composables/useAuthFetch'

export const AlbumService = {
    async createNewAlbum(albumData) {
        try {
            const newAlbum = await useAuthFetch(
                "album/new",
                'POST',
                albumData
            )
            return newAlbum
        } catch (error) {
            console.error('Erreur lors de la création de l\'album:', error)
            throw error
        }
    },

    async uploadPictures(pictures, albumId) {
        try {
            const formData = new FormData()
            pictures.forEach(pic => {
                formData.append("pictures", pic)
            })

            const response = await useAuthFetch(
                `pictures/writeAndSavePictures?albumId=${albumId}`,
                'POST',
                formData
            )
            return response
        } catch (error) {
            console.error('Erreur lors du téléchargement des images:', error)
            throw error
        }
    },

    async createAlbumWithPictures(data) {
        try {
            const newAlbum = await this.createNewAlbum(data.album)
            const uploadedPictures = await this.uploadPictures(data.pictures, newAlbum.id)
            return {
                album: newAlbum,
                pictures: uploadedPictures
            }
        } catch (error) {
            console.error('Erreur lors de la création de l\'album avec images:', error)
            throw error
        }
    },

    async shareAlbum(albumId, sharedGroups) {
        const groupIds = sharedGroups.map(group => group.id).join(',')
        const response = await useAuthFetch(`album-sharing/share?albumId=${albumId}&groupIds=${groupIds}`)
        return response
    }
}
