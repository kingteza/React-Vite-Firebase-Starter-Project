/* *****************************************************************************
 Copyright (c) 2020-2022 Kingteza and/or its affiliates. All rights reserved.
 KINGTEZA PROPRIETARY/CONFIDENTIAL. Use is subject to license terms.
***************************************************************************** */

import { DashboardOutlined } from '@ant-design/icons';
import LayoutComponent from 'components/layout/LayoutComponent';
import { translations } from 'config/localization/translations';
import Role from 'constants/role.enum';
import Permission from 'constants/user-roles/permission.enum';
import useWindowDimensions from 'context/WindowDimension';
import { Outlet } from 'react-router-dom';

export interface SideBarItem {
  icon?: any;
  link?: string;
  label: string;
  roles?: Role[];
  permissions?: Permission[];
  sub?: SideBarItem[];
  defaultMobile?: boolean;
}

const MainLayout = () => {
  const { isDesktop, isMobile } = useWindowDimensions();

  const items: SideBarItem[] = [
    {
      icon: <DashboardOutlined />,
      link: `/`,
      label: translations.str.dashboard,
      defaultMobile: true,
    },
  ];
  return (
    <LayoutComponent items={items} title={'Main'} rootPath="/main">
      <Outlet />
    </LayoutComponent>
  );
};

export default MainLayout;
