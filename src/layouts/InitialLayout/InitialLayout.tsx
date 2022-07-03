/* *****************************************************************************
 Copyright (c) 2020-2022 Kingteza and/or its affiliates. All rights reserved.
 KINGTEZA PROPRIETARY/CONFIDENTIAL. Use is subject to license terms.
***************************************************************************** */

import { withCurrentUserContext } from 'context/UserContext';
import React, { useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';

const InitialLayout = () => {
  const location = useLocation();

  return (
    <main>
      <Outlet />
    </main>
  );
};

export default withCurrentUserContext(InitialLayout);
