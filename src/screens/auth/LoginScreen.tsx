/* *****************************************************************************
 Copyright (c) 2020-2022 Kingteza and/or its affiliates. All rights reserved.
 KINGTEZA PROPRIETARY/CONFIDENTIAL. Use is subject to license terms.
***************************************************************************** */

import Form from 'antd/lib/form/Form';
import ButtonComponent from 'components/common/button/Button';
import { translations } from 'config/localization/translations';
import { signInWithEmailAndPassword } from 'firebase/auth';
import React, { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { signIn } from 'reducer/auth/AuthSlice';
import { useAppDispatch, useAppSelector } from 'reducer/store';

import TextField from '../../components/common/text-field/TextField';
import { auth } from '../../config/firebase/FirebaseConfig';

const LoginScreen = () => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const signing = useAppSelector((s) => s.auth.signing);

  const navigate = useNavigate();
  const onFinish = useCallback(
    async (e) => {
      console.log('Why');
      const rst: any = await dispatch(signIn(e));
      if (!rst.error) {
        const redirect = localStorage.getItem('redirect');
        navigate(redirect ?? '/');
        localStorage.removeItem('redirect');
      }
    },
    [dispatch, navigate],
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
