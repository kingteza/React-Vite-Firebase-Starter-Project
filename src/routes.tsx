/* *****************************************************************************
Copyright (c) 2020-2022 Kingteza and/or its affiliates. All rights reserved.
KINGTEZA PROPRIETARY/CONFIDENTIAL. Use is subject to license terms.
***************************************************************************** */
/* eslint-disable simple-import-sort/imports */

import React from 'react';
import { ReactElement, ReactNode } from 'react';
import LoginScreen from 'screens/auth/LoginScreen';

import Role from './constants/role.enum';
import MainLayout from './layouts/main/MainLayout';
import DashboardScreen from 'screens/dashboard/DashboardScreen';
import Permission from 'constants/user-roles/permission.enum';

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
  permission?: Permission[];
  role?: Role | Role[];
}

const routes: AppRoute[] = [
  {
    path: '/*',
    default: '',
    component: <MainLayout />,
    subRoutes: [
      {
        component: <DashboardScreen />,
        path: '',
      },
    ],
  },
  {
    path: '/login',
    component: <LoginScreen />,
  },
];

export default routes;
