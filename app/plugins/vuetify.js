import { createApp } from 'vue'
import { createVuetify } from 'vuetify'
import { aliases, mdi } from 'vuetify/iconsets/mdi'

export default defineNuxtPlugin(nuxtApp => {
    const vuetify = createVuetify({
        ssr: false,
        theme: {
            defaultTheme: 'myCustomLightTheme',
            themes: {
                myCustomLightTheme,
            },
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

const myCustomLightTheme = {
    dark: false,
    colors: {
        background: '#f0f4ea',
        surface: '#FFEFE2',
        primary: '#F4F0E2',
        secondary: '#34512f',
        'surface-bright': '#FFFFFF',
        'surface-light': '#EEEEEE',
        'surface-variant': '#ef0000',
        'on-surface-variant': '#EEEEEE',
        'primary-darken-1': '#1F5592',
        'secondary-darken-1': '#018786',
        error: '#B00020',
        info: '#2196F3',
        success: '#4CAF50',
        warning: '#FB8C00',
    },
    // variables: {
    //     'border-color': '#000000',
    //     'border-opacity': 0.12,
    //     'high-emphasis-opacity': 0.87,
    //     'medium-emphasis-opacity': 0.60,
    //     'disabled-opacity': 0.38,
    //     'idle-opacity': 0.04,
    //     'hover-opacity': 0.04,
    //     'focus-opacity': 0.12,
    //     'selected-opacity': 0.08,
    //     'activated-opacity': 0.12,
    //     'pressed-opacity': 0.12,
    //     'dragged-opacity': 0.08,
    //     'theme-kbd': '#212529',
    //     'theme-on-kbd': '#FFFFFF',
    //     'theme-code': '#F5F5F5',
    //     'theme-on-code': '#000000',
    // }
}

