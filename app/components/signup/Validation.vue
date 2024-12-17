<template>
    <div class="space-y-8 max-w-md mx-auto">
        <div class="text-center space-y-4">
            <h2
                class="text-2xl font-semibold bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent">
                Confirmation
            </h2>
            <p class="text-sm text-white/70">
                Vérifiez vos informations avant de finaliser votre inscription
            </p>
        </div>

        <v-card class="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-6 space-y-6">
            <div class="space-y-4">
                <h3 class="text-xl font-medium text-orange-400">Vos informations</h3>
                <div class="space-y-2">
                    <div class="flex items-center space-x-2">
                        <v-icon icon="mdi-account" class="text-blue-300"></v-icon>
                        <p class="text-sm text-white">
                            <span class="text-white/60">Nom complet:</span>
                            {{ newUser.firstName }} {{ newUser.lastName }}
                        </p>
                    </div>
                    <div class="flex items-center space-x-2">
                        <v-icon icon="mdi-email" class="text-blue-300"></v-icon>
                        <p class="text-sm text-white">
                            <span class="text-white/60">Email:</span>
                            {{ newUser.email }}
                        </p>
                    </div>
                </div>
            </div>

            <template v-if="(dataGroup.haveAgroup) || (!dataGroup.haveAgroup && dataGroup.groupName)">
                <div class="border-t border-white/10 my-4"></div>

                <div class="space-y-4">
                    <h3 class="text-xl font-medium text-orange-300">
                        {{ dataGroup.haveAgroup ? 'Groupe à rejoindre' : 'Groupe à créer' }}
                    </h3>

                    <div v-if="!dataGroup.haveAGroup" class="space-y-2">
                        <div class="flex items-center space-x-2">
                            <v-icon icon="mdi-account-group" class="text-blue-300"></v-icon>
                            <p class="text-sm text-white">
                                <span class="text-white/60">Nom du groupe:</span>
                                {{ dataGroup.groupName }}
                            </p>
                        </div>
                        <div class="flex items-center space-x-2">
                            <v-icon icon="mdi-shape" class="text-blue-300"></v-icon>
                            <p class="text-sm text-white">
                                <span class="text-white/60">Type:</span>
                                {{ dataGroup.groupType }}
                            </p>
                        </div>
                    </div>
                </div>
            </template>
        </v-card>

        <div class="flex justify-center pt-4">
            <v-btn @click="test" class="px-8 py-2 bg-gradient-to-r from-orange-400 to-orange-600
                text-white font-medium rounded-xl transform hover:scale-105 transition-all duration-300">
                Confirmer l'inscription
            </v-btn>
        </div>
    </div>
</template>

<script>
import { mapActions } from "pinia";
import { useAuthStore } from "../stores/AuthStore";
export default {

    data: () => ({
    }),
    computed: {
    },
    watch: {
        'dataGroup': function () {
            this.test()
        },
    },
    methods: {
        test() {
            const authStore = useAuthStore();

            authStore.register(this.newUser, this.dataGroup)
        }

    },
};

</script>

<script setup>
const props = defineProps({
    newUser: {
        type: Object,
    },
    dataGroup: {
        type: Object,
    }
})
</script>