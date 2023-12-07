/* *****************************************************************************
 Copyright (c) 2020-2022 Kingteza and/or its affiliates. All rights reserved.
 KINGTEZA PROPRIETARY/CONFIDENTIAL. Use is subject to license terms.
***************************************************************************** */

import { Typography } from 'antd';
import React, { FC, PropsWithChildren, useEffect } from 'react';

const { Title } = Typography;
const TitleWithHeadTitle: FC<{ children: string }> = ({ children }) => {
  useEffect(() => {
    document.title = children + ' | KING POS';
  }, [children]);

  return <Title level={3}>{children}</Title>;
};

export default TitleWithHeadTitle;
