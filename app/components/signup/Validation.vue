<template>

    <div>
        <h2 class="text-lg">Confirmation des informations
        </h2>


        <v-card>

            <h2 class="text-lg">Vos informations </h2>
            <p>Prénom : {{ newUser.firstName }}</p>
            <p>Nom : {{ newUser.lastName }}</p>
            <p>adresse mail : {{ newUser.email }}</p>

            <v-card v-if="dataGroup.haveAGroup">

                <h2 class="text-lg">Tu vas rejoindre ce groupe </h2>
                <p>Prénom : {{ newUser.firstName }}</p>
                <p>Nom : {{ newUser.lastName }}</p>
                <p>adresse mail : {{ newUser.email }}</p>
            </v-card>
            <v-card v-if="!dataGroup.haveAGroup">
                <h2 class="text-lg">Tu vas créer ce groupe </h2>
                <p>Nom du groupe : {{ dataGroup.name }}</p>
                <p>Type de groupe : {{ dataGroup.type }}</p>
            </v-card>

        </v-card>
        <v-card-actions>
            <v-btn text="CONFIRMER" @click="test" </v-btn>
        </v-card-actions>
    </div>

</template>

<script>
import { mapActions } from "pinia";
import { useAuthStore } from "~~/stores/AuthStore";
export default {

    data: () => ({
    }),
    computed: {
    },
    watch: {
        'dataGroup': function () {
            this.test()
        },
    },
    methods: {
        ...mapActions(useAuthStore, ['register']),
        test() {
            this.register(this.newUser, this.dataGroup)
            console.log("dede", this.newUser, this.dataGroup)
        }

    },
};

</script>

<script setup>
const props = defineProps({
    newUser: {
        type: Object,
    },
    dataGroup: {
        type: Object,
    }
})
</script>