<script setup>
definePageMeta({
    middleware: ["auth"],
    layout: "signup",
    // or middleware: 'auth'
})
</script>
<template>
    <div class="min-h-screen w-full flex items-center justify-center px-4 py-6">
        <v-card
            class="w-full max-w-md relative bg-white/10 backdrop-blur-md border border-white/20 shadow-2xl overflow-hidden rounded-2xl">
            <v-card-item class="p-10">
                <div class="text-center mb-10 relative">
                    <h1 class="pb-3 text-6xl font-bold bg-gradient-to-r from-orange-400 via-pink-500 to-blue-600 bg-clip-text text-transparent
                             transform hover:scale-105 transition-transform duration-300">
                        Digilbum
                    </h1>
                    <p class="mt-4 text-lg font-light">
                        Partagez vos moments précieux
                    </p>
                </div>

                <div class="space-y-6">
                    <div class="space-y-2">
                        <label class="text-sm font-medium block pl-1">
                            Identifiant
                        </label>
                        <div class="relative group">
                            <v-text-field v-model="email" placeholder="Adresse email" variant="outlined"
                                density="comfortable" class="pl-3 bg-white/5 border-white/20 rounded-xl transition-all duration-300
                                       group-hover:bg-white/10 group-hover:border-white/30"
                                prepend-icon="mdi-email-outline">
                            </v-text-field>
                        </div>
                    </div>

                    <div class="space-y-2">
                        <label class="text-sm font-medium block pl-1">
                            Mot de passe
                        </label>
                        <div class="relative group">
                            <v-text-field v-model="password" :type="visible ? 'text' : 'password'"
                                placeholder="Mot de passe" variant="outlined" density="comfortable" class="pl-3 bg-white/5 border-white/20 rounded-xl transition-all duration-300
                                       group-hover:bg-white/10 group-hover:border-white/30"
                                prepend-icon="mdi-lock-outline" :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
                                @click:append-inner="visible = !visible">
                            </v-text-field>
                        </div>
                    </div>

                    <v-btn block class="mt-6 bg-gradient-to-r from-orange-400 via-pink-500 to-blue-600 font-medium py-3 text-lg
                               rounded-xl transform hover:scale-102 transition-all duration-300 hover:shadow-lg"
                        elevation="3" @click="logine">
                        Connexion
                    </v-btn>

                    <div class="text-center mt-6">
                        <a href="/Signup" class="inline-flex items-center text-base text-blue-500/80 hover:text-blue-500 transition-colors
                                   transform hover:translate-x-1 duration-300">
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
