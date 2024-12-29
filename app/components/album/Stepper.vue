<template>
    <v-container class="">
        <v-stepper class="bg-transparent backdrop-blur-3xl rounded-2xl"
            :items="['Type', 'Informations', 'Photos', 'Validation']" v-model="currentStep" next-text="Suivant"
            prev-text="Précédent" mobile>

            <!-- Étape 1: Choix du type -->
            <template v-slot:item.1>
                <div class="flex flex-col items-center space-y-6 p-8 text-white">
                    <h2 class="text-2xl font-bold text-center mb-4 ">
                        Que souhaitez-vous créer ?</h2>

                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-2xl ">
                        <v-card @click="selectType('album')" :class="{ 'border-2 border-cyan-900': type === 'album' }"
                            class="p-6 cursor-pointer bg-yellow-600/30 hover:bg-yellow-600/80 transition-all rounded-xl">
                            <div class="text-center text-white">
                                <v-icon size="48" color="">mdi-image-album</v-icon>
                                <h3 class="text-xl mt-4">Album Simple</h3>
                                <p class="text-sm opacity-70 mt-2">Créez un album photo unique</p>
                            </div>
                        </v-card>

                        <v-card @click="selectType('event')" :class="{ 'border-2 border-cyan-900': type === 'event' }"
                            class="p-6 cursor-pointer bg-yellow-600/30 hover:bg-yellow-600/80 transition-all rounded-xl">
                            <div class="text-center text-white">
                                <v-icon size="48" color="">mdi-calendar-star</v-icon>
                                <h3 class="text-xl mt-4">Événement</h3>
                                <p class="text-sm opacity-70 mt-2">Créez un événement avec plusieurs albums</p>
                            </div>
                        </v-card>
                    </div>
                </div>
            </template>

            <!-- Étape 2: Informations -->
            <template v-slot:item.2>
                <AlbumInfoForm v-if="type === 'album'" @album-info-changed="updateAlbumInfo" />
                <AlbumEventInfoForm v-else @event-info-changed="updateEventInfo"
                    @album-info-changed="updateAlbumInfo" />
            </template>

            <!-- Étape 3: Photos -->
            <template v-slot:item.3>
                <AlbumPhotoUpload @photos-selected="updatePhotos" />
            </template>

            <!-- Étape 4: Validation -->
            <template v-slot:item.4>
                <div class="relative">
                    <AlbumValidation class="z-0" :type="type" :album-info="albumInfo" :event-info="eventInfo"
                        :photos="photos" :sharing-options="sharingOptions" @confirm="handleSubmit" />
                    <div v-if="loading" class="absolute inset-0 flex justify-center items-center bg-gray-500 z-10">
                        <v-progress-circular indeterminate color="orange" size="64"></v-progress-circular>
                    </div>
                </div>
            </template>

        </v-stepper>
    </v-container>
</template>

<script setup>
import { useAlbumStore } from '../stores/AlbumStore';
import { useEventStore } from '../stores/EventStore';
const toast = useToast()

const currentStep = ref(1)
const type = ref(null)
const albumInfo = ref({})
const eventInfo = ref({})
const sharingOptions = ref([])
const photos = ref([])
const loading = useAlbumStore().loading

const selectType = (selectedType) => {
    type.value = selectedType;
}

const updateAlbumInfo = (info) => {
    albumInfo.value = info.albumData;
    sharingOptions.value = info.sharedGroups;
}

const updateEventInfo = (info) => {
    eventInfo.value = info;
}

const updatePhotos = (selectedPhotos) => {
    photos.value = selectedPhotos;
}

const handleSubmit = async () => {
    const albumStore = useAlbumStore();
    const eventStore = useEventStore();
    try {
        if (type.value === 'album') {
            await albumStore.postNewAlbums({
                album: albumInfo.value,
                pictures: photos.value,
            },
                sharingOptions.value,
                toast
            );
        } else {
            await eventStore.createEventWithAlbums({
                event: eventInfo.value,
                album: albumInfo.value,
                pictures: photos.value
            },
                toast
            );
        }

    } catch (error) {
        console.error('Erreur lors de la création:', error);
    }
}

</script>
