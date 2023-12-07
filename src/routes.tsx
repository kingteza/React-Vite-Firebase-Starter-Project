/* *****************************************************************************
 Copyright (c) 2020-2022 Kingteza and/or its affiliates. All rights reserved.
 KINGTEZA PROPRIETARY/CONFIDENTIAL. Use is subject to license terms.
***************************************************************************** */

import React from 'react';
import { ReactElement, ReactNode } from 'react';
import LoginScreen from 'screens/auth/LoginScreen';

import Role from './constants/role.enum';
import InitialLayout from './layouts/main/MainLayout';
import AllVenuesScreen from './screens/venue/AllVenuesScreen';

/**
 * defining the routes and its layout. Inspired by a Github
 * project <link>https://github.com/INTECS-ITFAC/intecs_webapp_front-end</link>
 *
 * @author pandu
 */

export interface AppRoute {
  component?: ReactElement;
  default?: string;
  path: string;
  subRoutes?: AppRoute[];
  name?: string; // Indicating the name for the route. This can be useful when you want to display the route name as the title
  permission?: string[];
  role?: Role | Role[];
}

const routes: AppRoute[] = [
  {
    path: '/*',
    default: 'venues',
    component: <InitialLayout />,
    subRoutes: [
      {
        component: <AllVenuesScreen />,
        path: 'venues',
      },
    ],
  },
  {
    path: '/login',
    component: <LoginScreen />,
  },
];

export default routes;
