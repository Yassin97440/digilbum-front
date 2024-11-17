<script setup>
definePageMeta({
    middleware: ["auth"],
    layout: "signup",
    // or middleware: 'auth'
})
</script>
<template>
    <div
        class="min-h-screen w-full flex items-center justify-center px-4 py-6 bg-gradient-to-br from-orange-400/10 to-blue-600/10 backdrop-blur-lg">
        <v-card class="w-full max-w-md bg-white/10 backdrop-blur-md border-white/20 shadow-xl overflow-hidden ">
            <v-card-item class="p-8">
                <div class="text-center mb-8">
                    <h1
                        class=" pb-2 text-5xl font-bold bg-gradient-to-r from-orange-400 to-blue-600 bg-clip-text text-transparent">
                        Digilbum
                    </h1>
                    <p class=" /70 mt-2">
                        Partagez vos moments précieux
                    </p>
                </div>

                <div class="space-y-4">
                    <div class="space-y-2">
                        <label class="text-sm font-medium  /90 block">
                            Identifiant
                        </label>
                        <div class="relative">
                            <v-text-field v-model="email" placeholder="Adresse email" variant="outlined"
                                density="compact" class="pl-3 bg-white/5 border-white/10  "
                                :class="{ 'input-focused': focused }" prepend-icon="mdi-email-outline"></v-text-field>
                        </div>
                    </div>

                    <div class="space-y-2">
                        <label class="text-sm font-medium  /90 block">
                            Mot de passe
                        </label>
                        <div class="relative">
                            <v-text-field v-model="password" :type="visible ? 'text' : 'password'"
                                prepend-icon="mdi-lock-outline" placeholder="Mot de passe" variant="outlined"
                                density="compact" class="pl-3 bg-white/5 border-white/10  "
                                :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
                                @click:append-inner="visible = !visible"></v-text-field>
                        </div>
                    </div>

                    <v-btn block class="bg-gradient-to-r !important  from-orange-400 to-blue-600 font-medium py-2.5"
                        elevation="2" @click="logine">
                        Connexion
                    </v-btn>

                    <div class="text-center">

                        <a href="/Signup" class="inline-flex items-center text-sm  /70 hover:  transition-colors">
                            Créer un compte
                            <v-icon icon="mdi-chevron-right" class="ml-1"></v-icon>
                        </a>
                    </div>
                </div>
            </v-card-item>
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
