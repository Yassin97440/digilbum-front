<script setup>
definePageMeta({
    middleware: ["auth"]
    // or middleware: 'auth'
})
</script>

<template>
    <GlobalListing :albums="albums"></GlobalListing>
</template>

<script>
import { useAlbumStore } from '../stores/AlbumStore';
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
        ...mapActions(useAlbumStore, ["getAllAlbums",]),

    },
    created() {
        this.getAllAlbums()
    },
};
</script>
