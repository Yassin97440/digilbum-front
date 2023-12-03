<script setup>
definePageMeta({
    middleware: ["auth"],
    layout: false,
})

</script >
<template place-content-center>
    <!-- <div class="pt-16 px-16">

        <v-form>
            <v-container fill-height fluid>

                <v-row align="center" justify="center">
                    <v-col>
                        <v-text-field v-model="email" label="john.doe@exemple.com"></v-text-field>
                    </v-col>
                </v-row>
                <v-row align="center" justify="center">
                    <v-col>
                        <v-text-field v-model="password" :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                            :rules="[rules.required, rules.min]" :type="show1 ? 'text' : 'password'" counter
                            @click:append="show1 = !show1" required></v-text-field>
                    </v-col>
                </v-row>
                <v-row align="center" justify="center">
                    <v-col>
                        <v-btn rounded color="primary" dark @click="logine"> Enregister </v-btn>
                    </v-col>
                </v-row>
            </v-container>
        </v-form>
    </div> -->
    <div>

        <v-card class="mx-auto pa-12 pb-8" elevation="8" max-width="448" rounded="lg">
            <div class="text-subtitle-1 text-medium-emphasis">Account</div>

            <v-text-field density="compact" placeholder="Email address" prepend-inner-icon="mdi-email-outline"
                variant="outlined"></v-text-field>

            <div class="text-subtitle-1 text-medium-emphasis d-flex align-center justify-space-between">
                Password

                <a class="text-caption text-decoration-none text-blue" href="#" rel="noopener noreferrer" target="_blank">
                    Forgot login password?</a>
            </div>

            <v-text-field :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'" :type="visible ? 'text' : 'password'"
                density="compact" placeholder="Enter your password" prepend-inner-icon="mdi-lock-outline" variant="outlined"
                @click:append-inner="visible = !visible"></v-text-field>


            <v-btn block class="mb-8" color="blue" size="large" variant="tonal">
                Log In
            </v-btn>

            <v-card-text class="text-center">
                <a class="text-blue text-decoration-none" href="#" rel="noopener noreferrer" target="_blank">
                    Sign up now <v-icon icon="mdi-chevron-right"></v-icon>
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
            console.log("🚀 ~ file: Login.vue:51 ~ login ~ email:", this.email)
            this.login({ email: this.email, password: this.password })
            // return navigateTo('/')
        }
    }
}
</script>
