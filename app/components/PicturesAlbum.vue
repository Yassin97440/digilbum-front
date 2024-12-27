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

/* Style personnalisé pour les contrôles du carousel */
:deep(.v-carousel__controls) {
    background: transparent !important;
}

:deep(.v-btn--icon.v-btn--density-default) {
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(4px);
    transition: background-color 0.3s ease;
}

:deep(.v-btn--icon.v-btn--density-default:hover) {
    background: rgba(255, 255, 255, 0.2);
}
</style>
