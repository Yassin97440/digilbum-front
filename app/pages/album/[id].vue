<script setup>
import { useAlbumStore } from '~~/stores/AlbumStore'
import { useEventStore } from '~~/stores/EventStore'
import { usePictureStore } from '~~/stores/PictureStore'

definePageMeta({
    middleware: ["auth"]
})

const { copy } = useClipboard()
const route = useRoute()
const albumId = route.params.id
const albumStore = useAlbumStore()
const eventStore = useEventStore()
const pictureStore = usePictureStore()
const toast = useToast()

const albumFetch = reactive({
    album: null,
    loading: true,
    error: null
})
const pictures = ref([])
const picturesFetch = reactive({
    loading: true,
    error: null
})

const sharedGroups = ref([])
const sharedGroupsFetch = reactive({
    loading: true,
    error: null
})

const isEditingInfo = ref(false)
const isEditingPhotos = ref(false)
const isEditingSharing = ref(false)

const editForm = ref({
    name: '',
    startedAt: '',
    endedAt: '',
})

const events = ref([])
const eventsFetch = reactive({
    loading: false,
    error: null
})

const fetchAlbum = async () => {
    try {
        albumFetch.album = await albumStore.getAlbumById(albumId)
        albumFetch.loading = false
    } catch (err) {
        console.error(err)
        albumFetch.error = "Erreur lors du chargement de l'album"
        albumFetch.loading = false
    }
}

const fetchPictures = async () => {
    try {
        pictures.value = await pictureStore.getPicturesByAlbumId(albumId)
        picturesFetch.loading = false
    } catch (err) {
        console.error(err)
        picturesFetch.error = "Erreur lors du chargement des photos"
        picturesFetch.loading = false
    }
}

const fetchSharedGroups = async () => {
    try {
        sharedGroups.value = await albumStore.fetchForSharedGroups(albumId)
        sharedGroupsFetch.loading = false
    } catch (err) {
        console.error(err)
        sharedGroupsFetch.error = "Erreur lors du chargement des groupes partagés"
        sharedGroupsFetch.loading = false
    }
}


const startEditing = () => {
    editForm.value = albumFetch.album
    isEditingInfo.value = true
}

const saveAlbumInfo = async () => {
    try {
        await albumStore.updateData({
            id: albumFetch.album.id,
            name: editForm.value.name,
            startedAt: editForm.value.startedAt,
            endedAt: editForm.value.endedAt,
        })
        await fetchAlbum()
        isEditingInfo.value = false
    } catch (err) {
        console.error(err)
        useNotify(toast, {
            severity: "error",
            summary: "Erreur lors de la sauvegarde des informations de l'album",
            detail: err.message,
            life: 5000
        })
    }
}

onMounted(async () => {
    try {
        await fetchAlbum()
        await fetchPictures()
        await fetchSharedGroups()
    } catch (err) {
        console.error(err)
        albumFetch.error = "Erreur lors du chargement de l'album"
        albumFetch.loading = false
    }
})

// const linkedEvent = computed(() => {
//     if (!albumFetch.album?.eventId) return null
//     return eventStore.getEventById(albumFetch.album.eventId)
// })

const handlePhotoUpload = async (files) => {
    // Logique d'upload à implémenter
}

const deletePhoto = async (photoId) => {
    // Logique de suppression à implémenter
}

const addSharedGroup = async (groupId) => {
    // Logique d'ajout de partage à implémenter
}

const removeSharedGroup = async (groupId) => {
    // Logique de suppression de partage à implémenter
}
</script>

