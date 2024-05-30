/* *****************************************************************************
 Copyright (c) 2020-2022 Kingteza and/or its affiliates. All rights reserved.
 KINGTEZA PROPRIETARY/CONFIDENTIAL. Use is subject to license terms.
***************************************************************************** */

import Permission from 'constants/user-roles/permission.enum';
import UserPrincipal from 'models/UserPrincipal';
import React, { FC, PropsWithChildren, useEffect, useState } from 'react';

import Role from '../../constants/role.enum';
import { hasAccess } from '../../util/AccessUtil';

interface AccessProps {
  currentUser: UserPrincipal;
  roles?: Role | Role[];
  permissions?: Permission | Permission[];
}

const Access: FC<PropsWithChildren<AccessProps>> = ({ permissions, children, roles = [], currentUser }) => {
  const [has, setHas] = useState<boolean>(true);

  useEffect(() => {
    if (currentUser !== undefined) setHas(hasAccess(permissions, roles, currentUser));
  }, [currentUser, permissions, roles]);

  return <>{has ? children : <></>}</>;
};

export default Access;
