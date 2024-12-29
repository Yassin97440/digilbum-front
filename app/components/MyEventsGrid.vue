<template>
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        <v-card v-for="event in events" :key="event.id" class="relative overflow-hidden bg-transparent backdrop-blur-3xl rounded-2xl  
                shadow-2xl text-white ">

            <v-card-item class="relative z-10">
                <h3 class="text-xl font-semibold mb-2">{{ event.name }}</h3>
                <p class="text-sm opacity-70">
                    {{ formatDate(event.startedAt) }} - {{ formatDate(event.endedAt) }}
                </p>
                <p class="text-sm mt-2">{{ event.description }}</p>

                <div class="mt-4 flex justify-between items-center">
                    <v-btn color="primary" variant="text" @click="$emit('view', event)">
                        Voir l'événement
                    </v-btn>
                    <v-btn icon=" mdi-dots-horizontal" variant="text" @click="$emit('edit', event)"></v-btn>
                </div>
            </v-card-item>
        </v-card>
    </div>
</template>

<script setup>
const props = defineProps({
    events: {
        type: Array,
        required: true
    }
})

const emit = defineEmits(['view', 'edit'])

const formatDate = (date) => {
    return new Date(date).toLocaleDateString('fr-FR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    })
}
</script>