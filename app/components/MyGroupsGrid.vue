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

    <div v-else class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        <CommonCard v-for="group in groups" :key="group.id" :item="group" actionTitle="Voir le groupe">
            <template #title>
                {{ group.groupName }}
            </template>

                <p class="text-sm">
                    Type: <span class="font-medium">{{ getGroupTypeLabel(group.groupType) }}</span>
                </p>

            <template #actions>
                <v-btn :to="`/groups/${group.id}`" color="primary" variant="text">
                    Voir le groupe
                </v-btn>
                <v-btn v-if="group.isAdmin" :to="`/groups/${group.id}/manage`" color="secondary" variant="text">
                    Gérer
                </v-btn>
            </template>
        </CommonCard>
    </div>
</template>