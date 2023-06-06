<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="6">
      <NewUserFormulaire></NewUserFormulaire>
    </v-col>
  </v-row>
</template>

<script>
import NewUserFormulaire from "~/components/NewUserFormulaire.vue";
export default {
  components: { NewUserFormulaire },
  name: "IndexPage",
};
</script>
