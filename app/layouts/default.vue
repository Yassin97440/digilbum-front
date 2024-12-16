<template>
    <v-theme-provider theme="myCustomLightTheme">
        <v-app class="">
            <!-- App Bar avec effet glassmorphism -->
            <v-app-bar color="transparent" class="border-b border-white/10 backdrop-blur-md bg-white/5" elevation="0"
                prominent>
                <div class="w-full max-w-7xl mx-auto px-4 flex items-center">
                    <!-- Logo et titre -->
                    <v-toolbar-title class="flex items-center">
                        <div class="relative group">
                            <h1 class="text-3xl font-bold bg-gradient-to-r from-orange-400 via-pink-500 to-blue-600 
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
                        <v-btn class="bg-white/5 hover:bg-white/10 transition-colors duration-300" elevation="0">
                            <v-icon>mdi-account</v-icon>
                            <v-menu activator="parent">
                                <v-list class="bg-white/10 backdrop-blur-md border border-white/20">
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

            <!-- Main Content avec fond dynamique -->
            <v-main class="overflow-hidden">
                <div class="relative w-full h-full">
                    <!-- Background avec overlay -->
                    <div class="absolute inset-0 z-0">
                        <div
                            class="absolute inset-0 bg-gradient-to-br from-orange-400/20 via-transparent to-blue-600/20 mix-blend-overlay">
                        </div>
                        <img class="w-full h-full object-cover blur-md transform scale-105 animate-subtle-zoom"
                            src="~/assets/bg-tree.jpg" alt="Background" />
                    </div>

                    <!-- Contenu principal -->
                    <div class="relative z-10 min-h-screen">
                        <slot />
                    </div>
                </div>
            </v-main>
        </v-app>
    </v-theme-provider>
</template>

<style scoped>
.animate-subtle-zoom {
    animation: subtle-zoom 20s ease-in-out infinite;
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
import { useAuthStore } from "~~/stores/AuthStore";

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
            miniVariant: false,
            right: true,
            rightDrawer: false,
            title: "Album digital by Abdulla",
        };
    },
    methods: {
        ...mapActions(useAuthStore, ["logout"]),
        logout() {
            this.logout()
        },
    }
};
</script>
