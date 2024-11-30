import { defineStore } from "pinia"
export const useAlbumStore = defineStore("AlbumStore", {
    state: () => {
        return {
            image: {},
            albums: [],
            selectedAlbumPictures: [
                { id: null, pathFile: '', albumId: null }],
        }
    },
    actions: {
        async postNewAlbums(data) {
            console.log(data.album);
            const newAlbumResponse = await useAuthFetch(
                "album/new",
                'POST',
                data.album
            )
                .then(async (responseNewAlbum) => {
                    console.log("🚀 ~ file: AlbumStore.js:25 ~ ).then ~ responseNewAlbum:", responseNewAlbum.id)

                    const formdata = new FormData();
                    data.pictures.forEach(async (pic) => {
                        formdata.append("pictures", pic);
                    });

                    // formdata.append("albumId", responseNewAlbum.id);
                    const newPicResponse = await useAuthFetch(
                        `pictures/writeAndSavePictures?albumId=${responseNewAlbum.id}`,
                        'POST',
                        formdata
                    );
                    console.log("response new pic", newPicResponse);
                });
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