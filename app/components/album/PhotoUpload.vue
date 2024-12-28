<template>
    <div class="max-w-2xl mx-auto p-6">
        <v-card class="bg-transparent border border-stone-700 shadow-lg rounded-xl">
            <v-card-item class="p-8">
                <div class="space-y-6">
                    <!-- Zone de drop -->
                    <div class="border-2 border-dashed border-gray-500 rounded-lg p-8 text-center"
                        :class="{ 'border-primary': isDragging }" @dragenter.prevent="isDragging = true"
                        @dragleave.prevent="isDragging = false" @dragover.prevent @drop.prevent="handleDrop">
                        <v-icon size="48" class="mb-4">mdi-cloud-upload</v-icon>
                        <h3 class="text-lg font-semibold mb-2">
                            Déposez vos photos ici
                        </h3>
                        <p class="text-sm opacity-70 mb-4">
                            ou
                        </p>
                        <v-file-input v-model="files" multiple accept="image/*" hide-details density="comfortable"
                            variant="outlined" @change="handleFileSelect">
                            <template v-slot:selection="{ fileNames }">
                                <template v-for="(fileName, index) in fileNames" :key="fileName">
                                    <v-chip v-if="index < 2" size="small" label color="primary" class="mr-2">
                                        {{ fileName }}
                                    </v-chip>
                                    <span v-else-if="index === 2" class="text-grey text-caption">
                                        +{{ fileNames.length - 2 }} fichiers
                                    </span>
                                </template>
                            </template>
                        </v-file-input>
                    </div>

                    <!-- Prévisualisation -->
                    <div v-if="previewUrls.length" class="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div v-for="(url, index) in previewUrls" :key="index" class="relative group">
                            <img :src="url" class="w-full h-32 object-cover rounded-lg" />
                            <button @click="removeFile(index)" class="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1
                                       opacity-0 group-hover:opacity-100 transition-opacity">
                                <v-icon size="small">mdi-close</v-icon>
                            </button>
                        </div>
                    </div>
                </div>
            </v-card-item>
        </v-card>
    </div>
</template>

<script>
export default {
    data: () => ({
        files: [],
        previewUrls: [],
        isDragging: false
    }),

    methods: {
        handleFileSelect(files) {
            this.addFiles(files);
        },

        handleDrop(event) {
            this.isDragging = false;
            const files = Array.from(event.dataTransfer.files);
            this.addFiles(files);
        },

        addFiles(files) {
            if (!files) return;

            // Filtrer pour n'accepter que les images
            const imageFiles = Array.from(files).filter(file =>
                file.type.startsWith('image/')
            );

            this.files = [...this.files, ...imageFiles];

            // Créer les URLs de prévisualisation
            imageFiles.forEach(file => {
                const reader = new FileReader();
                reader.onload = (e) => {
                    this.previewUrls.push(e.target.result);
                };
                reader.readAsDataURL(file);
            });

            this.$emit('photos-selected', this.files);
        },

        removeFile(index) {
            this.files.splice(index, 1);
            this.previewUrls.splice(index, 1);
            this.$emit('photos-selected', this.files);
        }
    }
};
</script>