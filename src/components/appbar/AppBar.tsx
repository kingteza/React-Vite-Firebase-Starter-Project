/* *****************************************************************************
 Copyright (c) 2020-2022 Kingteza and/or its affiliates. All rights reserved.
 KINGTEZA PROPRIETARY/CONFIDENTIAL. Use is subject to license terms.
***************************************************************************** */

import { MenuOutlined } from '@ant-design/icons';
import { Drawer, Layout, Menu, Typography } from 'antd';
import ButtonComponent from 'components/common/button/Button';
import UserDetailsComponent from 'components/user-details/UserDetailsComponent';
import useWindowDimensions from 'context/WindowDimension';
import React, { FC, ReactElement, useState } from 'react';
import { useTranslation } from 'react-i18next';

interface Props {
  title: string;
  menu: ReactElement[];
}

const AppBar: FC<Props> = ({ title, menu }) => {
  const [visible, setVisible] = useState(false);

  const { isDesktop = true, isMobile } = useWindowDimensions();

  return (
    <>
      <Layout.Header
        className="site-layout-background layout-header navbar pl-2"
        style={{
          position: 'fixed',
          zIndex: 1,
          width: '100%',
          borderBottom: '1px solid rgba(0, 0, 0, 0.06)',
        }}
      >
        <div className="d-flex align-items-center w-100">
          {!isDesktop && (
            <ButtonComponent
              className="menu light-text"
              type="text"
              ghost
              icon={<MenuOutlined />}
              onClick={() => setVisible(true)}
            />
          )}
          <Typography.Title level={3} className="mb-0 pl-2 light-text v-center-text">
            {title}
          </Typography.Title>
          <div style={{ flex: 1 }} />
          <div className="ml-auto">
            {/* <img src={'../../../'} className="logo" alt="logo" /> */}
            <UserDetailsComponent />
          </div>
        </div>
      </Layout.Header>
      {!isDesktop && (
        <Drawer
          className="p-0 app-bar"
          placement="left"
          onClose={() => setVisible(false)}
          open={visible}
          width={isMobile ? '75%' : undefined}
        >
          {/* <UserDetailsComponent /> */}
          <Menu
            onSelect={() => setVisible(false)}
            mode="inline"
            theme="light"
            defaultSelectedKeys={['2']}
          >
            {menu}
          </Menu>
        </Drawer>
      )}
    </>
  );
};

export default AppBar;
