/* *****************************************************************************
 Copyright (c) 2020-2022 Kingteza and/or its affiliates. All rights reserved.
 KINGTEZA PROPRIETARY/CONFIDENTIAL. Use is subject to license terms.
***************************************************************************** */

import { useToken } from '@ant-design/pro-components';
import type { MenuProps } from 'antd';
import { Layout, Menu, Typography } from 'antd';
import AppBar from 'components/appbar/AppBar';
import { useTheme } from 'config/theme/ThemeProvider';
import Role from 'constants/role.enum';
import Permission from 'constants/user-roles/permission.enum';
import { useUserContext } from 'context/UserContext';
import useWindowDimensions from 'context/WindowDimension';
import React, {
  PropsWithChildren,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useLocation } from 'react-router-dom';
import { hasAccess } from 'util/AccessUtil';

type MenuItem = Required<MenuProps>['items'][number];

export interface SideBarItem {
  icon?: any;
  link?: string;
  label: string;
  roles?: Role[];
  permissions?: Permission[];
  sub?: SideBarItem[];
  defaultMobile?: boolean;
}

export interface LayoutComponentProps {
  items: SideBarItem[];
  title: string;
  rootPath: string;
}

const LayoutComponent = ({
  items,
  title,
  children,
  rootPath,
}: PropsWithChildren<LayoutComponentProps>) => {
  const { isDesktop, isMobile } = useWindowDimensions();
  const { t } = useTranslation();
  const user = useUserContext();
  const { token } = useToken();

  const renderMenuItems = useCallback(
    (items: SideBarItem[], uniqueKey: any): MenuItem[] => {
      return items
        .filter(({ permissions, roles }) => hasAccess(permissions, roles, user))
        .map(({ icon, label, link, sub }, i) => {
          if (sub) {
            return {
              key: link,
              icon,
              label: t(label),
              children: renderMenuItems(sub, `${uniqueKey}${i}`),
            } as MenuItem;
          } else {
            return {
              key: rootPath + link,
              icon,
              label: link ? (
                <Link to={rootPath + link} className="no-style-a">
                  {t(label)}
                </Link>
              ) : (
                t(label)
              ),
            } as MenuItem;
          }
        });
    },
    [rootPath, t, user],
  );

  const [currentKey, setCurrentKey] = useState<string>();
  const location = useLocation();
  useEffect(() => {
    const current = location.pathname.split('/').filter(Boolean);
    setCurrentKey(rootPath + '/' + current[1]);
  }, [location.pathname, rootPath]);

  const [collapsed, setCollapsed] = useState(false);
  const siderWidth = isDesktop ? (collapsed ? 80 : 200) : 0;

  const menuItems = useMemo(() => {
    const list = renderMenuItems(items, 0);

    return list;
  }, [items, renderMenuItems]);

  const { modeExtracted: mode } = useTheme();
  return (
    <Layout className="site-layout max-height-vh ">
      <AppBar title={title} menuItems={menuItems} sidebarWidth={siderWidth} />
      {isDesktop && (
        <Layout.Sider
          width={200}
          breakpoint={'lg'}
          collapsible
          theme={mode}
          className="overflow-auto site-layout-background"
          style={{
            backgroundColor: token.colorBgContainer,
            position: 'fixed',
            left: 0,
            top: 0,
            height: '100vh',
            // borderRight: `0px solid ${token.colorBorderSecondary}`,
            transition: 'width 0.3s ease',
          }}
          trigger={isDesktop ? undefined : null}
          collapsedWidth={80}
          collapsed={collapsed}
          onCollapse={setCollapsed}
        >
          <div
            style={{
              backgroundColor: token.colorBgContainer,
              height: 110,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '30px 16px 10px 16px',
              gap: 8,
            }}
          >
            <Link to="/" className="unstyled-link">
              {collapsed ? <>LOGO</> : <>LOGO LONG</>}
            </Link>
          </div>
          <Menu
            mode="inline"
            // theme={mode}
            selectedKeys={currentKey ? [currentKey] : undefined}
            defaultSelectedKeys={currentKey ? [currentKey] : undefined}
            className="custom-scroll "
            style={{
              backgroundColor: token.colorBgContainer,
              borderInlineEnd: 'none',
              height: 'calc(100vh - 158px)!important',
            }}
            items={menuItems}
          >
            <div style={{ height: '48px' }}></div>
          </Menu>
        </Layout.Sider>
      )}
      <Layout
        style={{
          marginLeft: siderWidth,
          paddingTop: isMobile ? 0 : 64,
          transition: 'margin-left 0.3s ease',
        }}
        className={
          (isDesktop ? '' : 'minus-title-bar-and-bottom-nav-height-w') + ' h-100'
        }
      >
        <Layout.Content className={'h-full overflow-auto'}>{children}</Layout.Content>
      </Layout>
      {/* {isMobile && <MobileLayout initialItems={items} rootPath={rootPath} />} */}
    </Layout>
  );
};

export default LayoutComponent;
