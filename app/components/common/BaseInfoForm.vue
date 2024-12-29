<template>
    <div class="max-w-2xl mx-auto p-2 md:p-6">
        <v-card class="bg-white/5 border border-zinc-400 shadow-lg rounded-xl">
            <v-card-item class="p-4 md:p-8 lg:p-8 text-white">
                <div class="space-y-3 md:space-y-4">
                    <!-- Nom -->
                    <div>
                        <label class="text-sm font-semibold block mb-2">
                            {{ labels.name }}
                        </label>
                        <v-text-field v-model="formData.name" :placeholder="placeholder" variant="outlined"
                            density="comfortable" bg-color="" @input="emitChanges" />
                    </div>

                    <!-- Dates -->
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label class="text-sm font-semibold block mb-2">
                                Date de début
                            </label>
                            <v-text-field v-model="formData.startedAt" type="date" variant="outlined"
                                @input="emitChanges" />
                        </div>

                        <div>
                            <label class="text-sm font-semibold block mb-2">
                                Date de fin
                            </label>
                            <v-text-field v-model="formData.endedAt" type="date" variant="outlined"
                                @input="emitChanges" />
                        </div>
                    </div>

                    <!-- Description (optionnelle)
                    <div v-if="withDescription">
                        <label class="text-sm font-semibold block mb-2">
                            Description
                        </label>
                        <v-textarea v-model="formData.description" placeholder="Décrivez votre événement..."
                            variant="outlined" rows="4" @input="emitChanges" />
                    </div> -->
                </div>
            </v-card-item>
        </v-card>
    </div>
</template>

<script>
export default {
    props: {
        labels: {
            type: Object,
            default: () => ({
                name: 'Nom'
            })
        },
        placeholder: {
            type: String,
            default: ''
        },
        withDescription: {
            type: Boolean,
            default: false
        }
    },

    data() {
        return {
            formData: {
                name: '',
                startedAt: '',
                endedAt: '',
                description: ''
            }
        }
    },

    methods: {
        emitChanges() {
            this.$emit('info-changed', { ...this.formData });
        }
    }
}
</script>