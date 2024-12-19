<template>
    <CommonBaseInfoForm :labels="{ name: 'Nom de l\'album' }" placeholder="Ex: Vacances d'été 2024"
        @info-changed="onInfoChanged" />

    <!-- Nouvelle section pour le partage -->
    <div class="max-w-2xl mx-auto p-6">
        <v-card class="bg-black/30 backdrop-blur-md">
            <v-card-item class="p-8">
                <div class="space-y-6">
                    <h3 class="text-lg font-semibold mb-4">Paramètres de partage</h3>

                    <v-radio-group v-model="shareType" class="mb-4">
                        <v-radio label="Album privé" value="private"></v-radio>
                        <v-radio label="Partager avec des groupes" value="shared"></v-radio>
                    </v-radio-group>

                    <div v-if="shareType === 'shared'" class="space-y-4">
                        <v-select v-model="selectedGroups" :items="availableGroups" item-title="name" item-value="id"
                            label="Sélectionnez les groupes" multiple chips variant="outlined"></v-select>
                    </div>
                </div>
            </v-card-item>
        </v-card>
    </div>
</template>

<script>
import { useGroupStore } from '../stores/GroupStore'

export default {
    data: () => ({
        shareType: 'private',
        selectedGroups: [],
        availableGroups: []
    }),

    async mounted() {
        const groupStore = useGroupStore()
        this.availableGroups = await groupStore.fetchUserGroups()
    },

    methods: {
        onInfoChanged(formData) {
            this.$emit('album-info-changed', {
                ...formData,
                sharedGroups: this.shareType === 'shared' ? this.selectedGroups : []
            })
        }
    },

    watch: {
        shareType() {
            this.onInfoChanged()
        },
        selectedGroups() {
            this.onInfoChanged()
        }
    }
}
</script>