import { createApp } from 'vue'
import { createVuetify } from 'vuetify'
import { aliases, mdi } from 'vuetify/iconsets/mdi'


export default defineNuxtPlugin(nuxtApp => {
    const vuetify = createVuetify({
        ssr: false,
        theme: {
            defaultTheme: 'dark'
        },
        icons: {
            defaultSet: 'mdi',
            aliases,
            sets: {
                mdi,
            },
        },
    })
    nuxtApp.vueApp.use(vuetify)
})