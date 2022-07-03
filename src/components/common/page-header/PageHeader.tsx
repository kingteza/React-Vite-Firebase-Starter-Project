/* *****************************************************************************
 Copyright (c) 2020-2022 Kingteza and/or its affiliates. All rights reserved.
 KINGTEZA PROPRIETARY/CONFIDENTIAL. Use is subject to license terms.
***************************************************************************** */

import PageHeader from 'antd/lib/page-header';
import React, { FC, useCallback } from 'react';
import { useNavigate } from 'react-router';

interface PageHeaderComponentProps {
  title: string;
  onBack?: () => void;
  backUrl?: string;
  className?: string;
}
const PageHeaderComponent: FC<PageHeaderComponentProps> = ({
  title,
  onBack,
  backUrl = '..',
  className = 'pl-0 pt-0',
}) => {
  const navigate = useNavigate();

  const onClickGoBack = useCallback(() => {
    if (onBack) {
      onBack();
      return;
    } else if (backUrl) {
      navigate(backUrl);
    }
  }, [backUrl, onBack]);

  return <PageHeader className={className as any} onBack={onClickGoBack} title={title} />;
};

export default PageHeaderComponent;
