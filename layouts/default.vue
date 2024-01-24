<template>
    <v-theme-provider theme="myCustomLightTheme">
        <v-app>
            <v-navigation-drawer expand-on-hover rail permanent="true">
                <v-list>
                    <v-list-item v-for="(item, i) in items" :key="i" :to="item.to" :prepend-icon="item.icon"
                        :title="item.title" router exact>
                    </v-list-item>
                </v-list>
                <div class="px-2 absolute inset-x-0 bottom-3">
                    <v-list>
                        <v-list-item class="hover:bg-stone-400" to="/Login" prepend-icon="mdi-logout" title="Déconnexion"
                            rounded="xl" @click="logout" router exact></v-list-item>
                    </v-list>
                    <!-- <v-btn block>
                      Logout
                    </v-btn> -->
                </div>

            </v-navigation-drawer>

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
