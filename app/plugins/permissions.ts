import { setupPermissions } from '~/config/permissions';

export default defineNuxtPlugin(() => {
  setupPermissions();
}); 