import { useNotificationStore } from '~~/stores/NotificationStore';

export const useNotify = () => {
  const notificationStore = useNotificationStore();
  const notify = (message, color = 'success', timeout = 5000) => {
    notificationStore.notify(message, color, timeout);
  }
  return { notify }
}
export default useNotify
