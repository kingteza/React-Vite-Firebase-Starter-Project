/* *****************************************************************************
 Copyright (c) 2020-2022 Kingteza and/or its affiliates. All rights reserved.
 KINGTEZA PROPRIETARY/CONFIDENTIAL. Use is subject to license terms.
***************************************************************************** */

import { withCurrentUserContext } from 'context/UserContext';
import React from 'react';
import { Outlet } from 'react-router-dom';

const VenueLayout = () => {
  return (
    <main>
      <Outlet />
    </main>
  );
};

export default withCurrentUserContext(VenueLayout);
