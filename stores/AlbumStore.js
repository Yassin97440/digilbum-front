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
        async postNewAlbums(data, sharedGroups, toast) {
            try {
                this.loading = true
                const result = await AlbumService.createAlbumWithPictures(data, toast)
                if (sharedGroups && sharedGroups.length > 0) {
                    const shareAlbumResponse = await AlbumService.shareAlbum(result.album.id, sharedGroups, toast)
                }

                navigateTo('/showAlbums');
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
        async getAlbumById(albumId) {
            const album = await useAuthFetch(`album/${albumId}`, "GET")
            return album
        },

        async fetchForSharedGroups(albumId) {
            const response = await useAuthFetch(`album-sharing/groups?albumId=${albumId}`, 'GET')
            console.log("response for fetchForSharedGroups : ", response)
            return response
        },
        async delete(album) {
            const res = await useAuthFetch(`album/deleteOne?albumId=${album.id}`, "POST",)
        },
        async updateData(data) {
            const res = await useAuthFetch(`album/`, "PUT", data)
            return res
        }
    }


})