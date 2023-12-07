/* *****************************************************************************
 Copyright (c) 2020-2022 Kingteza and/or its affiliates. All rights reserved.
 KINGTEZA PROPRIETARY/CONFIDENTIAL. Use is subject to license terms.
***************************************************************************** */

import Permission from 'constants/user-roles/permission.enum';
import { useUserContext } from 'context/UserContext';
import React, { FC, PropsWithChildren, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import Role from '../../constants/role.enum';
import { hasAccess } from '../../util/AccessUtil';
import LoadingIndicator from '../common/loading/LoadingIndicator';
import NoPermissionComponent from '../security/NoPermissionComponent';

interface PermissionAndRoleRouteProps {
  permissions?: Permission | Permission[];
  roles?: Role | Role[];
}

const PermissionAndRoleRoute: FC<PropsWithChildren<PermissionAndRoleRouteProps>> = ({
  children,
  permissions = [],
  roles = [],
}) => {
  const user = useUserContext();

  const isUserDefined = Boolean(user?.id);
  const [has, setHas] = useState<boolean>();
  const location = useLocation();
  // console.log('XXX', { has, isUserDefined, location, permissions, roles, user });
  useEffect(() => {
    if (isUserDefined) setHas(hasAccess(permissions, roles, user));
  }, [user, permissions, roles, isUserDefined]);

  if (has !== false) {
    return (
      <LoadingIndicator loading={Boolean(user?.loading)}>{children}</LoadingIndicator>
    );
  } else {
    return <NoPermissionComponent />;
  }
};

export default PermissionAndRoleRoute;
