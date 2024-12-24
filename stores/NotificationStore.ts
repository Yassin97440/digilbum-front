import { defineStore } from 'pinia'

export const useNotificationStore = defineStore(
  'notificationStore',
  {
    state: () => ({
      notifications: reactive([]) as Array<{
        message: string,
        color: string,
        timeout: number,
        visible: boolean
      }>,
    }),
    actions: {
      notify(message: string, color: string = 'success', timeout: number = 5000) {
        const newNotification = { message, color, timeout, visible: true };
        this.notifications.push(newNotification);
        setTimeout(() => {
          this.removeNotification(newNotification);
        }, timeout);
      },
      removeNotification(notification: any) {
        const index = this.notifications.indexOf(notification);
        if (index !== -1) this.notifications.splice(index, 1);
      }
    }
  })