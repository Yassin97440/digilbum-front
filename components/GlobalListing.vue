<template>
    <v-tabs v-model="tab" bg-color="primary">
        <v-tab value="one">TOUS</v-tab>
        <v-tab value="two">Ajoutés récemment</v-tab>
        <v-tab value="three">Mes favoris</v-tab>
    </v-tabs>

    <v-card-text>
        <v-window v-model="tab">
            <v-window-item value="one">
                <v-container>

                    <AlbumListing :albums></AlbumListing>
                </v-container>
            </v-window-item>

            <v-window-item value="two">
                Comming soon
            </v-window-item>

            <v-window-item value="three">
                Comming soon
            </v-window-item>
        </v-window>
    </v-card-text>
</template>
<script>
export default {
    props: { albums: Array },

    data: () => ({
        tab: null,
    }),
}
</script>