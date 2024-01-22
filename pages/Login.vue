<script setup>
definePageMeta({
    middleware: ["auth"],
    layout: false,
})

</script >
<template  >
    <div class="flex justify-center items-center mx-auto h-screen ">
        <v-card class="mx-auto pa-12 pb-8 w-4/5 sm:w-3/5 md:w-3/5 lg:w-2/5 xl:w-1/3" elevation="8" rounded="lg">
            <div class="text-subtitle-1 text-medium-emphasis">Identifiant</div>

            <v-text-field v-model="email" density="compact" placeholder="Adresse email"
                prepend-inner-icon="mdi-email-outline" variant="outlined"></v-text-field>

            <div class="text-subtitle-1 text-medium-emphasis d-flex align-center justify-space-between">
                Mot de passe
            </div>

            <v-text-field v-model="password" :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
                :type="visible ? 'text' : 'password'" density="compact" placeholder="Mot de passe"
                prepend-inner-icon="mdi-lock-outline" variant="outlined"
                @click:append-inner="visible = !visible"></v-text-field>

            <v-btn block class="mb-8" color="blue" size="large" variant="tonal" @click="logine">
                Connexion
            </v-btn>

            <v-card-text class="text-center">
                <a class="text-blue text-decoration-none" href="/Signup" rel="noopener noreferrer" target="_blank">
                    Créer un compte <v-icon icon="mdi-chevron-right"></v-icon>
                </a>
            </v-card-text>
        </v-card>
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
            this.login({ email: this.email, password: this.password })
        }
    }
}
</script>
