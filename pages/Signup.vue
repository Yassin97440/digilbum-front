<script setup>
definePageMeta({
  middleware: ["register"],
  layout: "signup",
  // or middleware: 'auth'
})
</script>

<template>
  <v-card></v-card>
  <LoginStepper></LoginStepper>
</template>

<script>
export default {
  name: "IndexPage",
};
</script>
