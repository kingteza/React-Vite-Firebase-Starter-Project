/* *****************************************************************************
 Copyright (c) 2020-2022 Kingteza and/or its affiliates. All rights reserved.
 KINGTEZA PROPRIETARY/CONFIDENTIAL. Use is subject to license terms.
***************************************************************************** */
import 'antd/dist/reset.css';
import 'config/localization/i18n';

import App from 'App';
import ThemeProvider from 'config/theme/ThemeProvider';
import React, { FC } from 'react';

/**
 * This is where we define all root hook providers and context providers
 * @returns FC
 */
const Root: FC = () => {
  return (
    <>
      <ThemeProvider>
        {/* <Sider
          breakpoint={'lg'}
          collapsible
          className="custom-scroll site-layout-background minus-title-bar-height-w overflow-auto"
          >
          <Menu mode="inline">
          <MenuItem>Hello World</MenuItem>
          </Menu>
        </Sider> */}
        <App />
        {/* <Button>Hello World</Button> */}
      </ThemeProvider>
    </>
  );
};

export default Root;
