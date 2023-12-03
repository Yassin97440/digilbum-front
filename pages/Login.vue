<script setup>
definePageMeta({
    middleware: ["auth"],
    layout: false,
})

</script >
<template>
    <div class="pt-16 px-16">

        <v-form>
            <v-container class="pt-16 px-16 grid justify-items-center">

                <v-row class=" px-16">
                    <v-col>
                        <v-text-field v-model="email" label="john.doe@exemple.com"></v-text-field>
                    </v-col>
                </v-row>
                <v-row class=" px-16">
                    <v-col>
                        <v-text-field v-model="password" :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                            :rules="[rules.required, rules.min]" :type="show1 ? 'text' : 'password'" counter
                            @click:append="show1 = !show1" required></v-text-field>
                    </v-col>
                </v-row>
                <v-row center class=" px-16">
                    <v-col>
                        <v-btn rounded color="primary" dark @click="logine"> Enregister </v-btn>
                    </v-col>
                </v-row>
            </v-container>
        </v-form>
    </div>
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
        logine() {
            console.log("🚀 ~ file: Login.vue:51 ~ login ~ email:", this.email)
            this.login({ email: this.email, password: this.password })
            // return navigateTo('/')
        }
    }
}
</script>
