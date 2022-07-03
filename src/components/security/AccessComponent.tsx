/* *****************************************************************************
 Copyright (c) 2020-2022 Kingteza and/or its affiliates. All rights reserved.
 KINGTEZA PROPRIETARY/CONFIDENTIAL. Use is subject to license terms.
***************************************************************************** */

import React, { FC, useEffect, useState } from 'react';

import Role from '../../constants/role.enum';
import UserPrincipal from '../../models/user/UserPrincipal';
import { hasAccess } from '../../util/AccessUtil';

interface AccessProps {
  currentUser: UserPrincipal;
  roles?: Role | Role[];
}

const Access: FC<AccessProps> = ({ children, roles = [], currentUser }) => {
  const [has, setHas] = useState<boolean>(true);

  useEffect(() => {
    if (currentUser !== undefined) setHas(hasAccess(roles, currentUser));
  }, [currentUser, roles]);

  return <>{has ? children : <></>}</>;
};

export default Access;
