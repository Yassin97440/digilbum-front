<script setup>
definePageMeta({
  middleware: ["auth"]
  // or middleware: 'auth'
})
</script>
<template>
  <NewAlbumFormulaire class="size-full" />

</template>

<script>

export default {
  name: "NewAlbum",
  data: () => ({
  }),
};
</script>
