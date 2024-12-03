// https://nuxt.com/docs/api/configuration/nuxt-config
import { defineNuxtConfig } from 'nuxt/config'

export default defineNuxtConfig({
    ssr: false,
    css: ['~/assets/css/main.css'],

    postcss: {
        plugins: {
            tailwindcss: {},
            autoprefixer: {},
            'postcss-nesting': {},

        },
    },

    build: {
        transpile: ['vuetify'],
    },

    modules: [
        '@pinia/nuxt',
        'vuetify-nuxt-module',
    ],

    vuetify: {
        moduleOptions: {
            styles: true,
        },
        vuetifyOptions: {
            /* vuetify options */
        }
    },

    devtools: {
        enabled: true,
    },
})