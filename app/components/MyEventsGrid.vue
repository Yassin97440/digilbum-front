<template>
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
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
                    <v-btn variant="text" @click="">
                        <v-icon>mdi-dots-horizontal</v-icon>
                        <v-menu activator="parent">
                            <v-list
                                class="bg-transparent backdrop-blur-3xl border border-zinc-400 text-white rounded-xl">

                                <v-list-item v-for="item in itemsListAction" :key="item.title"
                                    @click="item.action(event)">
                                    <v-list-item-title>{{ item.title }}</v-list-item-title>
                                </v-list-item>

                            </v-list>
                        </v-menu>
                    </v-btn>
                </div>
            </v-card-item>
        </v-card>
    </div>
</template>

<script setup>
import { useEventStore } from '~~/stores/EventStore'

const props = defineProps({
    events: {
        type: Array,
        required: true
    }
})

const eventStore = useEventStore()
const toast = useToast()

const deleteEvent = async (event) => {
    try {
        await eventStore.delete(event)
        useNotify(toast, "success", "Evénement supprimé", "L'événement a été supprimé avec succès", 5000)
    } catch (err) {
        console.error(err)
        useNotify(toast, "error", "Erreur", "Une erreur s'est produite lors de la suppression de l'événement", 5000)
    }
}

const itemsListAction = [
    {
        title: 'Supprimer',
        icon: 'mdi-delete',
        action: deleteEvent
    },
    {
        title: 'Modifier',
        icon: 'mdi-pencil',
        action: (event) => navigateTo(`/event/${event.id}`)
    }

]
const formatDate = (date) => {
    return new Date(date).toLocaleDateString('fr-FR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    })
}
</script>