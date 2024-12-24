<template>
  <div>
    <v-snackbar v-for="( notif, index) in notifications" :key="index" :v-model="notif.visible" :color="notif.color" top
      :timeout="notif.timeout || 5000" closable="true">
      {{ notif.message }}
    </v-snackbar>
  </div>
</template>

<script setup>
import { useNotificationStore } from '../stores/NotificationStore';

const notificationStore = useNotificationStore();
const notifications = computed(() => notificationStore.notifications);

</script>

<style></style>