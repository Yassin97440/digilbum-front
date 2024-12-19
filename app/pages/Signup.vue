<script setup>
definePageMeta({
  middleware: ["register"],
  layout: "signup",
})

import { ref, reactive } from 'vue'
import { useAuthStore } from "../stores/AuthStore"
import { useGroupStore } from "../stores/GroupStore"

// État réactif
const currentStep = ref(1)
const dataGroup = reactive({})
const newUser = reactive({})

// Stores
const authStore = useAuthStore()
const groupStore = useGroupStore()

// Méthodes
const groupDataChanged = async (newDataGroup) => {
  if (newDataGroup.haveAgroup) {
    const group = await groupStore.findByJoinCode(newDataGroup.joinCode)
    dataGroup.groupName = group.groupName
    dataGroup.groupType = group.groupType
    dataGroup.id = group.id
  }
  Object.assign(dataGroup, newDataGroup)
}
</script>

<template>
  <div class="min-h-screen w-full flex items-center justify-center px-4 py-6">
    <v-card
      class="w-full max-w-2xl relative bg-white/10 backdrop-blur-md border border-white/20 shadow-2xl overflow-hidden rounded-2xl">
      <v-card-item class="p-10">
        <div class="text-center mb-10 relative">
          <h1 class="pb-3 text-6xl font-bold bg-gradient-to-r from-orange-400 via-pink-500 to-blue-600 bg-clip-text text-transparent
                     transform hover:scale-105 transition-transform duration-300">
            Digilbum
          </h1>
          <p class="mt-4 text-lg font-light">
            Créez votre compte pour partager vos moments
          </p>
        </div>

        <v-stepper v-model="currentStep" :items="['Informations', 'Groupe', 'Validation']" class="bg-transparent"
          next-text="Suivant" prev-text="Précédent">

          <template v-slot:item.1>
            <SignupNewUserFormulaire v-model:newUser="newUser" class="max-w-md mx-auto">
            </SignupNewUserFormulaire>
          </template>

          <template v-slot:item.2>
            <SignupGroupForm @group-data-changed="groupDataChanged" class="max-w-md mx-auto">
            </SignupGroupForm>
          </template>

          <template v-slot:item.3>
            <SignupValidation :new-user="newUser" :data-group="dataGroup" class="max-w-md mx-auto">
            </SignupValidation>
          </template>

        </v-stepper>

        <div class="text-center mt-6">
          <NuxtLink to="/Login" class="inline-flex items-center text-base text-blue-500/80 hover:text-blue-500 transition-colors
                   transform hover:translate-x-1 duration-300">
            Déjà un compte ? Connectez-vous
            <v-icon icon="mdi-chevron-right" class="ml-1"></v-icon>
          </NuxtLink>
        </div>
      </v-card-item>
    </v-card>
  </div>
</template>
