import { defineStore } from "pinia";

export const useEventStore = defineStore("eventStore", {
    state: () => {
        return {
            listForUser: [],
        }
    },

    actions: {
        async fetchForUser() {
            console.log("yolo");
            const res = await useAuthFetch('event/', 'GET');
            this.listForUser = res;
            console.log("🚀 ~ fetchForUser ~ this.listForUser:", this.listForUser)

        },

        async create() {
            useAuthFetch('event/', 'POST')
        }

    }
});