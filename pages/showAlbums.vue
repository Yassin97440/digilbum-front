<script setup>
definePageMeta({
    middleware: ["auth"]
    // or middleware: 'auth'
})
</script >

<template>
    <v-container>
        <AlbumListing :albums="albums" />
        <v-carousel show-arrows="hover" hide-delimiters>
            <v-carousel-item v-for="(picture, i) in selectedAlbumPictures" :key="i" :src="picture.pathFile"
                height="500px"></v-carousel-item>

        </v-carousel>
    </v-container>
</template>

<script>
import { useAlbumStore } from '~/stores/AlbumStore';
import { mapState, mapActions } from "pinia";
export default {

    data() {
        return {

        };
    },
    computed: {
        ...mapState(useAlbumStore, ["albums", "selectedAlbumPictures"])
    },
    methods: {
        ...mapActions(useAlbumStore, ["getAllAlbums"]),

    },
    created() {
        this.getAllAlbums()
        // this.$store.dispatch("getAllAlbums");
        // console.log("les albums", this.albums);
    },
};
</script>