<template>
    <div class="min-h-screen w-full px-6 py-8">
        <div class="max-w-4xl mx-auto">

            <!-- Section Informations -->
            <v-card class="bg-transparent backdrop-blur-3xl rounded-2xl border border-zinc-400 p-6 mb-8 relative">
                <v-btn v-if="!isEditingInfo" icon="mdi-pencil" size="small" class="absolute top-2 right-2"
                    @click="startEditing" />
                <div v-if="albumFetch.loading" class="flex justify-center items-center min-h-[200px]">
                    <v-progress-circular indeterminate color="orange"></v-progress-circular>
                </div>
                <div v-else-if="albumFetch.error"
                    class="bg-transparent backdrop-blur-3xl rounded-2xl border border-zinc-400 text-center text-red-500 p-4">
                    {{ albumFetch.error }}
                </div>
                <div v-else>
                    <div v-if="!isEditingInfo">
                        <h1 class="text-4xl font-bold  bg-gradient-to-r from-orange-400/100 via-gray-400/90 to-slate-400/90 
                                bg-clip-text text-transparent mb-4">
                            {{ albumFetch.album.name }}
                        </h1>
                        <p class="text-white mb-2">Date début: {{ new
                            Date(albumFetch.album.startedAt).toLocaleDateString() }}
                        </p>
                        <p class="text-white mb-2">Date fin: {{ new
                            Date(albumFetch.album.endedAt).toLocaleDateString() }}
                        </p>
                        <p v-if="linkedEvent" class="text-white">
                            Événement: {{ linkedEvent.name }}
                        </p>
                    </div>
                    <div v-else class="space-y-4 text-white">
                        <v-text-field v-model="editForm.name" label="Nom de l'album" variant="outlined"
                            color="orange"></v-text-field>

                        <v-text-field v-model="editForm.startedAt" label="Date de début" type="date" variant="outlined"
                            color="orange"></v-text-field>

                        <v-text-field v-model="editForm.endedAt" label="Date de fin" type="date" variant="outlined"
                            color="orange"></v-text-field>

                        <div class="flex justify-end gap-2">
                            <v-btn color="error" @click="isEditingInfo = false">Annuler</v-btn>
                            <v-btn color="success" @click="saveAlbumInfo">Enregistrer</v-btn>
                        </div>
                    </div>
                </div>
            </v-card>


            <!-- Section Photos -->
            <v-card class="bg-transparent backdrop-blur-3xl rounded-2xl border border-zinc-400 p-6 mb-4 relative">
                <div v-if="picturesFetch.loading" class="flex justify-center items-center min-h-[200px]">
                    <v-progress-circular indeterminate color="orange"></v-progress-circular>
                </div>

                <div v-else-if="picturesFetch.error"
                    class="bg-transparent backdrop-blur-3xl rounded-2xl border border-zinc-400 text-center text-red-500 p-4">
                    {{ picturesFetch.error }}
                </div>

                <div v-else>
                    <v-btn icon="mdi-pencil" size="small" class="absolute top-2 right-2"
                        @click="isEditingPhotos = !isEditingPhotos" />

                    <div class="flex justify-between items-center  ">
                        <h2 class="text-2xl text-white font-semibold">Photos ({{ pictures.length }})</h2>
                        <v-btn v-if="isEditingPhotos"
                            class="absolute top-2 inset-x-2/4 md:inset-x-3/4 w-fit rounded-full"
                            @click="$refs.fileInput.click()">
                            <v-icon>mdi-plus</v-icon>
                        </v-btn>
                        <input ref="fileInput" type="file" class="hidden" multiple @change="handlePhotoUpload"
                            accept="image/*" />
                    </div>

                    <v-list
                        class="bg-transparent backdrop-blur-3xl rounded-2xl border border-zinc-400 p-6 mb-8 relative">
                        <v-list-item v-for="photo in pictures" :key="photo.id" class="mb-2 hover:bg-white/5">
                            <template v-slot:prepend>
                                <v-icon icon="mdi-image" />
                            </template>
                            <v-list-item-title class="text-white">{{ photo.filename }}</v-list-item-title>
                            <template v-slot:append>
                                <v-btn v-if="isEditingPhotos" icon="mdi-delete" size="small" class="text-red-500"
                                    @click="deletePhoto(photo.id)" />
                            </template>
                        </v-list-item>
                    </v-list>
                </div>
            </v-card>

            <!-- Section Partage -->
            <v-card class="bg-transparent backdrop-blur-3xl rounded-2xl border border-zinc-400 p-6 relative">

                <div v-if="sharedGroupsFetch.loading" class="flex justify-center items-center min-h-[200px]">
                    <v-progress-circular indeterminate color="orange"></v-progress-circular>
                </div>

                <div v-else-if="sharedGroupsFetch.error"
                    class="bg-transparent backdrop-blur-3xl rounded-2xl border border-zinc-400 text-center text-red-500 p-4">
                    {{ sharedGroupsFetch.error }}
                </div>

                <div v-else>

                    <v-btn icon="mdi-pencil" size="small" class="absolute top-2 right-2"
                        @click="isEditingSharing = !isEditingSharing" />

                    <h2 class="text-2xl text-white font-semibold mb-4">Partage</h2>

                    <div v-if="sharedGroups.length === 0" class="text-white">
                        Cet album est privé
                    </div>
                    <v-list v-else class="bg-transparent">
                        <v-list-item v-for="group in sharedGroups" :key="group.id" class="mb-2 hover:bg-white/5">
                            <v-list-item-title class="text-white">{{ group.groupName }}</v-list-item-title>
                            <template v-slot:append>
                                <v-btn v-if="isEditingSharing" icon="mdi-delete" size="small" color="error"
                                    @click="removeSharedGroup(group.id)" />
                            </template>
                        </v-list-item>
                    </v-list>

                    <v-btn v-if="isEditingSharing" color="primary" prepend-icon="mdi-plus" class="mt-4">
                        Ajouter un groupe
                    </v-btn>
                </div>

            </v-card>
        </div>
    </div>
</template>