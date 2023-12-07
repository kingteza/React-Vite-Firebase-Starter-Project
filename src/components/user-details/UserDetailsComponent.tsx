/* *****************************************************************************
 Copyright (c) 2020-2022 Kingteza and/or its affiliates. All rights reserved.
 KINGTEZA PROPRIETARY/CONFIDENTIAL. Use is subject to license terms.
***************************************************************************** */

import { AlertOutlined, LogoutOutlined, TranslationOutlined } from '@ant-design/icons';
import { Dropdown, Menu, Typography } from 'antd';
import UserAvatar from 'components/common/avatar/UserAvatar';
import ButtonComponent from 'components/common/button/Button';
import { translations } from 'config/localization/translations';
import { useTheme } from 'config/theme/ThemeProvider';
import { useUserContext } from 'context/UserContext';
import useWindowDimensions from 'context/WindowDimension';
import React, { useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
// import AuthService from 'services/auth/AuthService';

export const DarkModeMenuItem = () => {
  const { mode, set } = useTheme();
  const { t } = useTranslation();

  const isDark = useMemo(() => mode === 'dark', [mode]);

  return (
    <Menu.Item key="0" icon={<AlertOutlined />} onClick={() => set()}>
      {' '}
      {t(translations.str.darkMode)}
      {' : '}
      {isDark ? t(translations.str.enabled) : t(translations.str.disabled)}
    </Menu.Item>
  );
};

export interface UserDetailsComponentProps {}

const UserDetailsComponent = () => {
  const { name, id } = useUserContext() ?? {};
  const { isDesktop } = useWindowDimensions();
  const { t, i18n } = useTranslation();

  const onClickChangeLanguage = useCallback(async () => {
    const lang = i18n.language === 'en' ? 'si' : 'en';
    console.log(lang);
    i18n.changeLanguage(lang);
    localStorage.setItem('language', lang);
  }, [i18n]);

  const logoutLocal = async () => {
    // await AuthService.logout();
  };

  const menu = (
    <Menu>
      <DarkModeMenuItem />
      <Menu.Item
        key="0"
        onClick={onClickChangeLanguage}
        icon={<TranslationOutlined />}
      >
        {t(translations.str.language)} {i18n.language.toUpperCase()}
      </Menu.Item>
      <Menu.Item key="2" icon={<LogoutOutlined />} onClick={logoutLocal}>
        {t(translations.str.logout)}
      </Menu.Item>
    </Menu>
  );
  return (
    <Dropdown
      className="fit-hight"
      overlay={menu}
      placement="bottomRight"
      arrow
    >
      <ButtonComponent type="text" className="d-flex align-items-center h-100">
        <UserAvatar value={name} />
        <Typography className={isDesktop ? 'ml-1' : 'ml-0'}>{name}</Typography>
      </ButtonComponent>
    </Dropdown>
  );
};

export default UserDetailsComponent;
