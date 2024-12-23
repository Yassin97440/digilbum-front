<script setup>
definePageMeta({
    middleware: ["auth"]
})

const { copy } = useClipboard()
const route = useRoute()
const groupId = route.params.id
const { group, loading, error } = useGroup(groupId)
const { usersGroup, usersLoading, usersError } = useUserGroupService(groupId)

// Fonction pour obtenir le libellé du type de groupe
const getGroupTypeLabel = (type) => {
    const types = {
        'Familly': 'Famille',
        'Friends': 'Amis',
        'Company': 'Travail',
        'other': 'Autre'
    }
    return types[type] || 'Autre'
}
</script>

<template>
    <div class="min-h-screen w-full px-6 py-8">
        <div v-if="loading" class="flex justify-center items-center min-h-[200px]">
            <v-progress-circular indeterminate color="orange"></v-progress-circular>
        </div>

        <div v-else-if="error" class="text-center text-red-500 bg-black/20 backdrop-blur-sm p-4 rounded-lg">
            {{ error }}
        </div>

        <div v-else-if="group" class="max-w-4xl mx-auto">
            <div class="flex items-center justify-between mb-8 bg-black/30 backdrop-blur-sm p-6 rounded-lg">
                <h1
                    class="text-4xl font-bold bg-gradient-to-r from-orange-400 via-rose-500 to-purple-600 bg-clip-text text-transparent">
                    {{ group.groupName }}
                </h1>

                <div class="flex items-center">
                    <p class="text-sm pr-1">
                        Code d'invitation :
                    </p>
                    <p class="text-sm cursor-pointer " @click="copy(group.joinCode)"> {{ group.joinCode }}</p>

                </div>
                <v-chip
                    :color="group.groupType === 'Familly' ? 'success' : group.groupType === 'Friends' ? 'info' : 'warning'"
                    class="font-medium">
                    {{ getGroupTypeLabel(group.groupType) }}
                </v-chip>
            </div>

            <!-- Members data -->
            <div class="mb-8">
                <h2
                    class="text-2xl font-semibold mb-1 text-white bg-black/30 backdrop-blur-sm p-4 rounded-lg inline-block">
                    Membres ({{ usersGroup.length }})
                </h2>
                <v-list class="bg-black/40 backdrop-blur-lg rounded-lg border border-white/10">
                    <v-list-item v-for="member in usersGroup" :key="usersGroup.id"
                        class="mb-2 hover:bg-white/5 transition-colors duration-200">
                        <template v-slot:prepend>
                            <v-avatar :color="member.isAdmin ? 'warning' : 'primary'" class="mr-3">
                                <span class="text-h6">{{ member.firstName.charAt(0) }}{{ member.lastName.charAt(0)
                                    }}</span>
                            </v-avatar>
                        </template>
                        <v-list-item-title class="text-white">
                            {{ member.firstName }} {{ member.lastName }}
                            <v-chip v-if="member.isAdmin" color="warning" size="small" class="ml-2">
                                Admin
                            </v-chip>
                        </v-list-item-title>
                        <v-list-item-subtitle class="text-gray-300">{{ member.email }}</v-list-item-subtitle>
                    </v-list-item>
                </v-list>
            </div>

            <!-- Albums data -->
            <!-- <div v-if="group.albums?.length" class="mb-8">
                <h2 class="text-2xl font-semibold mb-4 text-white bg-black/30 backdrop-blur-sm p-4 rounded-lg inline-block">
                    Albums partagés
                </h2>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <v-card v-for="album in group.albums" 
                        :key="album.id" 
                        class="bg-black/40 backdrop-blur-lg border border-white/10"
                    >
                        <v-card-title class="text-white">{{ album.name }}</v-card-title>
                        <v-card-actions>
                            <v-btn :to="`/albums/${album.id}`" color="warning" variant="text">
                                Voir l'album
                            </v-btn>
                        </v-card-actions>
                    </v-card>
                </div>
            </div> -->
        </div>
    </div>
</template>