import { defineStore } from "pinia"
import decodeToken from "~/tools/token/decodeToken";
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
            const newAlbumResponse = await $fetch(
                "http://localhost:8080/api/v2/album/new",
                {
                    headers: {
                        // "Content-Type": "multipart/form-data",
                        'Authorization': "Bearer " + useCookie('authToken').value
                    },
                    method: "POST",
                    body: data.album,
                }
            ).then(async (responseNewAlbum) => {
                console.log("🚀 ~ file: AlbumStore.js:25 ~ ).then ~ responseNewAlbum:", responseNewAlbum.id)

                const formdata = new FormData();
                data.pictures.forEach(async (pic) => {
                    formdata.append("pictures", pic);
                });

                // formdata.append("albumId", responseNewAlbum.id);

                const newPicResponse = await $fetch(
                    `http://localhost:8080/api/v2/pictures/writeAndSavePictures?albumId=${responseNewAlbum.id}`,
                    {
                        headers: {
                            // "Content-Type": "multipart/form-data",
                            'Authorization': "Bearer " + useCookie('authToken').value
                        },
                        method: "POST",
                        body: formdata
                    }
                );
            });


            // console.log("response new pic", newPicResponse);
        },
        async getAllAlbums() {
            const data = await $fetch(
                `http://localhost:8080/api/v2/album/getAll`,
                {
                    headers: {

                        // "Content-Type": "application/json",
                        'Access-Control-Allow-Origin': 'http://localhost:3000',
                        'Authorization': "Bearer " + useCookie('authToken').value
                    },
                    method: "GET",
                }
            );
            console.log("🚀 ~ file: AlbumStore.js:45 ~ getAllAlbums ~ data:", data)
            // console.log("🚀 ~ file: AlbumStore.js:50 ~ getAllAlbums ~ data._rawValue:", data)

            this.albums = data;
        },
        setSelectedAlbum(data) {
            this.selectedAlbumPictures = data.pictures;
        },
        async getPicturesForAlbum(album) {
            const newPicResponse = await $fetch(
                `http://localhost:8080/api/v2/pictures/findForAlbum?albumId=${album.id}`,
                {
                    headers: {
                        // "Content-Type": "multipart/form-data",
                        'Authorization': "Bearer " + useCookie('authToken').value
                    },
                    method: "GET",
                }
            );
            this.selectedAlbumPictures = newPicResponse
            console.log("🚀 ~ file: AlbumStore.js:83 ~ getPicturesForAlbum ~ newPicResponse:", newPicResponse)

        }
    }


})