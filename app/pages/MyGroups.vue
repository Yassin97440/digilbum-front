<template>
  <div class="min-h-screen w-full px-6 py-8">
    <h1
      class="text-4xl font-bold mb-12 text-center bg-gradient-to-r from-zinc-600  via-red-500/50 to-gray-600 bg-clip-text text-transparent">
      Mes Groupes
    </h1>

    <div class="flex justify-items-center mb-6 max-w-min	">
      <v-btn class="mr-4 w-1/2 rounded-lg bg-zinc-400 text-white" @click="openJoinGroupDialog">
        <v-icon>mdi-account-group-outline</v-icon>
        <span class="hidden md:inline ml-2">Rejoindre un groupe</span>
        <span class="inline md:hidden ml-2">Rejoindre</span>
      </v-btn>
      <v-btn class="w-1/2 rounded-lg bg-zinc-400 text-white" @click="createGroup">
        <v-icon>mdi-plus</v-icon>
        <span class="hidden md:inline ml-2">Créer un groupe</span>
        <span class="inline md:hidden ml-2">Créer</span>
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

    <v-dialog v-model="joinGroupDialog" max-width="500" class="w-[95vw] md:w-[400px]">
      <v-card>
        <v-card-title>
          <h1>Rejoindre un groupe</h1>
        </v-card-title>
        <v-card-item>
          <v-text-field v-model="joinGroupCode" label="Code du groupe" variant="outlined" density="comfortable"
            prepend-icon="mdi-account-multiple-plus"
            :rules="[v => !v || (v.length >= 8 && v.length <= 15) || 'Le code doit contenir entre 8 et 15 caractères']"
            maxlength="15"></v-text-field>

          <div class="space-y-4">
            <h3 class="text-xl font-medium text-orange-300">
              Groupe à rejoindre
            </h3>

            <div class="flex items-center space-x-2">
              <v-icon icon="mdi-account-group" class="text-blue-300"></v-icon>
              <p class="text-sm ">
                <span class="">Nom du groupe:</span>
                {{ groupData?.groupName }}
              </p>
            </div>
            <div class="flex items-center space-x-2">
              <v-icon icon="mdi-shape" class="text-orange-300"></v-icon>
              <p class="text-sm ">
                <span class="">Type:</span>
                {{ groupData?.groupType }}
              </p>
            </div>
            <div v-if="errorJoinGroup?.value" class="text-center text-red-500">
              Erreur lors de votre ajout au groupe
            </div>
          </div>
        </v-card-item>

        <v-card-actions>
          <v-btn color="primary" @click="joinGroup">Rejoindre</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="createGroupDialog" width="auto">
      <SignupNewGroupForm />
      0
    </v-dialog>
    <Toast />

  </div>
</template>

<script setup>
import { useGroupStore } from '~~/stores/GroupStore';
definePageMeta({
  middleware: ["auth"]
})
const groupStore = useGroupStore()

const joinGroupDialog = ref(false)
const createGroupDialog = ref(false)
const joinGroupCode = ref("")
const toast = useToast()
const groupData = reactive({})
const errorJoinGroup = ref(false)

watch(joinGroupCode, (newJoinGroupCode, oldJoinGroupCode) => {
  getGroupByJoinCode()
})

const openJoinGroupDialog = () => {
  joinGroupDialog.value = true
}

const joinGroup = async () => {
  try {
    const res = await groupStore.addMember(joinGroupCode.value)
    joinGroupDialog.value = false
    useNotify(toast, "success", "Ajou té au groupe", "Tu as bien été ajouté au groupe! Tu peux visiter les albums du groupe", 5000)
  } catch (err) {
    errorJoinGroup.value = true
    useNotify(toast, "error", "Erreur", "Une erreur s'est produite lors de votre ajout au groupe", 5000)
  }

}

const getGroupByJoinCode = async () => {
  if (joinGroupCode.value.length >= 8) {
    const group = await groupStore.findByJoinCode(joinGroupCode.value)
    Object.assign(groupData, group)
  }
}
const createGroup = () => {
  createGroupDialog.value = true
  console.log("createGroup")
}
const { myGroups, loading, error } = useMyGroups()
</script>

<style></style>