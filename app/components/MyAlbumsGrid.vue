<template>
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        <v-card v-for="album in albums" :key="album.id" class="relative overflow-hidden bg-white/10 backdrop-blur-md border border-white/20 
                       shadow-2xl rounded-2xl transform transition-all duration-500 hover:scale-105
                       hover:shadow-lg hover:border-white/30 group">

            <div class="relative aspect-[4/3] overflow-hidden">
                <img :src="album.coverImagePath" class="w-full h-full object-cover transform transition-transform duration-700
                            group-hover:scale-110" :alt="album.name" />
                <div class="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
            </div>

            <v-card-item class="relative z-10">
                <h3 class="text-xl font-semibold mb-2">{{ album.name }}</h3>
                <p class="text-sm opacity-70">
                    {{ formatDate(album.createdAt) }}
                </p>

                <div class="mt-4 flex justify-between items-center">
                    <v-btn color="primary" variant="text" @click="$emit('view', album)">
                        Voir l'album
                    </v-btn>
                    <v-btn icon="mdi-pencil" variant="text" @click="$emit('edit', album)"></v-btn>
                </div>
            </v-card-item>
        </v-card>
    </div>
</template>

<script setup>
const props = defineProps({
    albums: {
        type: Array,
        required: true
    }
})

const emit = defineEmits(['view', 'edit'])

const formatDate = (date) => {
    return new Date(date).toLocaleDateString('fr-FR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    })
}
</script>