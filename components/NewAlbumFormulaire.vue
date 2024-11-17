<template>
  <div
    class="min-h-screen w-full flex items-center justify-center px-4 py-6 bg-gradient-to-br from-orange-400/10 to-blue-600/10 backdrop-blur-lg">
    <v-card class="w-full max-w-2xl bg-black/30 backdrop-blur-md border-white/20 shadow-xl overflow-hidden">
      <v-card-item class="p-8">
        <div class="text-center mb-8">
          <h1 class="text-3xl font-bold bg-gradient-to-r from-orange-300 to-blue-300 bg-clip-text text-transparent">
            Nouvel Album
          </h1>
          <p class="mt-2 font-medium">
            Créez et partagez vos souvenirs
          </p>
        </div>

        <div class="space-y-6">
          <!-- Nom de l'album -->
          <div>
            <label class="text-sm font-semibold block mb-2">
              Nom de l'album
            </label>
            <v-text-field v-model="albumName" placeholder="Ex: Vacances d'été 2024" variant="outlined"
              density="comfortable" bg-color="rgb(0 0 0 / 0.2)" color="white" class="album-field"
              prepend-inner-icon="mdi-album"></v-text-field>
          </div>

          <!-- Dates -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="text-sm font-semibold  block mb-2">
                Date de début
              </label>
              <v-text-field v-model="startDate" type="date" variant="outlined" density="comfortable"
                bg-color="rgb(0 0 0 / 0.2)" color="white" class="album-field"
                prepend-inner-icon="mdi-calendar-start"></v-text-field>
            </div>

            <div>
              <label class="text-sm font-semibold  block mb-2">
                Date de fin
              </label>
              <v-text-field v-model="endDate" type="date" variant="outlined" density="comfortable"
                bg-color="rgb(0 0 0 / 0.2)" color="white" class="album-field"
                prepend-inner-icon="mdi-calendar-end"></v-text-field>
            </div>
          </div>

          <!-- Upload de photos -->
          <div>
            <label class="text-sm font-semibold  block mb-2">
              Vos photos
            </label>
            <v-file-input v-model="files" placeholder="Sélectionnez vos photos" variant="outlined" density="comfortable"
              bg-color="rgb(0 0 0 / 0.2)" color="white" class="album-field" prepend-inner-icon="mdi-camera" multiple
              :show-size="1000" chips>
              <template v-slot:selection="{ index, text }">
                <v-chip v-if="index < 2" class="mr-2" color="orange-400" variant="elevated" label>
                  {{ text }}
                </v-chip>
                <span v-else-if="index === 2" class="text-white/70 text-sm">
                  +{{ files.length - 2 }} fichiers
                </span>
              </template>
            </v-file-input>
          </div>

          <!-- Bouton d'enregistrement -->
          <div class="flex justify-center mt-8">
            <v-btn size="large" class="px-8 py-2 
              bg-gradient-to-r from-orange-400 to-blue-500
            hover:from-orange-500 hover:to-blue-600
              font-medium transition-all duration-300" elevation="2" @click="test">
              <v-icon left class="mr-2">mdi-check</v-icon>
              Enregistrer l'album
            </v-btn>
          </div>
        </div>
      </v-card-item>
    </v-card>
  </div>
</template>
<style scoped>
:deep(.album-field) {
  .v-field__input {
    color: white !important;
  }

  .v-field__outline {
    --v-field-border-opacity: 0.5 !important;
  }

  .v-field--variant-outlined .v-field__outline {
    border-color: rgba(255, 255, 255, 0.3);
  }

  .v-field__input::placeholder {
    color: rgba(255, 255, 255, 0.6) !important;
  }

  .v-field__prepend-inner {
    color: rgba(255, 255, 255, 0.7) !important;
  }
}

:deep(.v-chip) {
  background: rgba(255, 255, 255, 0.1);
  color: white;
}
</style>
<script>
import { useAlbumStore } from '~~/stores/AlbumStore';
import { mapState, mapActions } from "pinia"; export default {
  data: () => ({
    files: [],
    albumName: "",
    startDate: "",
    endDate: "",
  }),
  methods: {
    ...mapActions(useAlbumStore, ["postNewAlbums"]),
    test() {
      const album = {
        name: this.albumName,
        startDate: this.startDate,
        endDate: this.endDate
      };
      this.postNewAlbums({
        album,
        pictures: this.files,
      });
    },
  },
};
</script>
