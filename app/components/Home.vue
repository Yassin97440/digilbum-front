<template>
    <div class="min-h-screen w-full flex flex-col items-center px-6 py-8">
        <h1 class="text-4xl font-bold mb-12 text-center bg-gradient-to-r from-orange-400/100 via-gray-400/90 to-slate-400/90 
                                bg-clip-text text-transparent pb-2">
            Bienvenue sur votre album digital
        </h1>

        <div class="w-full max-w-7xl grid grid-cols-1 md:grid-cols-2 gap-8 px-4">
            <!-- Carte Créer un événement -->
            <v-card class="relative overflow-hidden bg-white/10 backdrop-blur-md border border-white/20 
                       shadow-2xl rounded-2xl transform transition-all duration-500 hover:scale-102
                       hover:shadow-lg hover:border-white/30 group" elevation="0" to="/NewAlbum">
                <div class="absolute inset-0 bg-gradient-to-br from-orange-400/5 to-pink-500/10 
                          group-hover:opacity-75 transition-opacity duration-500"></div>

                <h2 class="absolute top-6 left-6 text-2xl font-semibold text-white/90 z-10">
                    Créer un évènement/album
                </h2>

                <div class="relative aspect-[4/3] overflow-hidden">
                    <img src="~/assets/add-events-pic-card.jpg" class="w-full h-full object-cover transform transition-transform duration-700
                               group-hover:scale-110" alt="Créer un événement" />
                    <div class="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                </div>
            </v-card>

            <!-- Carte Visionner -->
            <v-card class="relative overflow-hidden bg-white/10 backdrop-blur-md border border-white/20 
                       shadow-2xl rounded-2xl transform transition-all duration-500 hover:scale-102
                       hover:shadow-lg hover:border-white/30 group" elevation="0" to="/ShowAlbums">
                <div class="absolute inset-0 bg-gradient-to-br from-blue-400/5 to-purple-500/10 
                          group-hover:opacity-75 transition-opacity duration-500"></div>

                <h2 class="absolute top-6 left-6 text-2xl font-semibold text-white/90 z-10">
                    Visionner
                </h2>

                <div class="relative aspect-[4/3] overflow-hidden">
                    <img src="~/assets/show-events-pic-card.jpg" class="w-full h-full object-cover transform transition-transform duration-700
                               group-hover:scale-110" alt="Visionner les albums" />
                    <div class="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                </div>
            </v-card>
        </div>
    </div>
</template>
<script>
</script>