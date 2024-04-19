<template>
  <div class="mx-auto pa-12 pb-8" style="height: 100vh; display: flex;
    justify-content: center;
    align-items: center;">

    <v-container>
      <v-form>

        <v-row>
          <v-col>
            <v-text-field v-model="firstName" label="Prénom" rounded outlined clearable required></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-text-field v-model="lastName" label="Nom" rounded outlined clearable required></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-text-field v-model="email" label="Adresse email" rounded outlined clearable required></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-text-field v-model="password" :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
              :rules="[rules.required, rules.min]" :type="show1 ? 'text' : 'password'" name="input-10-1"
              label="Entrez votre mot de passe" hint="👮 Il faut moins 8 caractères 👮" counter
              @click:append="show1 = !show1"></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-text-field v-model="passwordCheck" :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
              :rules="[rules.required, rules.min]" :type="show1 ? 'text' : 'password'" name="input-10-1"
              label="Confirmez votre mot de passe" hint="valideDoublePasswordAt: 'least 8 characters'? ''" counter
              @click:append="show1 = !show1"></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-btn rounded color="primary" dark @click="test" :disabled="!valideDoublePassword"> Enregister
            </v-btn>
          </v-col>
        </v-row>
      </v-form>
    </v-container>
  </div>
</template>
<!-- <v-stepper v-model="step" :items="items" show-actions class="h-full">
    <template v-slot:item.1>
      <h3 class="text-h6">Order</h3>

      <br>

      <v-sheet border>
        <v-table>
          <thead>
            <tr>
              <th>Description</th>
              <th class="text-end">Quantity</th>
              <th class="text-end">Price</th>
            </tr>
          </thead>

          <tbody>
            <tr v-for="(product, index) in products" :key="index">
              <td v-text="product.name"></td>
              <td class="text-end" v-text="product.quantity"></td>
              <td class="text-end" v-text="product.quantity * product.price"></td>
            </tr>

            <tr>
              <th>Total</th>
              <th></th>
              <th class="text-end">
                ${{ subtotal }}
              </th>
            </tr>
          </tbody>
        </v-table>
      </v-sheet>
    </template>

    <template v-slot:item.2>
      <h3 class="text-h6">Shipping</h3>

      <br>

      <v-radio-group v-model="shipping" label="Delivery Method">
        <v-radio label="Standard Shipping" value="5"></v-radio>
        <v-radio label="Priority Shipping" value="10"></v-radio>
        <v-radio label="Express Shipping" value="15"></v-radio>
      </v-radio-group>
    </template>

    <template v-slot:item.3>
      <h3 class="text-h6">Confirm</h3>

      <br>

      <v-sheet border>
        <v-table>
          <thead>
            <tr>
              <th>Description</th>
              <th class="text-end">Quantity</th>
              <th class="text-end">Price</th>
            </tr>
          </thead>

          <tbody>
            <tr v-for="(product, index) in products" :key="index">
              <td v-text="product.name"></td>
              <td class="text-end" v-text="product.quantity"></td>
              <td class="text-end" v-text="product.quantity * product.price"></td>
            </tr>

            <tr>
              <td>Shipping</td>
              <td></td>
              <td class="text-end" v-text="shipping"></td>
            </tr>

            <tr>
              <th>Total</th>
              <th></th>
              <th class="text-end">
                ${{ total }}
              </th>
            </tr>
          </tbody>
        </v-table>
      </v-sheet>
    </template>
  </v-stepper> -->
<style></style>
<script>
import { useAuthStore } from "~~/stores/AuthStore";

import { mapActions } from "pinia";
export default {
  data: () => ({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    passwordCheck: "",
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
  methods: {
    ...mapActions(useAuthStore, ["register"]),
    valideDoublePassword() {
      return this.passwording
    },
    test() {
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
