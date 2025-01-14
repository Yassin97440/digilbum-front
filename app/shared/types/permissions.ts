import type { User } from "./User";

export interface Resource {
  id: number;
  userId: number;
  groupId?: number;
}

export type PermissionAction = 'create' | 'read' | 'update' | 'delete' | 'manage';
export type ResourceType = 'album' | 'event' | 'group' | 'picture';

export interface Permission {
  action: PermissionAction;
  resource: ResourceType;
  condition?: (user: User, resource?: Resource) => boolean;
}   