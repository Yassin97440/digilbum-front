<template>
  <div>
    <v-list-item v-for="item in itemListAction" :key="item.title"
      v-if="await can(item.actionName, item.resource, album)" @click="item.action(album)">
      <v-list-item-title>{{ item.title }}</v-list-item-title>
    </v-list-item>
  </div>
</template>

<script setup lang="ts">
import { usePermissions } from '~/composables/usePermissions';
import type { ItemListAction } from '~/shared/types/ItemListAction';
import type { Resource } from '~/shared/types/permissions';


const props = defineProps<{
  album: { type: Resource, required: true },
  itemListAction: { type: Array<ItemListAction>, required: true }
}>();


const { can } = usePermissions();
</script>