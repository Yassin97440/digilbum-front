<template>
    <div class="max-w-2xl mx-auto p-2 md:p-6">
        <v-card class="bg-transparent backdrop-blur-3xl border border-zinc-400 shadow-lg rounded-xl">
            <v-card-item class="p-4 md:p-8 text-white">
                <h2 class="text-2xl font-bold mb-4 text-orange-400/50">Récapitulatif</h2>

                <!-- Type -->
                <div class="mb-3">
                    <h3 class="text-lgg font-semibold mb-2 text-orange-400/50">Type</h3>
                    <p class="text-sm">
                        {{ type === 'album' ? 'Album Simple' : 'Événement' }}
                    </p>
                </div>

                <!-- Informations -->
                <div class="mb-6">
                    <h3 class="text-lg font-semibold mb-2 text-orange-400/50">Informations</h3>
                    <div class="space-y-2">

                        <!-- Event informations -->
                        <div v-if="type !== 'album'">
                            <v-divider class="my-2 md:my-4 text-zinc-900 border-opacity-100">Evenement</v-divider>
                            <p class="text-sm">
                                <span class="font-medium">Nom:</span>
                                {{ eventInfo.name }}
                            </p>
                            <p class="text-sm">
                                <span class="font-medium">Date de début:</span>
                                {{ formatDate(eventInfo.startedAt) }}
                            </p>
                            <p class="text-sm">
                                <span class="font-medium">Date de fin:</span>
                                {{ formatDate(eventInfo.endedAt) }}
                            </p>
                            <p v-if="type === 'event'" class="text-sm">
                                <span class="font-medium">Description:</span>
                                {{ eventInfo.description }}
                            </p>
                        </div>

                        <v-divider class="my-2 md:my-4 text-zinc-900 border-opacity-100">Album</v-divider>
                        <!-- Album informations -->
                        <p class="text-sm">
                            <span class="font-medium">Nom:</span>
                            {{ albumInfo.name }}
                        </p>
                        <p class="text-sm">
                            <span class="font-medium">Date de début:</span>
                            {{ formatDate(albumInfo.startedAt) }}
                        </p>
                        <p class="text-sm">
                            <span class="font-medium">Date de fin:</span>
                            {{ formatDate(albumInfo.endedAt) }}
                        </p>

                        <!-- Sharing informations -->
                        <p class="text-sm">
                            <span class="font-medium">Type de partage:</span>
                            {{ sharingOptions.length > 0 ? 'Partagé avec des groupes' : 'Album privé' }}
                        </p>
                        <p v-if="sharingOptions.length > 0" class="text-sm">
                            <span class="font-medium">Groupes partagés:</span>
                            {{ sharingOptions.map(group => group.groupName).join(', ') }}
                        </p>
                    </div>
                </div>

                <v-divider class="my-2 md:my-4 text-zinc-900 border-opacity-100"></v-divider>

                <!-- Photos -->
                <div class="mb-6">
                    <h3 class="text-lg font-semibold mb-2 text-orange-400/50">Photos</h3>
                    <p class="text-sm">
                        {{ photos.length }} photo(s) sélectionnée(s)
                    </p>
                </div>

                <!-- Bouton de confirmation -->
                <div class="flex justify-center mt-8">
                    <v-btn class="bg-zinc-400 rounded-lg mb-1 text-white" size="large" @click="$emit('confirm')"
                        :loading="loading">
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
        sharingOptions: {
            type: Array,
            default: () => []
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
            if (!dateString) return 'no data';
            return new Date(dateString).toLocaleDateString('fr-FR');
        }
    }
};
</script>