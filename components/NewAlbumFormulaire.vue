<template>
  <v-container>
    <v-row class="d-flex justify-center mb-6">
      <v-col cols="6" sm="6" md="6">
        <v-text-field v-model="albumName" label="Nom de l'album" rounded outlined clearable></v-text-field>
      </v-col>
    </v-row>
    <v-row class="d-flex justify-center mb-6 gap-5">
      <v-col cols="12" sm="12" md="3">
        <v-text-field v-model="startDate" type="date" label="Date de début de l'évènement" rounded outlined
          clearable></v-text-field>
      </v-col>
      <v-col cols="12" sm="12" md="3">
        <v-text-field v-model="endDate" type="date" label="Date de début de l'évènement" rounded outlined
          clearable></v-text-field>
      </v-col>
    </v-row>
    <v-row class="d-flex justify-center mb-6">
      <v-col cols="6" sm="6" md="6">
        <v-file-input v-model="files" label="Met ton photo terla" counter filled prepend-icon="mdi-camera" multiple
          rounded outlined clearable :show-size="1000">
          <template v-slot:selection="{ index, text }">
            <v-chip v-if="index < 2" color="deep-grey accent-4" dark label small>
              {{ text }}
            </v-chip>

            <span v-else-if="index === 2" class="text-overline grey--text text--darken-3 mx-2">
              +{{ files.length - 2 }} Fichiers
            </span>
          </template>
        </v-file-input>
      </v-col>
    </v-row>
    <v-row class="d-flex justify-center mb-6">
      <v-col>
        <v-btn rounded color="primary" dark @click="test"> Enregister </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>
<style>

</style>
<script>
import { useAlbumStore } from '~~/stores/AlbumStore';
import { mapState, mapActions } from "pinia";export default {
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
      this.postNewAlbums( {
        album,
        pictures: this.files,
      });
    },
  },
};
</script>
