import { defineStore } from "pinia"
import { AlbumService } from '~/services/AlbumService'

export const useAlbumStore = defineStore("AlbumStore", {
    state: () => {
        return {
            image: {},
            albums: [],
            selectedAlbumPictures: [
                { id: null, pathFile: '', albumId: null },
            ],
        }
    },
    actions: {
        async postNewAlbums(data) {
            try {
                const result = await AlbumService.createAlbumWithPictures(data)
                console.log('Album créé avec succès:', result)
            } catch (error) {
                console.error('Erreur dans postNewAlbums:', error)
                throw error
            }
        },
        async getAllAlbums() {
            const data = await useAuthFetch(
                `album/getAll`,
                "GET",
            );

            this.albums = data;
        },
        setSelectedAlbum(data) {
            this.selectedAlbumPictures = data.pictures;
        },
        async getPicturesForAlbum(album) {
            const newPicResponse = await useAuthFetch(
                `pictures/findForAlbum?albumId=${album.id}`,
                "GET",
            );
            this.selectedAlbumPictures = newPicResponse
        },

        async delete(album) {
            const res = await useAuthFetch(`album/deleteOne?albumId=${album.id}`, "POST",)
        }
    }


})