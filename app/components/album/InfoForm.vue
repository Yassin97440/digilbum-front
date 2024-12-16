<template>
    <CommonBaseInfoForm :labels="{ name: 'Nom de l\'album' }" placeholder="Ex: Vacances d'été 2024"
        @info-changed="onInfoChanged" />
</template>

<script>
export default {


    methods: {
        onInfoChanged(formData) {
            this.$emit('album-info-changed', formData);
        }
    }
}
</script>