<template>
    <v-app dark>
        <v-navigation-drawer v-model="drawer" :mini-variant="miniVariant" :clipped="clipped" fixed app>
            <v-list>
                <v-list-item v-for="(item, i) in items" :key="i" :to="item.to" router exact>
                    <v-list-item-action>
                        <v-icon>{{ item.icon }}</v-icon>
                    </v-list-item-action>
                    <v-list-item-title>{{ item.title }}</v-list-item-title>
                </v-list-item>
            </v-list>
            <v-btn rounded="xl" class="bottom" @click="logout"> Déconnexion</v-btn>
        </v-navigation-drawer>
        <v-app-bar :clipped-left="clipped" fixed app>
            <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
            <v-btn icon @click.stop="miniVariant = !miniVariant">
                <v-icon>mdi-{{ `chevron-${miniVariant ? "right" : "left"}` }}</v-icon>
            </v-btn>
            <v-toolbar-title>{{ title }}</v-toolbar-title>
            <v-spacer />
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
</template>

<script>
import { useAuthStore } from "~~/stores/AuthStore";

import { mapActions } from "pinia";
export default {
    name: "DefaultLayout",
    data() {
        return {
            clipped: false,
            drawer: false,
            fixed: false,
            items: [

                {
                    icon: "mdi-home",
                    title: "Acceuil",
                    to: "/showAlbums",
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
                // {
                //   icon: "fa-regular fa-images",
                //   title: "Création de compe",
                //   to: "/Inscription",
                // },
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
