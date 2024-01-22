<script setup>
definePageMeta({
    middleware: ["auth"]
    // or middleware: 'auth'
})
</script >

<template>
    <v-container>
        <AlbumListing :albums="albums" :pictures="selectedAlbumPictures" />
    </v-container>
</template>

<script>
import { useAlbumStore } from '~/stores/AlbumStore';
import { mapState, mapActions } from "pinia";
export default {

    data() {
        return {
            selectedAlbumEmit: [],
        };
    },
    computed: {
        ...mapState(useAlbumStore, ["albums", "selectedAlbumPictures"])
    },
    methods: {
        ...mapActions(useAlbumStore, ["getAllAlbums", "getPicturesForAlbum"]),
        logEmitedAlbum(album) {
            this.getPicturesForAlbum(album)
            console.log("getLog", album)
        },

    },
    created() {
        this.getAllAlbums()
    },
};
</script>
