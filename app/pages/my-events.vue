<script setup>
definePageMeta({
    middleware: ["auth"]
})

const { myEvents, loading, error } = useMyEvents()
</script>

<template>
    <div class="min-h-screen w-full px-6 py-8">
        <h1 class="text-4xl font-bold mb-6 text-center  bg-gradient-to-r from-orange-400/100 via-gray-400/90 to-slate-400/90 
                                bg-clip-text text-transparent ">
            Mes Événements
        </h1>

        <div v-if="loading" class="flex justify-center items-center min-h-[200px]">
            <v-progress-circular indeterminate color="orange"></v-progress-circular>
        </div>

        <div v-else-if="error" class="text-center text-red-500">
            {{ error }}
        </div>

        <div v-else>
            <MyEventsGrid :events="myEvents" />
        </div>
    </div>
</template>