import { defineStore } from "pinia"

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
                "http://localhost:8080/album/new",
                {
                    headers: {
                        "Content-Type": "application/json",
                        'Authorization': useCookie('authToken').value
                    },
                    method: "POST",
                    body: data.album,
                }
            );

            console.log("responseNewAlbum : ", newAlbumResponse);
            const formdata = new FormData();
            console.log("formdata created");
            data.pictures.forEach(async (pic) => {
                formdata.append("pictures", pic);
            });

            formdata.append("albumName", data.album.name);

            const newPicResponse = await $fetch(
                "http://localhost:8080/pictures/writeAndSavePictures",
                {
                    headers: {
                        "Content-Type": "application/json",
                        'Authorization': useCookie('authToken').value
                    },
                    method: "POST",
                    body: formdata,
                }
            );

            console.log("response new pic", newPicResponse);
        },
        async getAllAlbums() {
            console.log("zimpoouett", useCookie('authToken').value)
            const data = await $fetch(
                `http://localhost:8080/album/albumsWithPictures`,
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