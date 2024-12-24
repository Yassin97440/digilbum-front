<template>
  <div>
    <Toast class="" />
  </div>
</template>

<script setup>
import { useNotificationStore } from '~~/stores/NotificationStore';
import Toast from 'primevue/toast';


const notificationStore = useNotificationStore();
const notifications = computed(() => notificationStore.notifications);
</script>

<style></style>