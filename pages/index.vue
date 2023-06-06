<template>
    <div>
        <v-icon icon="mdi-home" />
        <AlbumListing></AlbumListing>
        <!-- <NuxtWelcome /> -->
    </div>
</template>

<script setup>
import { useAlbumStore } from "~/stores/AlbumStore"

useAlbumStore()

definePageMeta({
    middleware: ["auth"]
    // or middleware: 'auth'
})
</script>
