<script setup>
definePageMeta({
  middleware: ["auth"]
  // or middleware: 'auth'
})
</script >
<template>
  <v-col class="text-center">
    <!-- <v-row>
      <div class="text-sky-400/100" justify-center>Nouvel Album</div>
    </v-row> -->
    <v-row>

      <NewAlbumFormulaire />

    </v-row>
  </v-col>
</template>

<script>

export default {
  name: "NewAlbum",
  data: () => ({
  }),
};
</script>
