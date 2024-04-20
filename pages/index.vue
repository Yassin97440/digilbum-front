<template>
    <div>
        <Home></Home>
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
