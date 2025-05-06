// https://nuxt.com/docs/api/configuration/nuxt-config
import { defineNuxtConfig } from 'nuxt/config'

import fs from 'fs'

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
        transpile: ['vuetify', 'vue-toastification', 'nuxt-primevue'],
    },

    modules: ['@pinia/nuxt', 'vuetify-nuxt-module', '@nuxtjs/tailwindcss', '@vueuse/nuxt', '@primevue/nuxt-module'],

    vuetify: {
        moduleOptions: {
            styles: true,
        },
        vuetifyOptions: {

        }
    },
    primevue: {
        options: {
            theme: 'none'
        },
        components: {
            exclude: ['Form', 'FormField', 'FormGroup', 'Validators',  'Editor', 'Chart']
        }
    },

    devtools: {
        enabled: true,
    },

    compatibilityDate: '2024-12-16',

    runtimeConfig: {
        public: {
            jwtSecretKey: process.env.JWT_SECRET_KEY,
            apiBaseUrl: process.env.API_BASE_URL || 'localhost:8080'
        }
    },


    devServer: {
        https: {
            key: process.env.SSL_KEY_PATH ? fs.readFileSync(process.env.SSL_KEY_PATH, 'utf-8') : undefined,
            cert: process.env.SSL_CERT_PATH ? fs.readFileSync(process.env.SSL_CERT_PATH, 'utf-8') : undefined
        }
    },

})