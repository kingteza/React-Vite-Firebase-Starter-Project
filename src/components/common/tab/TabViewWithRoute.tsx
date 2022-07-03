/* *****************************************************************************
 Copyright (c) 2020-2022 Kingteza and/or its affiliates. All rights reserved.
 KINGTEZA PROPRIETARY/CONFIDENTIAL. Use is subject to license terms.
***************************************************************************** */

import { Tabs } from 'antd';
import { Content } from 'antd/lib/layout/layout';
import React, { useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router';

interface TabViewWithRouteProps {
  initialKey: string;
  positionOfRoute: number;
  className?: string;
  tabs: {
    label: string;
    key: string;
  }[];
}

export const TabViewWithRoute: React.FC<TabViewWithRouteProps> = ({
  positionOfRoute,
  initialKey = '',
  tabs,
  className,
}) => {
  const [activeKey, setActiveKey] = useState<string>(initialKey);
  const navigate = useNavigate();

  const callback = (route: string) => {
    navigate(route);
  };

  useEffect(() => {
    const currentPos = location.pathname.split('/')[positionOfRoute];
    setActiveKey(currentPos ?? '');
    if (!currentPos) {
      navigate(initialKey, { replace: true });
    }
  }, [location.pathname]);

  return (
    <div className={className}>
      <Tabs type="card" tabPosition={'top'} activeKey={activeKey} onChange={callback}>
        {tabs.map(({ key, label }) => {
          return (
            <Tabs.TabPane key={key} tab={label}>
              {/* {activeKey === key && ()} */}
            </Tabs.TabPane>
          );
        })}
      </Tabs>

      <Content className="max-height">
        <Outlet />
      </Content>
    </div>
  );
};
