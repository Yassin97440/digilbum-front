<template>

    <v-card class="bg-transparent backdrop-blur-md border border-zinc-400 rounded-xl text-white">
        <v-card-title>
            <h1>Créer un groupe</h1>
        </v-card-title>
        <v-card-item>
            <v-text-field v-model="groupName" label="Nom de votre Groupe" variant="outlined" density="comfortable"
                required maxlength="15" prepend-icon="mdi-account-group"
                :rules="[v => v.length >= 3 && v.length <= 15 || 'Le nom du groupe doit contenir entre 3 et 15 caractères']"></v-text-field>

            <v-combobox v-model="groupType" label="Quelle type de groupe voulez-vous créer?"
                :items="['Famille', 'Amis', 'Entreprise',]" prepend-icon="mdi-shape" variant="outlined"
                density="comfortable"></v-combobox>
        </v-card-item>
        <v-card-actions>
            <v-btn color="primary" @click="createGroup">Créer</v-btn>
        </v-card-actions>
    </v-card>
</template>

<script>

export default {
    data: () => ({
        groupName: "",
        groupType: ""
    }),
    computed: {

    },
    watch: {

    },
    methods: {
        createGroup() {
            this.$emit('create-group', { groupName: this.groupName, groupType: this.groupType })
        }
    },
};
</script>