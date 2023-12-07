/* *****************************************************************************
 Copyright (c) 2020-2022 Kingteza and/or its affiliates. All rights reserved.
 KINGTEZA PROPRIETARY/CONFIDENTIAL. Use is subject to license terms.
***************************************************************************** */

import Permission from 'constants/user-roles/permission.enum';

import Role from '../constants/role.enum';

export default interface UserPrincipal {
  id: string;
  email: string;
  username: string;
  name: string;
  role?: Role;
  branch?: string;
  orgId?: string;
  permissions?: Permission[];
}
