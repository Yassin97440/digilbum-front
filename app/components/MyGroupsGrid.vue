<script setup>
const props = defineProps({
    groups: {
        type: Array,
        required: true
    }
})

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
    <div v-if="groups.length === 0" class="text-center text-gray-500">
        <p>Vous n'êtes membre d'aucun groupe pour le moment.</p>
    </div>

    <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <v-card v-for="group in groups" :key="group.id" class="bg-white/10 backdrop-blur-3xl rounded-xl">
            <v-card-title class="text-xl font-bold">{{ group.groupName }}</v-card-title>

            <v-card-text>
                <p class="mb-2">{{ group.description }}</p>
                <p class="text-sm">
                    Type: <span class="font-medium">{{ getGroupTypeLabel(group.groupType) }}</span>
                </p>
            </v-card-text>

            <v-card-actions>
                <v-btn :to="`/groups/${group.id}`" class="text-white/90" variant="text">
                    Voir le groupe
                </v-btn>
                <v-btn v-if="group.isAdmin" :to="`/groups/${group.id}/manage`" color="secondary" variant="text">
                    Gérer
                </v-btn>
            </v-card-actions>
        </v-card>
    </div>
</template>