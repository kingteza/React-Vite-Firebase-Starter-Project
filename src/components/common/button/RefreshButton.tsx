/* *****************************************************************************
 Copyright (c) 2020-2022 Kingteza and/or its affiliates. All rights reserved.
 KINGTEZA PROPRIETARY/CONFIDENTIAL. Use is subject to license terms.
***************************************************************************** */

import { ReloadOutlined } from '@ant-design/icons';
import { ButtonProps } from 'antd';
import { translations } from 'config/localization/translations';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import ButtonComponent from './Button';

export const RefreshButton: FC<{
  to?: string;
  onClick?: (value: boolean) => void;
  title?: string;
  type?: ButtonProps['type'];
  block?: boolean;
  className?: string;
}> = ({ block, className, type = 'primary', onClick, title, to }) => {
  const { t } = useTranslation();

  return (
    <ButtonComponent
      type={type}
      className={className}
      to={to}
      block={block}
      onClick={onClick && (() => onClick(true))}
      icon={<ReloadOutlined />}
    >
      {title ?? t(translations.str.refresh)}
    </ButtonComponent>
  );
};
