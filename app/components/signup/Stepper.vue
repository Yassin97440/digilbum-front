<template>
    <v-container>

        <v-stepper :items="['Step 1', 'Step 2', 'Step 3']" v-model="e1" next-text="Suiivant" prev-text="Précèdent">
            <template v-slot:item.1>
                <div class="flex justify-center">
                    <v-card class="  rounded-lg min-w-80">
                        <v-form ref="form">
                            <v-text-field v-model="newUser.firstName" :rules="rules.firstName" variant="solo-filled"
                                label="Prénom" rounded outlined clearable required></v-text-field>
                            <v-text-field v-model="newUser.lastName" :rules="rules.lastName" variant="solo-filled"
                                label="Nom" rounded outlined clearable required></v-text-field>
                            <v-text-field v-model="newUser.email" :rules="rules.email" variant="solo-filled"
                                label="Adresse email" rounded outlined clearable required></v-text-field>
                            <v-text-field v-model="newUser.password" :rules="rules.password" variant="solo-filled"
                                :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'" :type="show1 ? 'text' : 'password'"
                                name="input-10-1" label="Entrez votre mot de passe"
                                hint="👮 Il faut moins 8 caractères 👮" counter
                                @click:append="show1 = !show1"></v-text-field>
                            <v-text-field v-model="newUser.passwordCheck" :rules="rules" variant="solo-filled"
                                :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'" :type="show1 ? 'text' : 'password'"
                                name="input-10-1" label="Confirmez votre mot de passe"
                                hint="valideDoublePasswordAt: 'least 8 characters'? ''" counter
                                @click:append="show1 = !show1"></v-text-field>
                        </v-form>
                    </v-card>
                </div>
            </template>

            <template v-slot:item.2>
                <SignupGroupForm @groupDataChanged="groupDataChanged"></SignupGroupForm>
            </template>

            <template v-slot:item.3>
                <SignupValidation :new-user="newUser" :data-group="dataGroup"></SignupValidation>
            </template>

        </v-stepper>
    </v-container>
</template>
<script setup>

const form = ref(null)

const validateForm = () => {
    const isValid = form.value.validate()
    if (isValid) {
        emit('user-data-changed', props.newUser)
    }
    return isValid
}

</script>
<script>
import { useAuthStore } from "../stores/AuthStore";

import { mapActions } from "pinia";
import { useGroupStore } from "../stores/GroupStore";
export default {
    data: () => ({
        e1: 1,
        dataGroup: {},
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
            firstName: [v => !!v || 'Le prénom est requis', (value) => !!value || "Le prénom est requis"],
            lastName: [v => !!v || 'Le nom est requis', (value) => !!value || "Le nom est requis"],
            email: [
                v => !!v || 'L\'email est requis',
                (value) => !!value || "L'email est requis",
                v => /.+@.+\..+/.test(v) || 'L\'email doit être valide'
            ],
            password: [
                v => !!v || 'Le mot de passe est requis',
                (value) => !!value || "Le mot de passe est requis",
                v => v.length >= 8 || 'Le mot de passe doit contenir au moins 8 caractères'
            ]
        },

    }),
    computed: {
    },
    watch: {
        'newUser.firstName': function (newFirstName) {
            console.log(`First name changed to ${newFirstName}`);
            // this.test()
        },
        'e1': function () {
            console.log('this is e1', this.e1)
        },
    },
    methods: {
        ...mapActions(useGroupStore, ["findByJoinCode"]),
        next() {
            if (this.e1 === 1) {
                console.log("register ou koaa", this.newUser)
            }
            if (this.e1 === 2) {
                console.log("newGroup", this.dataGroup)

            }
            if (this.e1 === 3) {

            }
            e1++
        },
        groupDataChanged(newDataGroup) {
            if (newDataGroup.haveAgroup) {
                const group = this.findByJoinCode(newDataGroup.joinCode)
                this.dataGroup.groupName = group.name
                this.dataGroup.groupType = group.type
            }
            this.dataGroup = newDataGroup
        },

    },
};
</script>