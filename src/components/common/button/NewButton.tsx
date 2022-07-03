/* *****************************************************************************
 Copyright (c) 2020-2022 Kingteza and/or its affiliates. All rights reserved.
 KINGTEZA PROPRIETARY/CONFIDENTIAL. Use is subject to license terms.
***************************************************************************** */

import { PlusOutlined } from '@ant-design/icons';
import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { translations } from '../../../config/localization/translations';
import ButtonComponent from './Button';

export const NewButton: FC<{
  to?: string;
  onClick?: (value: boolean) => void;
  title?: string;
}> = ({ onClick, title, to }) => {
  const { t } = useTranslation();

  return (
    <ButtonComponent
      type="primary"
      to={to}
      onClick={onClick && (() => onClick(true))}
      icon={<PlusOutlined />}
    >
      {title ?? t(translations.str.new)}
    </ButtonComponent>
  );
};
