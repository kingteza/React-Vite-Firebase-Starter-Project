/* *****************************************************************************
 Copyright (c) 2020-2022 Kingteza and/or its affiliates. All rights reserved.
 KINGTEZA PROPRIETARY/CONFIDENTIAL. Use is subject to license terms.
***************************************************************************** */

import Role from '../../constants/role.enum';

export default interface UserPrincipal {
  id: string;
  email: string;
  name: string;
  role: Role;
}
