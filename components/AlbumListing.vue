<template>
  <v-row>
    <v-card class="mx-auto my-12" max-width="374" v-for="(album, i) in albums" :key="i">
      <v-card-title> {{ album.name }}</v-card-title>
      <v-card-actions>
        <v-btn color="deep-purple lighten-2" @click="setSelectedAlbum(album)" text> Regarder l'album </v-btn>
      </v-card-actions>
    </v-card>
    <!-- <v-card v-for="(item, i) in items" :key="i" elevation="24" loading shaped></v-card> -->
  </v-row>
</template>
<style></style>
<script>
import { useAlbumStore } from '~~/stores/AlbumStore';
import { mapActions, mapState } from 'pinia';
export default {
  // name: "AlbumListing",
  props: { albums: Array },
  data: () => ({
    // albums: [],
  }),
  methods: {
    ...mapActions(useAlbumStore, ["setSelectedAlbum"]),
    test() {
      // const album = {
      //   name: this.albumName,
      //   startDate: this.startDate,
      //   endDate: this.endDate,
      // };
      // this.$store.dispatch("postNewAlbums", {
      //   album,
      //   pictures: this.files,
      // });
    },
  },
};
</script>
