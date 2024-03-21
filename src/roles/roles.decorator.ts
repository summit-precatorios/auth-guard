import { SetMetadata } from '@nestjs/common';

export interface Role {
  name: string;
}

export const ROLES_KEY = 'roles';
export const Roles = (...roles: Role[]) => SetMetadata(ROLES_KEY, roles);
