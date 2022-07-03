/* *****************************************************************************
 Copyright (c) 2020-2022 Kingteza and/or its affiliates. All rights reserved.
 KINGTEZA PROPRIETARY/CONFIDENTIAL. Use is subject to license terms.
***************************************************************************** */

import React, { FC, useEffect, useState } from 'react';

import Role from '../../constants/role.enum';
import { hasAccess } from '../../util/AccessUtil';
import LoadingIndicator from '../common/loading/LoadingIndicator';
import NoPermissionComponent from '../security/NoPermissionComponent';

interface PermissionAndRoleRouteProps {
  roles?: Role | Role[];
}

const PermissionAndRoleRoute: FC<PermissionAndRoleRouteProps> = ({
  children,
  roles = [],
}) => {
  const [has, setHas] = useState<boolean>(true);
  const currentUser = null;
  const loading = false;
  useEffect(() => {
    console.log({ has });
  }, [has]);

  useEffect(() => {
    if (currentUser !== undefined) setHas(hasAccess(roles, currentUser));
  }, [currentUser, roles]);

  if (has !== false) {
    return <LoadingIndicator loading={loading}>{children}</LoadingIndicator>;
  } else {
    return <NoPermissionComponent />;
  }
};

export default PermissionAndRoleRoute;
