<template>


    <div class="flex justify-center ">

        <v-card class="  rounded-lg min-w-80">

            <v-container>
                <v-row class=" p-0">
                    <v-text-field variant="solo-filled" v-model="firstName" label="Nom de votre Groupe" rounded outlined
                        clearable required></v-text-field>
                </v-row>
                <v-row class="p-0">
                    <v-combobox clearable label="Quelle type de groupe voulez-vous créer?"
                        :items="['Famille', 'Amis', 'Entreprise',]" variant="solo-filled"></v-combobox>
                </v-row>


            </v-container>
        </v-card>
    </div>

</template>

<script></script>