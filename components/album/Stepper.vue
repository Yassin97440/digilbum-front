<template>
    <v-container>
        <v-stepper :items="['Type', 'Informations', 'Photos', 'Validation']" v-model="currentStep" next-text="Suivant"
            prev-text="Précédent">

            <!-- Étape 1: Choix du type -->
            <template v-slot:item.1>
                <div class="flex flex-col items-center space-y-6 p-8">
                    <h2 class="text-2xl font-bold text-center mb-4">Que souhaitez-vous créer ?</h2>

                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-2xl">
                        <v-card @click="selectType('album')" :class="{ 'border-2 border-orange-400': type === 'album' }"
                            class="p-6 cursor-pointer hover:bg-black/40 transition-all">
                            <div class="text-center">
                                <v-icon size="48" color="orange-400">mdi-image-album</v-icon>
                                <h3 class="text-xl mt-4">Album Simple</h3>
                                <p class="text-sm opacity-70 mt-2">Créez un album photo unique</p>
                            </div>
                        </v-card>

                        <v-card @click="selectType('event')" :class="{ 'border-2 border-blue-400': type === 'event' }"
                            class="p-6 cursor-pointer hover:bg-black/40 transition-all">
                            <div class="text-center">
                                <v-icon size="48" color="blue-400">mdi-calendar-star</v-icon>
                                <h3 class="text-xl mt-4">Événement</h3>
                                <p class="text-sm opacity-70 mt-2">Créez un événement avec plusieurs albums</p>
                            </div>
                        </v-card>
                    </div>
                </div>
            </template>

            <!-- Étape 2: Informations -->
            <template v-slot:item.2>
                <AlbumInfoForm v-if="type === 'album'" @info-changed="updateAlbumInfo" />
                <AlbumEventInfoForm v-else @event-info-changed="updateEventInfo"
                    @album-info-changed="updateAlbumInfo" />
            </template>

            <!-- Étape 3: Photos -->
            <template v-slot:item.3>
                <AlbumPhotoUpload @photos-selected="updatePhotos" />
            </template>

            <!-- Étape 4: Validation -->
            <template v-slot:item.4>
                <AlbumValidation :type="type" :album-info="albumInfo" :event-info="eventInfo" :photos="photos"
                    @confirm="handleSubmit" />
            </template>

        </v-stepper>
    </v-container>
</template>

<script>
import { useAlbumStore } from '~/stores/AlbumStore';
import { useEventStore } from '~/stores/EventStore';

export default {
    data: () => ({
        currentStep: 1,
        type: null,
        albumInfo: {},
        eventInfo: {},
        photos: [],
    }),

    methods: {
        selectType(selectedType) {
            this.type = selectedType;
            console.log("🚀 ~ selectType ~ this.type:", this.type);
        },

        updateAlbumInfo(info) {
            this.albumInfo = info;
        },

        updateEventInfo(info) {
            this.eventInfo = info;
        },

        updatePhotos(selectedPhotos) {
            this.photos = selectedPhotos;
        },

        async handleSubmit() {
            const albumStore = useAlbumStore();
            const eventStore = useEventStore();

            try {
                if (this.type === 'album') {
                    await albumStore.postNewAlbums({
                        album: this.albumInfo,
                        pictures: this.photos
                    });
                } else {
                    console.log("🚀 ~ handleSubmit ~ this.albumInfo:", this.albumInfo);
                    console.log("🚀 ~ handleSubmit ~ this.eventInfo:", this.eventInfo);
                    await eventStore.createEventWithAlbums({
                        event: this.eventInfo,
                        album: this.albumInfo,
                        pictures: this.photos
                    });
                }
                // Redirection après succès
                navigateTo('/showAlbums');
            } catch (error) {
                console.error('Erreur lors de la création:', error);
            }
        }
    }
};
</script>