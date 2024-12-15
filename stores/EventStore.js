import { defineStore } from "pinia";

export const useEventStore = defineStore("eventStore", {
    state: () => ({
        listForUser: [],
    }),

    actions: {
        async fetchForUser() {
            const res = await useAuthFetch('event/', 'GET');
            this.listForUser = res;
        },

        async createEventWithAlbums(data) {
            try {
                console.log("🚀 ~ createEventWithAlbums ~ data:", data);
                const newEvent = {
                    name: data.event.name,
                    startedAt: data.event.startDate,
                    endedAt: data.event.endDate,
                    description: data.event.description
                };
                // Création de l'événement
                const eventResponse = await useAuthFetch('event/', 'POST', newEvent);

                // Création de l'album associé
                if (data.pictures && data.pictures.length > 0) {
                    const albumData = {
                        album: {
                            name: data.event.name,
                            eventId: eventResponse.id
                        },
                        pictures: data.pictures
                    };
                    await AlbumService.createAlbumWithPictures(albumData);
                }

                return eventResponse;
            } catch (error) {
                console.error('Erreur lors de la création de l\'événement:', error);
                throw error;
            }
        },

        async getEventDetails(eventId) {
            return await useAuthFetch(`event/${eventId}`, 'GET');
        }
    }
});