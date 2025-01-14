import { permissionManager } from '~/utils/permissionManager';
import type { PermissionAction, ResourceType, Resource } from '~/shared/types/permissions';

export function usePermissions() {
  return {
    can: async (action: PermissionAction, resource: ResourceType, resourceData?: Resource) => {
      const payloadUser = await getUserFromToken();
      if (!payloadUser) return false;
      return permissionManager.can(payloadUser, action, resource, resourceData);
    }
  };
} 