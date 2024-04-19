<template>
    <v-theme-provider theme="myCustomLightTheme">
        <v-app>
            <v-app-bar color="primary" prominent>
                <v-toolbar-title>Digilbum </v-toolbar-title>
                <v-btn v-for="item in items" :icon="item.icon" :to="item.to"></v-btn>
                <v-btn>
                    <v-icon>mdi-account</v-icon>
                    <v-menu activator="parent">
                        <v-list>
                            <v-list-item @click="logout()">
                                <v-list-item-title>Déconnexion</v-list-item-title>
                            </v-list-item>
                        </v-list>
                    </v-menu>
                </v-btn>

            </v-app-bar>

            <v-main>
                <v-container>
                    <slot />
                </v-container>
            </v-main>

            <v-footer :absolute="!fixed" app>
                <span>&copy; {{ new Date().getFullYear() }}</span>
            </v-footer>
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
