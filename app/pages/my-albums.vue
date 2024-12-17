<script setup>
definePageMeta({
    middleware: ["auth"]
})

const { myAlbums, loading, error } = useMyAlbums()
</script>

<template>
    <div class="min-h-screen w-full px-6 py-8">
        <h1
            class="text-4xl font-bold mb-12 text-center bg-gradient-to-r from-orange-400 via-pink-500 to-blue-600 bg-clip-text text-transparent">
            Mes Albums
        </h1>

        <div v-if="loading" class="flex justify-center items-center min-h-[200px]">
            <v-progress-circular indeterminate color="orange"></v-progress-circular>
        </div>

        <div v-else-if="error" class="text-center text-red-500">
            {{ error }}
        </div>

        <div v-else>
            <MyAlbumsGrid :albums="myAlbums" />
        </div>
    </div>
</template>