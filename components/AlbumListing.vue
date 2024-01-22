<template>
  <v-row>
    <v-card class="mx-auto my-12" max-width="374" v-for="(album, i) in albums" :key="i">
      <v-card-title> {{ album.name }}</v-card-title>
      <v-card-actions>
        <v-btn color="deep-purple lighten-2" @click="openPicturesForAlbum(album)" text>
          Regarder l'album

        </v-btn>
      </v-card-actions>
    </v-card>
    <v-dialog v-model="dialog" fullscreen :scrim="true">
      <v-toolbar>
        <v-btn icon @click="dialog = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
        <v-toolbar-title>Settings</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items>
          <v-btn variant="text" @click="dialog = false">
            Save
          </v-btn>
        </v-toolbar-items>
      </v-toolbar>
      <PicturesAlbum :pictures="selectedAlbumPictures"></PicturesAlbum>
    </v-dialog>
  </v-row>
</template>

<script>
import { useAlbumStore } from '~~/stores/AlbumStore';
import { mapActions, mapState } from 'pinia';
export default {
  props: { albums: Array, pictures: Array },
  data: () => ({
    dialog: false,
  }),
  computed: {
    ...mapState(useAlbumStore, ["selectedAlbumPictures"])

  },
  methods: {
    ...mapActions(useAlbumStore, ["setSelectedAlbum", "getPicturesForAlbum"]),
    openPicturesForAlbum(album) {
      this.getPicturesForAlbum(album);
      this.dialog = true;
    }
  },
};
</script>
<style>
.dialog-bottom-transition-enter-active,
.dialog-bottom-transition-leave-active {
  transition: transform .2s ease-in-out;
}
</style>