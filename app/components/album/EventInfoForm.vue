<template>
    <CommonBaseInfoForm :labels="{ name: 'Nom de l\'événement' }" placeholder="Ex: Mariage de Julie et Thomas"
        :withDescription="true" @info-changed="onEventInfoChanged" />

    <CommonBaseInfoForm :labels="{ name: 'Nom de l\'album' }" placeholder="Céreminie"
        @info-changed="onAlbumInfoChanged" />
</template>

<script>

export default {

    methods: {
        onEventInfoChanged(formData) {
            this.$emit('event-info-changed', formData);
        },
        onAlbumInfoChanged(formData) {
            this.$emit('album-info-changed', formData);
        }
    }

}
</script>