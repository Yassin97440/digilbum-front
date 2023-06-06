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
                "http://159.89.0.150:8080/album/new",
                {
                    headers: { "Content-Type": "application/json" },
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
                "http://159.89.0.150:8080/pictures/writeAndSavePictures",
                {
                    method: "POST",
                    body: formdata,
                }
            );

            console.log("response new pic", newPicResponse);
        },
        async getAllAlbums() {
            console.log("zimpoouett")
            const { data } = await useFetch(
                `http://159.89.0.150:8080/album/albumsWithPictures`
            );
            console.log("🚀 ~ file: AlbumStore.js:45 ~ getAllAlbums ~ data:", data)
            console.log("🚀 ~ file: AlbumStore.js:50 ~ getAllAlbums ~ data._rawValue:", data._rawValue)

            this.albums = data._rawValue;
        },
        setSelectedAlbum(data) {
            console.log(data)
            this.selectedAlbumPictures = data.pictures;
        },
    }


})