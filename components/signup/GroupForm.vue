<template>

    <div>
        <h2 class="text-lg">Voulez-vous créer un nouveau groupe ou rejoindre un groupe à partir d'un code d'invitation?
        </h2>
        <p class="text-sm italic">vous pouvez passer cette étape</p>

        <v-radio-group class="justify-items-center" inline v-model="haveAgroup">
            <v-radio label="Rejoinde" :value="1"></v-radio>
            <v-radio label="Créer un group" :value="2"></v-radio>
        </v-radio-group>

        <div v-if="haveAgroup === 1">
            <<v-card>

                <h2 class="text-lg">Rejoindre un groupe </h2>
                <v-text-field rounded elevated variant="solo-filled" label="Entrez de code d'invitation"></v-text-field>
                </v-card>

        </div>
        <div v-else-if="haveAgroup === 2">
            <SignupNewGroupForm></SignupNewGroupForm>
        </div>
    </div>

</template>

<script>
export default {
    data: () => ({
        haveAgroup: 0,
    }),
};
</script>
