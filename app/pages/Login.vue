<script setup>
import { useAuthStore } from '~~/stores/AuthStore'

definePageMeta({
    middleware: ["auth"],
    layout: "signup",
})

const email = ref("")
const password = ref("")
const visible = ref(false)
const authStore = useAuthStore

const rules = {
    email: [
        v => !!v || 'L\'email est requis',
        v => /.+@.+\..+/.test(v) || 'L\'email doit être valide'
    ],
    password: [
        v => !!v || 'Le mot de passe est requis',
        v => v.length >= 8 || 'Le mot de passe doit contenir au moins 8 caractères'
    ]
}


const logine = () => {
    authStore.login({ email: email.value, password: password.value })
}
</script>
<template>
    <div class="h-screen flex items-center justify-center overflow-hidden px-4">
        <v-card
            class="w-full max-w-md relative bg-transparent backdrop-blur-3xl border border-white/20 shadow-2xl overflow-hidden rounded-2xl">
            <v-card-item class="p-10 text-white">
                <div class="text-center mb-10 relative">
                    <h1 class="pb-3 text-6xl font-bold  bg-gradient-to-r from-orange-400 via-gray-400 to-slate-400 bg-clip-text text-transparent
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
                            <v-text-field v-model="email" :rules="rules.email" placeholder="Adresse email"
                                variant="outlined" density="comfortable"
                                class="pl-3 rounded-xl transition-all duration-300" prepend-icon="mdi-email-outline">
                            </v-text-field>
                        </div>
                    </div>

                    <div class="space-y-2">
                        <label class="text-sm font-medium block pl-1">
                            Mot de passe
                        </label>
                        <div class="relative group">
                            <v-text-field v-model="password" :rules="rules.password"
                                :type="visible ? 'text' : 'password'" placeholder="Mot de passe" variant="outlined"
                                density="comfortable" class="pl-3
                                     rounded-xl " prepend-icon="mdi-lock-outline"
                                :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
                                @click:append-inner="visible = !visible">
                            </v-text-field>
                        </div>
                    </div>

                    <v-btn block class="mt-6 bg-gradient-to-r from-orange-400 via-gray-400 to-slate-400 font-medium py-3 text-lg
                               rounded-xl transform hover:scale-102 transition-all duration-300 hover:shadow-lg"
                        elevation="3" @click="logine">
                        Connexion
                    </v-btn>

                    <div class="text-center mt-6">
                        <NuxtLink to="/Signup" class="inline-flex items-center text-base text-blue-500/80 hover:text-blue-500 transition-colors
                   transform hover:translate-x-1 duration-300">
                            Créer un compte
                            <v-icon icon="mdi-chevron-right" class="ml-1"></v-icon>
                        </NuxtLink>
                    </div>
                </div>
            </v-card-item>
        </v-card>
    </div>
</template>
