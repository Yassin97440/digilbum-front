/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "~/components/**/*.{js,vue,ts}",
        "~/layouts/**/*.vue",
        "~/pages/**/*.vue",
        "~/plugins/**/*.{js,ts}",
        "~/app.vue",
        "~/error.vue",
        "./node_modules/vuetify/**/*.{js,ts,vue}", // Ajoutez cette ligne pour Vuetify

    ],
    theme: {
        extend: {},
    },
    plugins: [],
    important: true,
}