<template>
    <v-theme-provider theme="myCustomLightTheme">
        <v-app class="h-screen ">
            <!-- Main Content avec fond dynamique -->
            <v-main class="h-screen p-0 custom-scrollbar">
                <div class=" inset-0 w-full h-full">
                    <!-- Background avec overlay -->
                    <div class=" fixed inset-0 w-full h-full">
                        <img class="w-full h-full object-cover blur-sm transform scale-105 animate-subtle-zoom"
                            src="~/assets/bg-tree.jpg" alt="Background" />
                    </div>

                    <!-- Déplacer l'App Bar à l'intérieur du main pour qu'il soit au-dessus du background -->
                    <v-app-bar color="fixed transparent" class="border-b  border-white/10 backdrop-blur-md bg-white/5"
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
                                            <v-list-item to="/MyGroups"
                                                class="hover:bg-white/10 transition-colors duration-300">
                                                <v-list-item-title class="flex items-center">
                                                    <v-icon left class="mr-2">mdi-account-group</v-icon>
                                                    Mes groupes
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
                    <div class="relative z-10 pt-[64px]">
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
.custom-scrollbar {
    scrollbar-width: thin !important;
    scrollbar-color: #d70a0a transparent !important;
    overflow-y: visible !important;
}

.custom-scrollbar::-webkit-scrollbar {
    width: 6px !important;
    height: 6px !important;
}

.custom-scrollbar::-webkit-scrollbar-track {
    background: transparent !important;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
    background-color: rgba(255, 255, 255, 0.3) !important;
    border-radius: 20px !important;
    border: none !important;
}

.custom-scrollbar::-webkit-scrollbar-thumb:hover {
    background-color: rgba(255, 255, 255, 0.5) !important;
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
