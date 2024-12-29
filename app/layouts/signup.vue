<template>
    <v-theme-provider theme="myCustomLightTheme">
        <v-app>

            <!-- Main Content -->
            <v-main class="h-screen p-0">
                <!-- Background avec effet parallaxe et overlay -->
                <div class="inset-0  w-full h-full">
                    <!-- Image de fond avec overlay gradient -->
                    <div class="fixed inset-0 z-0">
                        <div
                            class="absolute inset-0 bg-gradient-to-br from-orange-400/20 via-transparent to-blue-600/20 mix-blend-overlay">
                        </div>
                        <img class="w-full h-full  object-cover transform scale-105 animate-subtle-zoom"
                            src="~/assets/bg.webp" alt="Background" />
                    </div>

                    <!-- Éléments décoratifs -->
                    <div class="absolute inset-0 overflow-hidden">
                        <div
                            class="absolute top-1/4 left-1/4 w-64 h-64 bg-orange-400/10 rounded-full blur-3xl animate-float-slow">
                        </div>
                        <div
                            class="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl animate-float-medium">
                        </div>
                    </div>

                    <!-- App Bar avec effet glassmorphism -->
                    <v-app-bar color="transparent" class="border-b border-white/10 backdrop-blur-3xl bg-white/5"
                        elevation="0" prominent>
                        <div class="w-full max-w-7xl mx-auto px-4 flex items-center justify-between">


                            <v-spacer></v-spacer>

                            <!-- Boutons de navigation avec animations -->
                            <div class="flex gap-4">
                                <v-btn to="/Login" class="bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20
                                   transition-all duration-300 px-6" elevation="0">
                                    <v-icon left class="mr-2">mdi-login</v-icon>
                                    Connexion
                                </v-btn>

                                <v-btn to="/Signup" class="bg-gradient-to-r from-orange-300 via-gray-400 to-slate-400 hover:opacity-90
                                   transition-all duration-300 px-6" elevation="1">
                                    <v-icon left class="mr-2">mdi-account-plus</v-icon>
                                    Inscription
                                </v-btn>
                            </div>
                        </div>
                    </v-app-bar>

                    <!-- Contenu principal -->
                    <div class="relative z-10 pt-[32px]">
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

.animate-float-slow {
    animation: float 15s ease-in-out infinite;
}

.animate-float-medium {
    animation: float 12s ease-in-out infinite;
}

@keyframes subtle-zoom {
    0% {
        transform: scale(1.05);
    }

    50% {
        transform: scale(1.15);
    }

    100% {
        transform: scale(1.05);
    }
}

@keyframes float {
    0% {
        transform: translateY(0) translateX(0);
    }

    50% {
        transform: translateY(-30px) translateX(20px);
    }

    100% {
        transform: translateY(0) translateX(0);
    }
}
</style>
<script>
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
            miniVariant: false,
            right: true,
            rightDrawer: false,
            title: "Album digital by Abdulla",
        };
    },
    methods: {
        ...mapActions(useAuthStore, ["logout"]),
    }
};
</script>
