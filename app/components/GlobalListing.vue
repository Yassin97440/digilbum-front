<template>
    <div class="min-h-screen w-full flex flex-col px-6 py-8">
        <!-- Titre de la section -->


        <!-- Tabs customisés -->
        <v-tabs v-model="tab"
            class="mb-6 bg-white/10 backdrop-blur-3xl rounded-full border border-white/20 overflow-hidden">
            <v-tab v-for="(tabItem, index) in tabItems" :key="index" :value="tabItem.value"
                class="text-white/80 hover:bg-white/10 transition-colors duration-300 rounded-full">
                {{ tabItem.label }}
            </v-tab>
        </v-tabs>

        <!-- Contenu des tabs -->
        <v-card class="w-full bg-gray-500/10 backdrop-blur-3xl border border-white/20 
             shadow-2xl rounded-2xl overflow-hidden" elevation="0">
            <v-card-text>
                <v-window v-model="tab">
                    <v-window-item value="one">
                        <v-container fluid>
                            <AlbumListing :albums="albums"></AlbumListing>
                        </v-container>
                    </v-window-item>

                    <v-window-item value="two">
                        <v-container fluid class="text-center ">
                            <v-card>
                                <v-btn @click="getUser()" color="info">test get event </v-btn>
                            </v-card>
                        </v-container>
                    </v-window-item>

                    <v-window-item value="three">
                        <v-container fluid class="text-center">
                            <div class="flex flex-col items-center justify-center h-64">
                                <v-icon size="large" class="mb-4">mdi-heart-outline</v-icon>
                                <p class="text-xl">Vos albums favoris - Bientôt disponible</p>
                            </div>
                        </v-container>
                    </v-window-item>
                </v-window>
            </v-card-text>
        </v-card>
    </div>
</template>
<script>
export default {
    props: { albums: Array },

    data: () => ({
        tab: null,
    }),
}
</script>
<script setup>
import { ref } from 'vue'
import { useEventStore } from '../stores/EventStore';

const eventStore = useEventStore();

eventStore.fetchForUser();

const getUser = async () => {
    const user = await getUserFromToken();
    console.info(user);
    return user;
}


// State
const tab = ref('one')

// Données de tabs
const tabItems = [
    { label: 'TOUS', value: 'one' },
    { label: 'Ajoutés récemment', value: 'two' },
    { label: 'Mes favoris', value: 'three' }
]


</script>

<style scoped>
/* Styles personnalisés pour les tabs */
:deep(.v-tab.v-tab--selected) {
    /* background-color: rgba(255, 255, 255, 0.2); */
    color: white !important;
}
</style>