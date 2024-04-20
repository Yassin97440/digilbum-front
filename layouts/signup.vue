<template>
    <v-theme-provider theme="myCustomLightTheme">
        <v-app>

            <v-app-bar color="primary" class="flex justify-center" prominent>
                <v-toolbar-title>Digilbum </v-toolbar-title>

                <v-btn icon to="/Login">
                    <v-icon>mdi-login</v-icon>
                </v-btn>

                <v-btn icon to="/Signup">
                    <v-icon>mdi-account-plus</v-icon>
                </v-btn>
            </v-app-bar>

            <v-main>
                <div class="relative w-full h-full ">
                    <div class="absolute inset-0 z-0">
                        <img class="w-full h-full object-cover blur-lg" src="~/assets/bg-sunshine2000.jpg"
                            alt="Background" />
                    </div>

                    <div class="relative z-10 h-screen">
                        <slot />

                    </div>
                </div>


            </v-main>

        </v-app>
    </v-theme-provider>
</template>

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
    }
};
</script>
