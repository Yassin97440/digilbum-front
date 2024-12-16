<template>

  <div class="flex justify-center h">

    <v-card class="  rounded-lg min-w-80">

      <v-container>
        <v-row class=" p-0">
          <v-text-field v-model="newUser.firstName" variant="solo-filled" label="Prénom" rounded outlined clearable
            required></v-text-field>
        </v-row>
        <v-row class="p-0">
          <v-text-field v-model="newUser.lastName" variant="solo-filled" label="Nom" rounded outlined clearable
            required></v-text-field>
        </v-row>
        <v-row class="p-0">
          <v-text-field v-model="newUser.email" variant="solo-filled" label="Adresse email" rounded outlined clearable
            required></v-text-field>
        </v-row>
        <v-row class="p-0 ">
          <v-text-field v-model="newUser.password" variant="solo-filled"
            :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'" :rules="[rules.required, rules.min]"
            :type="show1 ? 'text' : 'password'" name="input-10-1" label="Entrez votre mot de passe"
            hint="👮 Il faut moins 8 caractères 👮" counter @click:append="show1 = !show1"></v-text-field> </v-row>
        <v-row class="p-0">
          <v-text-field v-model="newUser.passwordCheck" variant="solo-filled"
            :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'" :rules="[rules.required, rules.min]"
            :type="show1 ? 'text' : 'password'" name="input-10-1" label="Confirmez votre mot de passe"
            hint="valideDoublePasswordAt: 'least 8 characters'? ''" counter
            @click:append="show1 = !show1"></v-text-field>
        </v-row>
      </v-container>
    </v-card>
  </div>


</template>

<style></style>
<script setup>

</script>
<script>
import * as AuthStore from "../stores/AuthStore";

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
      this.test()
    },
  },
  methods: {
    ...mapActions(AuthStore.AuthStore.useAuthStore, ["register"]),
    valideDoublePassword() {
      return this.passwording
    },
    test(newfield) {
      this.register({
        firstName: this.firstName,
        lastName: this.lastName,
        password: this.password,
        email: this.email,
      });
    },
  },
};
</script>
