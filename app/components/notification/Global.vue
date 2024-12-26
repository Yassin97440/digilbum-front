<template>
  <div>
    <!-- <div class="!vuetify-reset">
    </div> -->
    <div class="card flex justify-center">
      <Toast position="bottom-right" group="br" />
    </div>
  </div>
</template>

<script setup>
import { useNotificationStore } from '~~/stores/NotificationStore';
import Toast from 'primevue/toast';


const notificationStore = useNotificationStore();
const notifications = computed(() => notificationStore.notifications);
</script>

<style></style>