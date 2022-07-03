/* *****************************************************************************
 Copyright (c) 2020-2021 KINGTEZA and/or its affiliates. All rights reserved.
 KINGTEZA PROPRIETARY/CONFIDENTIAL. Use is subject to license terms.
***************************************************************************** */

import Popconfirm from 'antd/lib/popconfirm';
import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { translations } from '../../../config/localization/translations';
import ButtonComponent from './Button';

interface Props<T> {
  value: T;
  onClick: (value: T) => void;
  text?: string;
}

function DeleteButtonTable<T>({ value, onClick, text }: Props<T>) {
  const { t } = useTranslation();
  const txt = useMemo(() => text ?? t(translations.str.delete), [text, t]);
  return (
    <Popconfirm
      title={t(translations.qus.doYouWantToDelete)}
      okText={txt.toUpperCase()}
      cancelText={t(translations.str.no).toUpperCase()}
      onConfirm={() => onClick(value)}
    >
      <ButtonComponent type="link" danger>
        {txt}
      </ButtonComponent>
    </Popconfirm>
  );
}

export default DeleteButtonTable;
