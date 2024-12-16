// https://nuxt.com/docs/api/configuration/nuxt-config
import { defineNuxtConfig } from 'nuxt/config'

export default defineNuxtConfig({
    future: {
        compatibilityVersion: 4,
    },

    ssr: false,
    css: ['~/assets/css/main.css'],

    postcss: {
        plugins: {
            'postcss-import': {},
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
        '@nuxtjs/tailwindcss',
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

    compatibilityDate: '2024-12-16',
})