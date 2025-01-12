<template>
  <div class="space-y-6 max-w-md mx-auto">
    <v-form ref="form">
      <div class="space-y-2">
        <label class="text-sm font-medium block pl-1">Prénom</label>
        <v-text-field v-model="newUser.firstname" :rules="rules.firstName" placeholder="Votre prénom" variant="outlined"
          density="comfortable" class="pl-3 rounded-xl" prepend-icon="mdi-account-outline">
        </v-text-field>
      </div>
      <div class="space-y-2">
        <label class="text-sm font-medium block pl-1">Nom</label>
        <v-text-field v-model="newUser.lastname" :rules="rules.lastName" placeholder="Votre nom" variant="outlined"
          density="comfortable" class="pl-3 rounded-xl" prepend-icon="mdi-account-outline">
        </v-text-field>
      </div>


      <div class="space-y-2">
        <label class="text-sm font-medium block pl-1">Email</label>
        <v-text-field v-model="newUser.email" :rules="rules.email" placeholder="Votre adresse email" variant="outlined"
          density="comfortable" class="pl-3 rounded-xl" prepend-icon="mdi-email-outline">
        </v-text-field>
      </div>

      <div class="space-y-2">
        <label class="text-sm font-medium block pl-1">Mot de passe</label>
        <v-text-field v-model="newUser.password" :rules="rules.password" :type="show1 ? 'text' : 'password'"
          placeholder="Votre mot de passe" variant="outlined" density="comfortable"
          hint="👮 Il faut au moins 8 caractères" class="pl-3 rounded-xl  " prepend-icon="mdi-lock-outline"
          :append-icon="show1 ? 'mdi-eye-off' : 'mdi-eye'" @click:append="show1 = !show1">
        </v-text-field>
      </div>

      <div class="space-y-2">
        <label class="text-sm font-medium block pl-1">Confirmation du mot de passe</label>
        <v-text-field v-model="newUser.passwordCheck" :rules="rules.passwordCheck" :type="show1 ? 'text' : 'password'"
          placeholder="Confirmez votre mot de passe" variant="outlined" density="comfortable" class="pl-3 rounded-xl"
          prepend-icon="mdi-lock-check-outline" :append-icon="show1 ? 'mdi-eye-off' : 'mdi-eye'"
          @click:append="show1 = !show1">
        </v-text-field>
      </div>
    </v-form>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useAuthStore } from '~~/stores/AuthStore'

const props = defineProps({
  newUser: {
    type: Object,
    required: true
  }
})

const authStore = useAuthStore()

const checkEmailExists = async (email) => {
  try {
    const exists = await authStore.checkEmailExists(email)
    return !exists || 'Cet email est déjà utilisé'
  } catch (error) {
    console.error('Erreur lors de la vérification de l\'email:', error)
    return 'Erreur lors de la vérification de l\'email'
  }
}

const rules = {
  firstName: [v => !!v || 'Le prénom est requis'],
  lastName: [v => !!v || 'Le nom est requis'],
  email: [
    v => !!v || 'L\'email est requis',
    v => /.+@.+\..+/.test(v) || 'L\'email doit être valide',
    checkEmailExists
  ],
  password: [
    v => !!v || 'Le mot de passe est requis',
    v => v.length >= 8 || 'Le mot de passe doit contenir au moins 8 caractères'
  ],
  passwordCheck: [
    v => !!v || 'Le mot de passe est requis',
    v => v.length >= 8 || 'Le mot de passe doit contenir au moins 8 caractères',
    v => v === props.newUser.password || 'Les mots de passe ne correspondent pas'
  ]
}

const show1 = ref(false)

const form = ref(null)
const emit = defineEmits(['user-data-changed'])


watch(props.newUser, (newVal) => {
  dataChanged(newVal);
})

const validateForm = () => {
  return form.value.validate()
}
const isFormRempli = (newVal) => {
  return newVal.firstname && newVal.lastname && newVal.email && newVal.password && newVal.passwordCheck === newVal.password
}
const dataChanged = (newVal) => {
  if (isFormRempli(newVal) && validateForm()) {
    props.newUser = newVal;
    emit('user-data-changed', props.newUser);
  }
}

</script>
