/* *****************************************************************************
 Copyright (c) 2020-2022 Kingteza and/or its affiliates. All rights reserved.
 KINGTEZA PROPRIETARY/CONFIDENTIAL. Use is subject to license terms.
***************************************************************************** */

import { DashboardOutlined } from '@ant-design/icons';
import { Layout, Menu } from 'antd';
import AppBar from 'components/appbar/AppBar';
import { translations } from 'config/localization/translations';
import Role from 'constants/role.enum';
import Permission from 'constants/user-roles/permission.enum';
import { useUserContext, withCurrentUserContext } from 'context/UserContext';
import useWindowDimensions from 'context/WindowDimension';
import React, { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { hasAccess } from 'util/AccessUtil';

interface SideBarItem {
  icon?: any;
  link?: string;
  label: string;
  roles?: Role[];
  permissions?: Permission[];
  sub?: SideBarItem[];
}


const MainLayout = () => {
  const location = useLocation();
  useEffect(() => {
    const current = location.pathname.split('/');
    setCurrentKey('/' + current[1]);
  }, [location.pathname]);

  const { t } = useTranslation();

  const user = useUserContext();
  const items: SideBarItem[] = [
    {
      icon: <DashboardOutlined />,
      link: `/`,
      label: translations.str.dashboard,
    },
  ];

  const renderMenu = useCallback(
    (items: SideBarItem[], uniqueKey: any) => {
      return items
        .filter(({ permissions, roles }) => hasAccess(permissions, roles, user))
        .map(({ icon, label, link, sub }, i) => (
          <React.Fragment key={link + ` ${uniqueKey}${i}`}>
            {sub ? (
              <Menu.SubMenu icon={icon} title={t(label)}>
                {renderMenu(sub, `${uniqueKey}${i}`)}
              </Menu.SubMenu>
            ) : (
              <Menu.Item icon={icon}>
                {link ? (
                  <Link to={link} className="no-style-a">
                    {t(label)}
                  </Link>
                ) : (
                  t(label)
                )}
              </Menu.Item>
            )}
          </React.Fragment>
        ));
    },
    [t, user],
  );
  const { isDesktop } = useWindowDimensions();
  const [collapsed, setCollapsed] = useState(false);
  const [currentKey, setCurrentKey] = useState('dashboard');
  const menu = renderMenu(items, 0);

  return (
    <Layout className="site-layout max-height-vh ">
      <AppBar title={'Sample Name'} menu={menu} />
      <Layout.Sider
        breakpoint={'lg'}
        collapsible
        theme="dark"
        className={"custom-scroll site-layout-background minus-title-bar-height-w overflow-auto " + (items.length < 15 ? ' full-height-sider ' : '')}
        trigger={isDesktop ? undefined : null}
        collapsedWidth={isDesktop ? undefined : 0}
        collapsed={collapsed}
        onCollapse={setCollapsed}
      >
        <Menu mode="inline" selectedKeys={[currentKey]} className="h-100">
          {menu}
          <div style={{ height: '48px' }}></div>
        </Menu>
      </Layout.Sider>

      <Layout className="max-height h-100">
        <Layout.Content className="minus-title-bar-height overflow-auto h-100">
          <Outlet />
        </Layout.Content>
      </Layout>
    </Layout>
  );
};

export default withCurrentUserContext(MainLayout);
