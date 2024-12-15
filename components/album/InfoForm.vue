<template>
    <div class="max-w-2xl mx-auto p-6">
        <v-card class="bg-black/30 backdrop-blur-md">
            <v-card-item class="p-8">
                <div class="space-y-6">
                    <div>
                        <label class="text-sm font-semibold block mb-2">
                            Nom de l'album
                        </label>
                        <v-text-field v-model="form.name" placeholder="Ex: Vacances d'été 2024" 
                            variant="outlined" density="comfortable"
                            bg-color="rgb(0 0 0 / 0.2)" @input="emitChanges" />
                    </div>

                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label class="text-sm font-semibold block mb-2">
                                Date de début
                            </label>
                            <v-text-field v-model="form.startDate" type="date" 
                                variant="outlined" @input="emitChanges" />
                        </div>

                        <div>
                            <label class="text-sm font-semibold block mb-2">
                                Date de fin
                            </label>
                            <v-text-field v-model="form.endDate" type="date" 
                                variant="outlined" @input="emitChanges" />
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
        form: {
            name: '',
            startDate: '',
            endDate: ''
        }
    }),

    methods: {
        emitChanges() {
            this.$emit('info-changed', { ...this.form });
        }
    }
};
</script> 