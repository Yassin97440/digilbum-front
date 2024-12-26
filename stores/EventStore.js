import { defineStore } from "pinia";
import { AlbumService } from '../services/AlbumService'

export const useEventStore = defineStore("eventStore", {
    state: () => ({
        listForUser: [],
    }),

    actions: {
        async fetchForUser() {
            const res = await useAuthFetch('event/', 'GET');
            this.listForUser = res;
        },

        async createEventWithAlbums(data, toast) {
            try {
                console.log("🚀 ~ createEventWithAlbums ~ data:", data);
                const newEvent = {
                    name: data.event.name,
                    startedAt: data.event.startedAt,
                    endedAt: data.event.endedAt,
                    description: data.event.description
                };
                // Création de l'événement
                const eventResponse = await useAuthFetch('event/', 'POST', newEvent);
                useNotify(toast, 'success', 'Événement créé', 'Événement créé avec succès', 5000)

                // Création de l'album associé
                if (data.pictures && data.pictures.length > 0) {
                    const albumData = {
                        album: {
                            name: data.album.name,
                            startedAt: data.album.startedAt,
                            endedAt: data.album.endedAt,
                            eventId: eventResponse.id
                        },
                        pictures: data.pictures
                    };
                    await AlbumService.createAlbumWithPictures(albumData, toast);
                }
                navigateTo('/showAlbums');
            } catch (error) {
                useNotify(toast, 'error', 'Erreur', 'Erreur lors de la création de l\'événement:', 5000)
                console.error('Erreur lors de la création de l\'événement:', error);
                throw error;
            }
        },

        async getEventDetails(eventId) {
            return await useAuthFetch(`event/${eventId}`, 'GET');
        }
    }
});