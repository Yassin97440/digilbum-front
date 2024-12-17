<template>
    <v-theme-provider theme="myCustomLightTheme">
        <v-app class="h-screen">
            <!-- Main Content avec fond dynamique -->
            <v-main class="h-screen overflow-hidden p-0">
                <div class="fixed inset-0 w-full h-full">
                    <!-- Background avec overlay -->
                    <div class="absolute inset-0 w-full h-full">
                        <div
                            class="absolute inset-0 bg-gradient-to-br from-orange-400/20 via-transparent to-blue-600/20 mix-blend-overlay">
                        </div>
                        <img class="w-full h-full object-cover blur-sm transform scale-105 animate-subtle-zoom"
                            src="~/assets/bg-tree.jpg" alt="Background" />
                    </div>

                    <!-- Déplacer l'App Bar à l'intérieur du main pour qu'il soit au-dessus du background -->
                    <v-app-bar color="transparent" class="border-b border-white/10 backdrop-blur-md bg-white/5"
                        elevation="0" prominent>
                        <div class="w-full max-w-7xl mx-auto px-4 flex items-center">
                            <!-- Logo et titre -->
                            <v-toolbar-title class="flex items-center">
                                <div class="relative group">
                                    <h1
                                        class="text-3xl font-bold bg-gradient-to-r from-orange-400 via-pink-500 to-blue-600 
                                             bg-clip-text text-transparent transform transition-transform duration-300">
                                        Digilbum
                                    </h1>
                                </div>
                            </v-toolbar-title>

                            <v-spacer></v-spacer>

                            <!-- Navigation Items -->
                            <div class="flex items-center gap-4">
                                <v-btn v-for="item in items" :key="item.to" :to="item.to" :icon="item.icon"
                                    class="bg-white/5 hover:bg-white/10 transition-colors duration-300" elevation="0">
                                </v-btn>

                                <!-- Menu utilisateur -->
                                <v-btn class="bg-white/5 hover:bg-white/10 transition-colors duration-300"
                                    elevation="0">
                                    <v-icon>mdi-account</v-icon>
                                    <v-menu activator="parent">
                                        <v-list class="bg-white/10 backdrop-blur-md border border-white/20">
                                            <v-list-item to="/my-albums"
                                                class="hover:bg-white/10 transition-colors duration-300">
                                                <v-list-item-title class="flex items-center">
                                                    <v-icon left class="mr-2">mdi-image-album</v-icon>
                                                    Mes albums
                                                </v-list-item-title>
                                            </v-list-item>
                                            <v-list-item to="/my-events"
                                                class="hover:bg-white/10 transition-colors duration-300">
                                                <v-list-item-title class="flex items-center">
                                                    <v-icon left class="mr-2">mdi-calendar-star</v-icon>
                                                    Mes événements
                                                </v-list-item-title>
                                            </v-list-item>
                                            <v-list-item @click="logout()"
                                                class="hover:bg-white/10 transition-colors duration-300">
                                                <v-list-item-title class="">
                                                    Déconnexion
                                                </v-list-item-title>
                                            </v-list-item>
                                        </v-list>
                                    </v-menu>
                                </v-btn>
                            </div>
                        </div>
                    </v-app-bar>

                    <!-- Contenu principal -->
                    <div class="relative h-full z-10 pt-[64px]">
                        <slot />
                    </div>
                </div>
            </v-main>
        </v-app>
    </v-theme-provider>
</template>

<style scoped>
/* Ajout de styles globaux */
html,
body {
    margin: 0;
    padding: 0;
    height: 100vh;
    overflow: hidden;
}

.v-application {
    height: 100vh !important;
    min-height: 100vh !important;
}

/* Suppression de l'animation subtle-zoom qui peut causer des problèmes d'affichage */
.animate-subtle-zoom {
    animation: none;
}

/* Ajout d'un style pour s'assurer que le main prend toute la hauteur sans padding */
.v-main {
    padding-top: 0 !important;
}

@keyframes subtle-zoom {
    0% {
        transform: scale(1.05);
    }

    50% {
        transform: scale(1.1);
    }

    100% {
        transform: scale(1.05);
    }
}
</style>
<script>
import decodeToken from "../tools/token/decodeToken";
import { useAuthStore } from "../stores/AuthStore";
import { mapActions } from "pinia";
export default {
    name: "DefaultLayout",
    data() {
        return {
            clipped: false,
            drawer: true,
            fixed: false,
            items: [

                {
                    icon: "mdi-home",
                    title: "Acceuil",
                    to: "/",
                },
                {
                    icon: "mdi-plus",
                    title: "Ajouter un album",
                    to: "/NewAlbum",
                },
                {
                    icon: "mdi-panorama-variant-outline",
                    title: "Visionner un album",
                    to: "/showAlbums",
                },

            ],
            title: "Album digital by Abdulla",
            userData: {},
        };
    },
    methods: {
        logout() {
            const authStore = useAuthStore();
            authStore.logout();
        },
        async getUserData() {
            const payload = await decodeToken();
            if (payload) {
                this.userData = {
                    firstname: payload.firstname,
                    lastname: payload.lastname,
                    email: payload.email,
                };
            }
        }
    },
    async mounted() {
        await this.getUserData();
    }
};
</script>
