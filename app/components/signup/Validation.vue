<template>
    <div class="space-y-8 max-w-md ">
        <v-card
            class=" bg-transparent backdrop-blur-3xl border border-zinc-400 rounded-xl p-2 space-y-6 text-white mb-3 items-center  ">

            <div class="text-center space-y-4">
                <h2
                    class="text-2xl font-semibold bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent">
                    Confirmation
                </h2>
                <p class="text-sm ">
                    Vérifiez vos informations avant de finaliser votre inscription
                </p>
            </div>

            <!-- Informations utilisateur -->
            <div class="space-y-4">
                <h3 class="text-xl font-medium text-orange-300">Vos informations</h3>
                <div class="space-y-2">
                    <div class="flex items-center space-x-2">
                        <v-icon icon="mdi-account" class="text-blue-300"></v-icon>
                        <p class="text-sm ">
                            <span class="">Nom complet:</span>
                            {{ newUser.firstname }} {{ newUser.lastname }}
                        </p>
                    </div>
                    <div class="flex items-center space-x-2">
                        <v-icon icon="mdi-email" class="text-blue-300"></v-icon>
                        <p class="text-sm ">
                            <span class="">Email:</span>
                            {{ newUser.email }}
                        </p>
                    </div>
                </div>
            </div>

            <!-- Informations groupe -->
            <template v-if="(dataGroup.haveAgroup) || (!dataGroup.haveAgroup && dataGroup.groupName)">
                <div class="space-y-4">
                    <h3 class="text-xl font-medium text-orange-300">
                        {{ dataGroup.haveAgroup ? 'Groupe à rejoindre' : 'Groupe à créer' }}
                    </h3>

                    <div v-if="!dataGroup.haveAGroup" class="space-y-2">
                        <div class="flex items-center space-x-2">
                            <v-icon icon="mdi-account-group" class="text-blue-300"></v-icon>
                            <p class="text-sm ">
                                <span class="">Nom du groupe:</span>
                                {{ dataGroup.groupName }}
                            </p>
                        </div>
                        <div class="flex items-center space-x-2">
                            <v-icon icon="mdi-shape" class="text-blue-300"></v-icon>
                            <p class="text-sm ">
                                <span class="">Type:</span>
                                {{ dataGroup.groupType }}
                            </p>
                        </div>
                    </div>
                </div>
            </template>

            <!-- Bouton de confirmation -->
            <div class="flex justify-center py-3">
                <v-btn @click="register" class="px-8 py-2  bg-gradient-to-r from-orange-400 via-gray-400 to-slate-400 
                text-white font-medium rounded-xl transform hover:scale-105 transition-all duration-300">
                    Confirmer l'inscription
                </v-btn>
            </div>
        </v-card>
    </div>
</template>

<script>
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

const toast = useToast()

const register = () => {
    const authStore = useAuthStore();
    authStore.register(props.newUser, props.dataGroup, toast)
}


</script>