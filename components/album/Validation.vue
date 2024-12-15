<template>
    <div class="max-w-2xl mx-auto p-6">
        <v-card class="bg-black/30 backdrop-blur-md">
            <v-card-item class="p-8">
                <h2 class="text-2xl font-bold mb-6">Récapitulatif</h2>

                <!-- Type -->
                <div class="mb-6">
                    <h3 class="text-lg font-semibold mb-2">Type</h3>
                    <p class="text-sm">
                        {{ type === 'album' ? 'Album Simple' : 'Événement' }}
                    </p>
                </div>

                <!-- Informations -->
                <div class="mb-6">
                    <h3 class="text-lg font-semibold mb-2">Informations</h3>
                    <div class="space-y-2">
                        <p class="text-sm">
                            <span class="font-medium">Nom:</span> 
                            {{ type === 'album' ? albumInfo.name : eventInfo.name }}
                        </p>
                        <p class="text-sm">
                            <span class="font-medium">Date de début:</span> 
                            {{ formatDate(type === 'album' ? albumInfo.startDate : eventInfo.startDate) }}
                        </p>
                        <p class="text-sm">
                            <span class="font-medium">Date de fin:</span> 
                            {{ formatDate(type === 'album' ? albumInfo.endDate : eventInfo.endDate) }}
                        </p>
                        <p v-if="type === 'event'" class="text-sm">
                            <span class="font-medium">Description:</span> 
                            {{ eventInfo.description }}
                        </p>
                    </div>
                </div>

                <!-- Photos -->
                <div class="mb-6">
                    <h3 class="text-lg font-semibold mb-2">Photos</h3>
                    <p class="text-sm">
                        {{ photos.length }} photo(s) sélectionnée(s)
                    </p>
                </div>

                <!-- Bouton de confirmation -->
                <div class="flex justify-center mt-8">
                    <v-btn
                        color="primary"
                        size="large"
                        @click="$emit('confirm')"
                        :loading="loading"
                    >
                        Confirmer la création
                    </v-btn>
                </div>
            </v-card-item>
        </v-card>
    </div>
</template>

<script>
export default {
    props: {
        type: {
            type: String,
            required: true
        },
        albumInfo: {
            type: Object,
            default: () => ({})
        },
        eventInfo: {
            type: Object,
            default: () => ({})
        },
        photos: {
            type: Array,
            default: () => []
        }
    },

    data: () => ({
        loading: false
    }),

    methods: {
        formatDate(dateString) {
            if (!dateString) return '';
            return new Date(dateString).toLocaleDateString('fr-FR');
        }
    }
};
</script> 