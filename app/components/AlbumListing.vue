<template>
  <v-row>
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full px-4">
      <v-card v-for="(album, i) in albums" :key="i" class="relative overflow-hidden bg-white/10 backdrop-blur-md border border-white/20 
                 shadow-2xl rounded-2xl transform transition-all duration-500 hover:scale-105
                 hover:shadow-lg hover:border-white/30 group" elevation="0">
        <div class="absolute inset-0 bg-gradient-to-br from-blue-400/5 to-purple-500/10 
                      group-hover:opacity-75 transition-opacity duration-500"></div>

        <div class="relative">
          <!-- Image de couverture de l'album -->
          <div class="relative aspect-[4/3] overflow-hidden">
            <img type=file :src="album.coverImagePath" class="w-full h-full object-cover transform transition-transform duration-700
                       group-hover:scale-110" :alt="album.name + ' cover'" />
            <div class="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
          </div>

          <!-- Contenu de la carte -->
          <div class="p-6 relative z-10">
            <h2 class="text-2xl font-semibold  mb-4">{{ album.name }}</h2>

            <div class="flex justify-between items-center">
              <v-btn @click="openPicturesForAlbum(album)" class="bg-white/10 hover:bg-white/20 text-white/90">
                Voir l'album
              </v-btn>

              <v-btn icon @click="deleteAlbum(album)" class="text-red-400/70 hover:text-red-400 transition-colors">
                <v-icon>mdi-trash-can</v-icon>
              </v-btn>
            </div>
          </div>
        </div>
      </v-card>
    </div>

    <!-- Dialog pour afficher les images de l'album -->
    <v-dialog v-model="dialog" fullscreen class="backdrop-blur-sm">
      <v-card class="dialog-card text-white">
        <v-toolbar color="transparent" class="backdrop-blur-md border-b">
          <v-btn icon @click="dialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>

          <v-toolbar-title>
            {{ albumSelectedName }}
          </v-toolbar-title>

          <v-spacer></v-spacer>
        </v-toolbar>

        <div class="dialog-content">
          <PicturesAlbum :pictures="selectedAlbumPictures" />
        </div>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import { useAlbumStore } from '../stores/AlbumStore';
import { mapActions, mapState } from 'pinia';
export default {
  props: { albums: Array },
  data: () => ({
    dialog: false,
    albumSelectedName: "",
  }),
  computed: {
    ...mapState(useAlbumStore, ["selectedAlbumPictures"])

  },
  methods: {
    ...mapActions(useAlbumStore, ["setSelectedAlbum", "getPicturesForAlbum", "delete"]),
    openPicturesForAlbum(album) {
      this.getPicturesForAlbum(album);
      this.albumSelectedName = album.name
      this.dialog = true;
    },
    deleteAlbum(album) {
      this.delete(album);
    }
  },
};
</script>
<style scoped>
.dialog-card {
  display: flex;
  flex-direction: column;
  height: 100%;
  background: radial-gradient(circle at center,
      rgba(52, 51, 51, 0.95) 0%,
      rgba(10, 10, 15, 0.98) 100%);

}

.dialog-content {
  flex: 1;
  overflow: hidden;
}
</style>