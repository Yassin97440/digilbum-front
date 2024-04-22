<template>
  <v-row>

    <div class="flex flex-wrap justify-evenly">

      <v-card class="mx-auto my-12 " max-width="374" v-for="(album, i) in albums" :key="i">
        <v-card-title> {{ album.name }}</v-card-title>
        <v-card-actions>
          <v-btn color="secondary" @click="openPicturesForAlbum(album)" text>
            Regarder l'album
          </v-btn>
        </v-card-actions>
      </v-card>
    </div>

    <v-dialog v-model="dialog" fullscreen :scrim="true" class="flex flex-col">
      <v-toolbar collapse class="absolute  top-0 right-0">
        <v-toolbar-item>

          <v-btn icon @click="dialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-toolbar-item>
        <v-toolbar-title>{{ albumSelectedName }}</v-toolbar-title>

      </v-toolbar>
      <PicturesAlbum :pictures="selectedAlbumPictures"></PicturesAlbum>
    </v-dialog>
  </v-row>
</template>

<script>
import { useAlbumStore } from '~~/stores/AlbumStore';
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
    ...mapActions(useAlbumStore, ["setSelectedAlbum", "getPicturesForAlbum"]),
    openPicturesForAlbum(album) {
      this.getPicturesForAlbum(album);
      this.dialog = true;
      this.albumSelectedName = album.name
      // console.log("🚀 ~ openPicturesForAlbum ~ album.name:", this.albumSelectedName)
      // console.log("🚀 ~ openPicturesForAlbum ~ album:", album)
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