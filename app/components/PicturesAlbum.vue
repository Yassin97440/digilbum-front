<script setup>
// definePageMeta({
//     middleware: ["auth"]
//     // or middleware: 'auth'
// })
</script>

<template>
    <div class="carousel-container">
        <v-carousel class="h-full" show-arrows="hover" hide-delimiters>
            <v-carousel-item v-for="(picture, i) in pictures" :key="i">
                <div class="image-container">
                    <img :src="picture.pathFile" :alt="'Image ' + (i + 1)" class="carousel-image">
                </div>
            </v-carousel-item>
        </v-carousel>
    </div>
</template>

<script>
export default {
    props: { pictures: Array },
};
</script>

<style scoped>
.carousel-container {
    height: calc(100vh - 64px);
    /* Hauteur totale moins la hauteur de la toolbar */
    width: 100%;
}


.image-container {
    height: 100%;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 16px;
}

.carousel-image {
    max-height: 100%;
    max-width: 100%;
    object-fit: contain;
    object-position: center;
}
</style>
