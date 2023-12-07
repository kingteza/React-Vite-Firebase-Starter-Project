/* *****************************************************************************
 Copyright (c) 2020-2022 Kingteza and/or its affiliates. All rights reserved.
 KINGTEZA PROPRIETARY/CONFIDENTIAL. Use is subject to license terms.
***************************************************************************** */

import { Layout, message } from 'antd';
import Form from 'antd/lib/form/Form';
import ButtonComponent from 'components/common/button/Button';
import { translations } from 'config/localization/translations';
import React, { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import AuthService from 'services/AuthService';
import ValidationUtil from 'util/ValidationUtil';

import TextField from '../../components/common/text-field/TextField';

const LoginScreen = () => {
  const { t } = useTranslation();

  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const onFinish = useCallback(
    async (e) => {
      setIsLoading(true);
      try {
        // const rst: any = await dispatch(signIn(e));
        const request = await AuthService.signIn(e);
        if (!request) {
          const redirect = localStorage.getItem('redirect');
          navigate(redirect ?? '/');
          localStorage.removeItem('redirect');
        } else {
          // message.error(request);
        }
      } finally {
        setIsLoading(false);
      }
    },
    [navigate],
  );

  return (
    <Layout className="center">
      <Form onFinish={onFinish} className="login-screen-width" layout="vertical">
        <TextField
          name="username"
          type={'email'}
          required
          label={t(translations.str.email)}
        />
        <TextField
          name="password"
          type="password"
          rules={ValidationUtil.passwordValidation()}
          required
          label={t(translations.str.password)}
        />
        <ButtonComponent type="primary" htmlType="submit" block loading={isLoading}>
          {t(translations.str.login)}
        </ButtonComponent>
      </Form>
    </Layout>
  );
};

export default LoginScreen;
