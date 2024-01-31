/* *****************************************************************************
 Copyright (c) 2020-2022 Kingteza and/or its affiliates. All rights reserved.
 KINGTEZA PROPRIETARY/CONFIDENTIAL. Use is subject to license terms.
***************************************************************************** */

import {
  AlertOutlined,
  LoginOutlined,
  LogoutOutlined,
  TranslationOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Dropdown, Menu, Typography } from 'antd';
import UserAvatar from 'components/common/avatar/UserAvatar';
import ButtonComponent from 'components/common/button/Button';
import AdminIcon from 'components/icons/AdminIcon';
import { translations } from 'config/localization/translations';
import { useTheme } from 'config/theme/ThemeProvider';
import Role from 'constants/role.enum';
import { useUserContext } from 'context/UserContext';
import useWindowDimensions from 'context/WindowDimension';
import React, { FC, useCallback, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
// import AuthService from 'services/auth/AuthService';

export const DarkModeMenuItem: FC<{ key }> = ({ key }) => {
  const { mode, set } = useTheme();
  const { t } = useTranslation();

  const isDark = useMemo(() => mode === 'dark', [mode]);

  return (
    <Menu.Item key="1" icon={<AlertOutlined />} onClick={() => set()}>
      {' '}
      {t(translations.str.darkMode)}
      {' : '}
      {isDark ? t(translations.str.enabled) : t(translations.str.disabled)}
    </Menu.Item>
  );
};

export interface UserDetailsComponentProps {}

export const onClickChangeLanguage = async (i18n) => {
  const lang = i18n.language === 'en' ? 'si' : 'en';
  i18n.changeLanguage(lang);
  localStorage.setItem('language', lang);
};

const UserDetailsComponent = () => {
  const { name, id, role } = useUserContext() ?? {};
  const { isDesktop } = useWindowDimensions();
  const { t, i18n } = useTranslation();

  const navigate = useNavigate();
  const logoutLocal = async () => {
    if(id) {
      // Process Logout
      // navigate('/login');
    } else {
      navigate('/login');
    }
  };

  const { isMobile } = useWindowDimensions();
  const [open, setOpen] = useState(false);
  const { mode, set } = useTheme();
  
  const menu = (
    <Menu>
      {name && (
        <Menu.Item
          key="0"
          disabled
          style={{
            cursor: 'initial',
            color: mode === 'dark' ? 'white' : 'rgba(0, 0, 0, 0.88)',
          }}
          icon={role === Role.ADMIN ? <AdminIcon className="mr-2" /> : <UserOutlined />}
        >
          {name}
        </Menu.Item>
      )}
      <DarkModeMenuItem key={1} />

      <Menu.Item
        key={2}
        onClick={() => onClickChangeLanguage(i18n)}
        icon={<TranslationOutlined />}
      >
        {t(translations.str.language)} {i18n.language.toUpperCase()}
      </Menu.Item>
      <Menu.Item key={3} icon={id ? <LogoutOutlined />: <LoginOutlined />} onClick={logoutLocal}>
        {id ? t(translations.str.logout) : t(translations.str.login)}
      </Menu.Item>
    </Menu>
  );

  return (
    <Dropdown
      open={isMobile ? open : undefined}
      className="fit-hight"
      overlay={menu}
      placement="bottomRight"
      arrow
    >
      <ButtonComponent
        onClick={isMobile ? () => setOpen((o) => !o) : undefined}
        type="text"
        className="d-flex align-items-center h-100"
      >
        <UserAvatar value={name} />
        {isDesktop ? <Typography className={'ml-1'}>{name}</Typography> : <></>}
      </ButtonComponent>
    </Dropdown>
  );
};

export default UserDetailsComponent;
