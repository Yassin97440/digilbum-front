import { defineStore } from "pinia"
import decodeToken from "~/tools/token/decodeToken";
export const useAlbumStore = defineStore("AlbumStore", {
    state: () => {
        return {
            image: {},
            albums: [],
            selectedAlbumPictures: [],
        }
    },
    actions: {
        async postNewAlbums(data) {
            console.log(data.album);
            const newAlbumResponse = await $fetch(
                "http://159.89.0.150:8080/api/v2/album/new",
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
                    `http://159.89.0.150:8080/api/v2/pictures/writeAndSavePictures?albumId=${responseNewAlbum.id}`,
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
                `http://159.89.0.150:8080/api/v2/album/albumsWithPictures`,
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
            console.log(data)
            this.selectedAlbumPictures = data.pictures;
        },
    }


})