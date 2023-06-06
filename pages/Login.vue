<script setup>
definePageMeta({
    middleware: ["auth"]
    // or middleware: 'auth'
})
</script >
<template>
    <v-container>
        <v-form>

            <v-row>
                <v-col>
                    <v-text-field v-model="email" label="email" rounded outlined clearable required></v-text-field>
                </v-col>
            </v-row>
            <v-row>
                <v-col>
                    <v-text-field v-model="password" :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                        :rules="[rules.required, rules.min]" :type="show1 ? 'text' : 'password'" name="input-10-1"
                        label="Entrez votre mot de passe" hint="👮 Il faut moins 8 caractères 👮" counter
                        @click:append="show1 = !show1" required></v-text-field>
                </v-col>
            </v-row>
            <v-row>
                <v-col>
                    <v-btn rounded color="primary" dark @click="login"> Enregister </v-btn>
                </v-col>
            </v-row>
        </v-form>
    </v-container>
</template>
<script>
import { useAuthStore } from "~~/stores/AuthStore";

import { mapActions } from "pinia";
export default {

    data: () => ({
        email: "",
        password: "",
        show1: false,
        rules: {
            required: (value) => !!value || "Required.",
            min: (v) => v.length >= 8 || "Min 8 characters",
            emailMatch: () => `The email and password you entered don't match`,
        },
    }),
    methods: {
        ...mapActions(useAuthStore, ["login"]),
        login() {
            this.login({ email, password })
        }
    }
}
</script>
