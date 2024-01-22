<script setup>
// definePageMeta({
//     middleware: ["auth"]
//     // or middleware: 'auth'
// })
</script >

<template>
    <v-container>
        <v-carousel show-arrows="hover" hide-delimiters>
            <v-carousel-item v-for="(picture, i) in pictures" :key="i" :src="picture.pathFile"
                height="500px"></v-carousel-item>

        </v-carousel>
    </v-container>
</template>

<script>
export default {

    props: { pictures: Array },
    data() {
        return {
        };
    },
    methods: {
    },
};
</script>
