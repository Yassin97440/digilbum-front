import { defineStore } from "pinia"
import { AlbumService } from '../services/AlbumService'

export const useAlbumStore = defineStore("AlbumStore", {
    state: () => {
        return {
            image: {},
            albums: [],
            selectedAlbumPictures: [
                { id: null, pathFile: '', albumId: null },
            ],
            loading: false,
            error: null
        }
    },
    actions: {
        async postNewAlbums(data, sharedGroups) {
            try {
                this.loading = true
                const result = await AlbumService.createAlbumWithPictures(data)
                if (sharedGroups && sharedGroups.length > 0) {
                    const shareAlbumResponse = await AlbumService.shareAlbum(result.album.id, sharedGroups)
                }

                return response
            } catch (error) {
                this.error = "Erreur lors de la création de l'album"
                console.error(error)
            } finally {
                this.loading = false
            }
        },
        async getAllAlbums() {
            const data = await useAuthFetch(
                `album/forUser`,
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