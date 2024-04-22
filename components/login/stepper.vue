<template>
    <v-container>

        <v-stepper :items="['Step 1', 'Step 2', 'Step 3']">
            <template class=" " v-slot:item.1>
                <LoginNewUserFormulaire class=" inset-x-0 top-0"></LoginNewUserFormulaire>
            </template>

            <template v-slot:item.2>
                <GroupForm></GroupForm>
            </template>

            <template v-slot:item.3>
                <v-card title="Step Three" flat>...</v-card>
            </template>
        </v-stepper>
    </v-container>
</template>
<script setup>
import GroupForm from './GroupForm.vue';

</script>