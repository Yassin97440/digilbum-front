import type { Resource, Permission, PermissionAction, ResourceType } from '~/shared/types/permissions';
import type { User } from '~/shared/types/User';
// Création d'une classe singleton
class PermissionManager {
  private static instance: PermissionManager;
  private permissions: Map<string, Permission> = new Map();

  private constructor() { }

  public static getInstance(): PermissionManager {
    if (!PermissionManager.instance) {
      PermissionManager.instance = new PermissionManager();
    }
    return PermissionManager.instance;
  }

  definePermission(
    action: PermissionAction,
    resource: ResourceType,
    condition?: (user: User, resource?: Resource) => boolean
  ) {
    const key = `${action}:${resource}`;
    this.permissions.set(key, { action, resource, condition });
  }

  can(
    user: User,
    action: PermissionAction,
    resource: ResourceType,
    resourceData?: Resource
  ): boolean {
    const key = `${action}:${resource}`;
    const permission = this.permissions.get(key);

    if (!permission) return false;

    // Vérifier si l'utilisateur a des permissions spéciales
    if (user.permissions?.includes('admin')) return true;

    // Vérifier la condition personnalisée si elle existe
    if (permission.condition) {
      return permission.condition(user, resourceData);
    }

    return true;
  }
}

// Export d'une instance unique
export const permissionManager = PermissionManager.getInstance(); 