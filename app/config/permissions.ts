import { permissionManager } from '~/utils/permissionManager';

// Définir les permissions de base
export function setupPermissions() {
  // Permission pour les albums
  permissionManager.definePermission('create', 'album', (user) => !!user.id);

  permissionManager.definePermission('update', 'album', (user, resource) => {
    if (!user || !resource) return false;
    return user.id === resource.userId;
  });

  permissionManager.definePermission('delete', 'album', (user, resource) => {
    if (!user || !resource) return false;
    return user.id === resource.userId;
  });

  // Permission pour les événements
  permissionManager.definePermission('create', 'event', (user) => !!user.id);

  permissionManager.definePermission('manage', 'event', (user, resource) => {
    if (!user || !resource) return false;
    return user.id === resource.userId;
  });

  // Permission pour les groupes
  permissionManager.definePermission('manage', 'group', (user, resource) => {
    if (!user || !resource) return false;
    return user.id === resource.userId;
  });
} 