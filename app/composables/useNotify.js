import { useNotificationStore } from '~~/stores/NotificationStore';
import { useToast } from 'primevue/usetoast';


export const useNotify = () => {
  const toaster = useToast();

  const notificationStore = useNotificationStore();
  const notify = (message, color = 'success', timeout = 5000) => {
    toaster.add({
      severity: color,
      summary: message,
      detail: message,
      life: timeout
    });
    notificationStore.notify(message, color, timeout);
  }
  return { notify }
}
export default useNotify
