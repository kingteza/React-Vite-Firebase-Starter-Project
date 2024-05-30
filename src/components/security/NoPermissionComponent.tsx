/* *****************************************************************************
 Copyright (c) 2020-2022 Kingteza and/or its affiliates. All rights reserved.
 KINGTEZA PROPRIETARY/CONFIDENTIAL. Use is subject to license terms.
***************************************************************************** */

import { Result } from 'antd';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';

import { translations } from '../../config/localization/translations';
import ButtonComponent from '../common/button/Button';

const NoPermissionComponent = () => {
  const { t } = useTranslation();

  const navigate = useNavigate();

  const onClickGoBack = () => {
    navigate(-1);
  };

  return (
    <Result
      status="403"
      title="403"
      subTitle={t(translations.err.needPermissionToAccessTheResource)}
      extra={
        <></>
        // <ButtonComponent onClick={onClickGoBack} type="primary">
        //   {t(translations.str.goBack)}
        // </ButtonComponent>
      }
    />
  );
};

export default NoPermissionComponent;
