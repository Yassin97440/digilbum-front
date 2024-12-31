<script setup>
import { useEventStore } from '~~/stores/EventStore'
import { useAlbumStore } from '~~/stores/AlbumStore'

definePageMeta({
  middleware: ["auth"]
})

const route = useRoute()
const eventId = route.params.id
const eventStore = useEventStore()
const albumStore = useAlbumStore()
const toast = useToast()

const eventFetch = reactive({
  event: null,
  loading: true,
  error: null
})

const albums = ref([])
const albumsFetch = reactive({
  loading: true,
  error: null
})

const isEditingInfo = ref(false)

const editForm = reactive({
  name: '',
  startedAt: '',
  endedAt: '',
})

const fetchEvent = async () => {
  try {
    eventFetch.event = await eventStore.getEventDetails(eventId)
    eventFetch.loading = false
  } catch (err) {
    console.error(err)
    eventFetch.error = "Erreur lors du chargement de l'événement"
    eventFetch.loading = false
  }
}

const fetchAlbums = async () => {
  try {
    albums.value = await albumStore.fetchAlbumsForEvent(eventId)
    albumsFetch.loading = false
  } catch (err) {
    console.error(err)
    albumsFetch.error = "Erreur lors du chargement des albums"
    albumsFetch.loading = false
  }
}

const startEditing = () => {
  editForm.name = eventFetch.event.name
  editForm.startedAt = eventFetch.event.startedAt
  editForm.endedAt = eventFetch.event.endedAt
  isEditingInfo.value = true
}

const saveEventInfo = async () => {
  try {
    await eventStore.update({
      id: eventFetch.event.id,
      name: editForm.name,
      startedAt: editForm.startedAt,
      endedAt: editForm.endedAt,
    })
    await fetchEvent()
    isEditingInfo.value = false
    useNotify(toast,
      "success",
      "Succès",
      "Les informations ont été mises à jour",
      3000
    )
  } catch (err) {
    console.error(err)
    useNotify(toast,
      "error",
      "Erreur lors de la sauvegarde",
      err.message,
      5000
    )
  }
}

onMounted(async () => {
  await fetchEvent()
  await fetchAlbums()
})
</script>

<template>
  <div class="min-h-screen w-full px-6 py-8">
    <div class="max-w-4xl mx-auto">
      <!-- Section Informations -->
      <v-card class="bg-transparent backdrop-blur-3xl rounded-2xl border border-zinc-400 p-6 mb-8 relative text-white">
        <v-btn v-if="!isEditingInfo" icon="mdi-pencil" size="small" class="absolute top-2 right-2"
          @click="startEditing" />

        <div v-if="eventFetch.loading" class="flex justify-center items-center min-h-[200px]">
          <v-progress-circular indeterminate color="orange"></v-progress-circular>
        </div>

        <div v-else-if="eventFetch.error"
          class="bg-transparent backdrop-blur-3xl rounded-2xl border border-zinc-400 text-center text-red-500 p-4">
          {{ eventFetch.error }}
        </div>

        <div v-else>
          <div v-if="!isEditingInfo">
            <h1 class="text-4xl font-bold bg-gradient-to-r from-orange-400/100 via-gray-400/90 to-slate-400/90 
                                bg-clip-text text-transparent mb-4">
              {{ eventFetch.event.name }}
            </h1>
            <p class="text-white mb-2">
              Date début: {{ new Date(eventFetch.event.startedAt).toLocaleDateString() }}
            </p>
            <p class="text-white mb-2">
              Date fin: {{ new Date(eventFetch.event.endedAt).toLocaleDateString() }}
            </p>
          </div>
          <div v-else class="space-y-4">
            <v-text-field v-model="editForm.name" label="Nom de l'événement" variant="outlined"
              color="orange"></v-text-field>

            <v-text-field v-model="editForm.startedAt" label="Date de début" type="date" variant="outlined"
              color="orange"></v-text-field>

            <v-text-field v-model="editForm.endedAt" label="Date de fin" type="date" variant="outlined"
              color="orange"></v-text-field>

            <div class="flex justify-end gap-2">
              <v-btn color="error" @click="isEditingInfo = false">Annuler</v-btn>
              <v-btn color="success" @click="saveEventInfo">Enregistrer</v-btn>
            </div>
          </div>
        </div>
      </v-card>

      <!-- Section Albums -->
      <v-card class="bg-transparent backdrop-blur-3xl rounded-2xl border border-zinc-400 p-6 relative">
        <div v-if="albumsFetch.loading" class="flex justify-center items-center min-h-[200px]">
          <v-progress-circular indeterminate color="orange"></v-progress-circular>
        </div>

        <div v-else-if="albumsFetch.error"
          class="bg-transparent backdrop-blur-3xl rounded-2xl border border-zinc-400 text-center text-red-500 p-4">
          {{ albumsFetch.error }}
        </div>

        <div v-else>
          <div class="flex justify-between items-center mb-4">
            <h2 class="text-2xl text-white font-semibold">Albums ({{ albums.length }})</h2>
            <v-btn class="bg-orange-500 text-white" prepend-icon="mdi-plus" to="/NewAlbum">
              Nouvel album
            </v-btn>
          </div>

          <v-list v-if="albums.length > 0" class="bg-transparent">
            <v-list-item v-for="album in albums" :key="album.id" class="mb-2 hover:bg-white/5"
              :to="`/album/${album.id}`">
              <template v-slot:prepend>
                <v-icon icon="mdi-image-album" />
              </template>
              <v-list-item-title class="text-white">{{ album.name }}</v-list-item-title>
              <template v-slot:append>
                <v-icon icon="mdi-chevron-right" />
              </template>
            </v-list-item>
          </v-list>
          <p v-else class="text-white text-center">
            Aucun album n'est associé à cet événement
          </p>
        </div>
      </v-card>
    </div>
  </div>
</template>