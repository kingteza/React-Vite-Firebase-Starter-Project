/* *****************************************************************************
 Copyright (c) 2020-2022 Kingteza and/or its affiliates. All rights reserved.
 KINGTEZA PROPRIETARY/CONFIDENTIAL. Use is subject to license terms.
***************************************************************************** */

import Role from 'constants/role.enum';
import Permission from 'constants/user-roles/permission.enum';
import UserPrincipal from 'models/UserPrincipal';

 
export const hasAccess = (
  permissions: Permission | Permission[] = [],
  roles: Role | Role[] = [],
  currentUser?: UserPrincipal | null,
) => {
  const allowedPermissions = Array.isArray(permissions) ? permissions : [permissions];
  const allowedRoles = Array.isArray(roles) ? roles : [roles];
  const user = currentUser;
  const currentUserPermission = user?.permissions ?? [];
  const currentUserRole = user?.role;
  const hasPermission =
    allowedPermissions.length <= 0
      ? true
      : allowedPermissions.some((p) => currentUserPermission.includes(p));
  const hasRole =
    allowedRoles.length <= 0 ? true : allowedRoles.some((r) => currentUserRole === r);
  const hasAccess = hasPermission && hasRole;
  return hasAccess;
};
