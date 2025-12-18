/* *****************************************************************************
 Copyright (c) 2020-2022 Kingteza and/or its affiliates. All rights reserved.
 KINGTEZA PROPRIETARY/CONFIDENTIAL. Use is subject to license terms.
***************************************************************************** */

import {
  BellOutlined,
  CheckSquareOutlined,
  DownOutlined,
  EnvironmentOutlined,
  SearchOutlined,
  ThunderboltOutlined,
} from '@ant-design/icons';
import {
  Avatar,
  Badge,
  Button,
  Drawer,
  Dropdown,
  Input,
  Layout,
  Menu,
  MenuProps,
  Select,
  Space,
  theme,
} from 'antd';
import UserDetailsComponent from 'components/user-details/UserDetailsComponent';
import useWindowDimensions from 'context/WindowDimension';
import React, { FC, ReactElement, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

const { Search } = Input;
const { useToken } = theme;

type MenuItem = Required<MenuProps>['items'][number];

type Props = {
  title: string;
  sidebarWidth?: number;
} & (
  | {
      menu: ReactElement[];
    }
  | {
      menuItems: MenuItem[];
    }
);

const AppBar: FC<Props> = ({ title, sidebarWidth = 0, ...props }) => {
  const [visible, setVisible] = useState(false);
  const { isMobile } = useWindowDimensions();
  const { token } = useToken();

  // Mock data - replace with actual data from your context/API
  const taskCount = 12;

  return (
    <>
      <Layout.Header
        className="site-layout-background layout-header navbar"
        style={{
          position: 'fixed',
          zIndex: 200,
          left: sidebarWidth,
          width: `calc(100vw - ${sidebarWidth}px)`,
          borderBottom: `0px solid ${token.colorBorderSecondary}`,
          padding: isMobile ? '0 16px' : '0 24px',
          height: '64px',
          lineHeight: '64px',
          transition: 'left 0.3s ease, width 0.3s ease',
        }}
      >
        <div className="d-flex align-items-center w-100">
          <div style={{ flex: 1 }} />

          <Space size={isMobile ? 'small' : 'middle'} className="ml-auto">
            <UserDetailsComponent />
          </Space>
        </div>
      </Layout.Header>

      {/* Mobile Drawer - keep existing logic */}
      <Drawer
        className="p-0 app-bar"
        placement="left"
        onClose={() => setVisible(false)}
        width={isMobile ? '75%' : undefined}
        open={visible}
      >
        <Menu
          onSelect={() => setVisible(false)}
          mode="inline"
          theme="light"
          defaultSelectedKeys={['2']}
          items={(props as any).menuItems}
        ></Menu>
      </Drawer>
    </>
  );
};

export default AppBar;
