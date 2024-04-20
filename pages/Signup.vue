<script setup>
definePageMeta({
  middleware: ["register"],
  layout: "signup",
  // or middleware: 'auth'
})
</script>

<template>
  <NewUserFormulaire></NewUserFormulaire>

</template>

<script>
import NewUserFormulaire from "~/components/NewUserFormulaire.vue";
export default {
  components: { NewUserFormulaire },
  name: "IndexPage",
};
</script>
