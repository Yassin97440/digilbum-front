<template>
  <div>
    <v-btn v-if="can('update', 'album', album)" @click="editAlbum">
      Modifier
    </v-btn>
    <v-btn v-if="can('delete', 'album', album)" @click="deleteAlbum">
      Supprimer
    </v-btn>
  </div>
</template>

<script setup lang="ts">
import { usePermissions } from '~/composables/usePermissions';
import type { Resource } from '~/shared/types/permissions';

const props = defineProps<{
  album: Resource;
}>();

const { can } = usePermissions();
</script> 