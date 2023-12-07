/* *****************************************************************************
 Copyright (c) 2020-2022 Kingteza and/or its affiliates. All rights reserved.
 KINGTEZA PROPRIETARY/CONFIDENTIAL. Use is subject to license terms.
***************************************************************************** */

import Form from 'antd/lib/form/Form';
import ButtonComponent from 'components/common/button/Button';
import { translations } from 'config/localization/translations';
import React, { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import AuthService from 'services/AuthService';

import TextField from '../../components/common/text-field/TextField';

const LoginScreen = () => {
  const { t } = useTranslation();


  const signing = false;
  const navigate = useNavigate();
  const onFinish = useCallback(
    async (e) => {
      // const rst: any = await dispatch(signIn(e));
      const request = await AuthService.signIn(e);
      if (request) {
        const redirect = localStorage.getItem('redirect');
        navigate(redirect ?? '/');
        localStorage.removeItem('redirect');
      }
    },
    [navigate],
  );

  return (
    <div className="center">
      <Form onFinish={onFinish} className="login-screen-width">
        <TextField name="email" type="email" required />
        <TextField name="password" type="password" required />
        <ButtonComponent type="primary" htmlType="submit" block loading={signing}>
          {t(translations.str.login)}
        </ButtonComponent>
      </Form>
    </div>
  );
};

export default LoginScreen;
