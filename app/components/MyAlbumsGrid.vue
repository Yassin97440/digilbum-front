<template>
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        <v-card v-for="album in albums" :key="album.id" 
        class="relative overflow-hidden bg-transparent backdrop-blur-3xl text-white
               rounded-2xl transform transition-all duration-500 hover:scale-105
            group">

            <div class="relative aspect-[4/3] overflow-hidden">
                <img :src="album.coverImagePath" 
                class="w-full h-full object-cover transform transition-transform duration-700
                        group-hover:scale-110" :alt="album.name" />
                <div class="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
            </div>

            <v-card-item class="relative z-10">
                <h3 class="text-xl font-semibold mb-2">{{ album.name }}</h3>
                <p class="text-sm opacity-70">
                    {{ formatDate(album.createdAt) }}
                </p>

                <div class="mt-4 flex justify-between items-center">
                    <AtomsButton color="primary" variant="text" @click="$emit('view', album)">
                        Voir l'album
                    </AtomsButton>
                    <v-btn icon="mdi-dots-horizontal" variant="text" @click="$emit('edit', album)">
                        <v-icon>mdi-dots-horizontal</v-icon>
                        <v-menu activator="parent">
                            <v-list
                                class="bg-transparent backdrop-blur-3xl border border-zinc-400 text-white rounded-xl">

                                <v-list-item v-for="item in itemsListAction" :key="item.title"
                                    @click="item.action(album)">
                                    <v-list-item-title>{{ item.title }}</v-list-item-title>
                                </v-list-item>

                            </v-list>
                        </v-menu>
                    </v-btn>
                </div>
            </v-card-item>
        </v-card>
    </div>
</template>

<script setup>
import { useAlbumStore } from '~~/stores/AlbumStore'
const props = defineProps({
    albums: {
        type: Array,
        required: true
    }
})

const toast = useToast()

const emit = defineEmits(['view', 'edit'])
const albumStore = useAlbumStore()
const deleteAlbum = (album) => {
    albumStore.delete(album)
    useNotify(toast, "success", "Album supprimé", "L'album a été supprimé avec succès", 5000)
}
const itemsListAction = [
    {
        title: 'Supprimer',
        icon: 'mdi-delete',
        action: deleteAlbum
    },
    {
        title: 'Modifier',
        icon: 'mdi-pencil',
        action: (album) => navigateTo(`/album/${album.id}`)
    }

]



const formatDate = (date) => {
    return new Date(date).toLocaleDateString('fr-FR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    })
}
</script>