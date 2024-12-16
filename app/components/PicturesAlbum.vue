<script setup>
// definePageMeta({
//     middleware: ["auth"]
//     // or middleware: 'auth'
// })
</script >

<template>
    <v-container class="max-h-full inline-block">
        <v-carousel class="max-h-full" style="height: 100%;" show-arrows="hover" hide-delimiters>
            <v-carousel-item class="" v-for="(picture, i) in pictures" :key="i" :src="picture.pathFile"></v-carousel-item>
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
