<template>
  <div class="min-h-screen w-full px-6 py-8">
    <h1
      class="text-4xl font-bold mb-12 text-center bg-gradient-to-r from-orange-400 via-pink-500 to-blue-600 bg-clip-text text-transparent">
      Mes Groupes
    </h1>

    <div class="flex justify-end mb-6">
      <v-btn color="primary" class="mr-4" to="/groups/join">
        <v-icon left>mdi-account-group-outline</v-icon>
        Rejoindre un groupe
      </v-btn>
      <v-btn color="primary" to="/groups/new">
        <v-icon left>mdi-plus</v-icon>
        Créer un groupe
      </v-btn>
    </div>

    <div v-if="loading" class="flex justify-center items-center min-h-[200px]">
      <v-progress-circular indeterminate color="orange"></v-progress-circular>
    </div>

    <div v-else-if="error" class="text-center text-red-500">
      {{ error }}
    </div>

    <div v-else>
      <MyGroupsGrid :groups="myGroups" />
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  middleware: ["auth"]
})

const { myGroups, loading, error } = useMyGroups()
</script>

<style></style>