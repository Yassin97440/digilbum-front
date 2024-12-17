<template>
  <div class="space-y-6 max-w-md mx-auto">
    <div class="space-y-2">
      <label class="text-sm font-medium block pl-1">Prénom</label>
      <v-text-field v-model="newUser.firstName" placeholder="Votre prénom" variant="outlined" density="comfortable"
        class="pl-3 bg-white/5 border-white/20 rounded-xl transition-all duration-300
               group-hover:bg-white/10 group-hover:border-white/30" prepend-icon="mdi-account-outline">
      </v-text-field>
    </div>

    <div class="space-y-2">
      <label class="text-sm font-medium block pl-1">Nom</label>
      <v-text-field v-model="newUser.lastName" placeholder="Votre nom" variant="outlined" density="comfortable" class="pl-3 bg-white/5 border-white/20 rounded-xl transition-all duration-300
               group-hover:bg-white/10 group-hover:border-white/30" prepend-icon="mdi-account-outline">
      </v-text-field>
    </div>

    <div class="space-y-2">
      <label class="text-sm font-medium block pl-1">Email</label>
      <v-text-field v-model="newUser.email" placeholder="Votre adresse email" variant="outlined" density="comfortable"
        class="pl-3 bg-white/5 border-white/20 rounded-xl transition-all duration-300
               group-hover:bg-white/10 group-hover:border-white/30" prepend-icon="mdi-email-outline">
      </v-text-field>
    </div>

    <div class="space-y-2">
      <label class="text-sm font-medium block pl-1">Mot de passe</label>
      <v-text-field v-model="newUser.password" :type="show1 ? 'text' : 'password'" placeholder="Votre mot de passe"
        variant="outlined" density="comfortable" :rules="[rules.required, rules.min]"
        hint="👮 Il faut au moins 8 caractères" class="pl-3 bg-white/5 border-white/20 rounded-xl transition-all duration-300
               group-hover:bg-white/10 group-hover:border-white/30" prepend-icon="mdi-lock-outline"
        :append-icon="show1 ? 'mdi-eye-off' : 'mdi-eye'" @click:append="show1 = !show1">
      </v-text-field>
    </div>

    <div class="space-y-2">
      <label class="text-sm font-medium block pl-1">Confirmation du mot de passe</label>
      <v-text-field v-model="newUser.passwordCheck" :type="show1 ? 'text' : 'password'"
        placeholder="Confirmez votre mot de passe" variant="outlined" density="comfortable"
        :rules="[rules.required, rules.min]" class="pl-3 bg-white/5 border-white/20 rounded-xl transition-all duration-300
               group-hover:bg-white/10 group-hover:border-white/30" prepend-icon="mdi-lock-check-outline"
        :append-icon="show1 ? 'mdi-eye-off' : 'mdi-eye'" @click:append="show1 = !show1">
      </v-text-field>
    </div>
  </div>
</template>

<script>
import { useAuthStore } from "../stores/AuthStore";

import { mapActions } from "pinia";

export default {
  data: () => ({
    newUser: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      passwordCheck: "",
    },
    show1: false,
    rules: {
      required: (value) => !!value || "Required.",
      min: (v) => v.length >= 8 || "Min 8 characters",
      emailMatch: () => `The email and password you entered don't match`,
    },
  }),
  watch: {
    newUser: {
      deep: true,
      handler(newVal) {
        this.$emit('update:newUser', newVal);
      }
    }
  },
  methods: {
    ...mapActions(useAuthStore, ["register"]),
  },
};
</script>
