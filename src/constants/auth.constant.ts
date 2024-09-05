import { InferSubjects, MongoAbility } from '@casl/ability';

import { Permission, Role, Session, Subject, User } from '../typeorm/entities';

export enum AuthStrategy {
  JWT_ACCESS = 'jwt-access',
  JWT_REFRESH = 'jwt-refresh',
}

export enum Policy {
  CHECK_POLICIES_KEY = 'checkPolicies',
}

export enum RoleName {
  ADMIN = 'admin',
  USER = 'user',
}

export enum PermissionAction {
  MANAGE = 'manage',
  CREATE = 'create',
  READ = 'read',
  UPDATE = 'update',
  DELETE = 'delete',
}

export type PermissionSubject =
  | InferSubjects<
      | typeof User
      | typeof Session
      | typeof Role
      | typeof Permission
      | typeof Subject
    >
  | 'all';

export type AppAbility = MongoAbility<[PermissionAction, PermissionSubject]>;

interface IPolicyHandler {
  handle(ability: AppAbility): boolean;
}

type PolicyHandlerCallback = (ability: AppAbility) => boolean;

export type PolicyHandler = IPolicyHandler | PolicyHandlerCallback;
