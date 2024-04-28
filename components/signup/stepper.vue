<template>
    <v-container>

        <v-stepper :items="['Step 1', 'Step 2', 'Step 3']" v-model="e1" next-text="Suiivant" prev-text="Précèdent">


            <template v-slot:item.1>
                <!-- <SignupNewUserFormulaire class=" inset-x-0 top-0"></SignupNewUserFormulaire> -->
                <div class="flex justify-center h">

                    <v-card class="  rounded-lg min-w-80">

                        <v-container>
                            <v-row class=" p-0">
                                <v-text-field v-model="newUser.firstName" variant="solo-filled" label="Prénom" rounded
                                    outlined clearable required></v-text-field>
                            </v-row>
                            <v-row class="p-0">
                                <v-text-field v-model="newUser.lastName" variant="solo-filled" label="Nom" rounded
                                    outlined clearable required></v-text-field>
                            </v-row>
                            <v-row class="p-0">
                                <v-text-field v-model="newUser.email" variant="solo-filled" label="Adresse email"
                                    rounded outlined clearable required></v-text-field>
                            </v-row>
                            <v-row class="p-0 ">
                                <v-text-field v-model="newUser.password" variant="solo-filled"
                                    :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                                    :rules="[rules.required, rules.min]" :type="show1 ? 'text' : 'password'"
                                    name="input-10-1" label="Entrez votre mot de passe"
                                    hint="👮 Il faut moins 8 caractères 👮" counter
                                    @click:append="show1 = !show1"></v-text-field> </v-row>
                            <v-row class="p-0">
                                <v-text-field v-model="newUser.passwordCheck" variant="solo-filled"
                                    :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                                    :rules="[rules.required, rules.min]" :type="show1 ? 'text' : 'password'"
                                    name="input-10-1" label="Confirmez votre mot de passe"
                                    hint="valideDoublePasswordAt: 'least 8 characters'? ''" counter
                                    @click:append="show1 = !show1"></v-text-field>
                            </v-row>
                        </v-container>
                    </v-card>
                </div>
            </template>

            <template v-slot:item.2>
                <SignupGroupForm></SignupGroupForm>
            </template>

            <template v-slot:item.3>
                <v-card title="Step Three" flat>...</v-card>
            </template>

        </v-stepper>
    </v-container>
</template>
<script setup>


</script>
<script>
import { useAuthStore } from "~~/stores/AuthStore";

import { mapActions } from "pinia";

export default {
    data: () => ({
        e1: 1,
        newUser: {
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            passwordCheck: "",
        },
        show1: false,
        show2: true,
        rules: {
            required: (value) => !!value || "Required.",
            min: (v) => v.length >= 8 || "Min 8 characters",
            emailMatch: () => `The email and password you entered don't match`,
        },
    }),
    computed: {
        passwording() {
            return this.password == this.passwordCheck;
        },
    },
    watch: {
        'newUser.firstName': function (newFirstName) {
            console.log(`First name changed to ${newFirstName}`);
            // this.updateNewFirstName(newFirstName)
            this.test()
            // console.log(this.user);
        },
    },
    methods: {
        ...mapActions(useAuthStore, ["register, updateNewFirstName"]),
        valideDoublePassword() {
            return this.passwording
        },
        test(newfield) {
            // this.updateNewFirstName(newfield)
            this.register({
                firstName: this.firstName,
                lastName: this.lastName,
                password: this.password,
                email: this.email,
            });
        },



        nextStep(item) {
            const itemo = item
            console.log("🚀 ~ nextStep ~ onClick:", this)
            // Votre logique personnalisée ici
            // Passez à l'étape suivante
        },
    },
};
</script>