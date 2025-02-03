/* *****************************************************************************
 Copyright (c) 2020-2022 Kingteza and/or its affiliates. All rights reserved.
 KINGTEZA PROPRIETARY/CONFIDENTIAL. Use is subject to license terms.
***************************************************************************** */

import {
  AlertOutlined,
  LogoutOutlined,
  TranslationOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Button, Dropdown, Menu, Typography } from 'antd';
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
import AuthService from 'services/AuthService';

export const onClickChangeLanguage = async (i18n) => {
  const lang = i18n.language === 'en' ? 'si' : 'en';
  i18n.changeLanguage(lang);
  localStorage.setItem('language', lang);
};

export interface UserDetailsComponentProps {}

const UserDetailsComponent = () => {
  const { name, id, role } = useUserContext() ?? {};
  const { isDesktop } = useWindowDimensions();
  const { t, i18n } = useTranslation();

  const logoutLocal = async () => {
    await AuthService.logout();
  };

  const { isMobile } = useWindowDimensions();
  const [open, setOpen] = useState(false);

  const { mode, set } = useTheme();

  const isDark = useMemo(() => mode === 'dark', [mode]);
  return (
    <Dropdown
      open={isMobile ? open : undefined}
      className="fit-hight"
      menu={{
        items: [
          {
            key: '0',
            label: name,
            icon: role === Role.ADMIN ? <AdminIcon className="mr-2" /> : <UserOutlined />,
            style: {
              cursor: 'initial',
              color: mode === 'dark' ? 'white' : 'rgba(0, 0, 0, 0.88)',
            },
            disabled: true,
          },
          {
            key: '1',
            icon: <AlertOutlined />,
            onClick: () => set(),
            label: `${t(translations.str.darkMode)} ${isDark ? t(translations.str.enabled) : t(translations.str.disabled)}`,
          },
          {
            key: '2',
            label: `${t(translations.str.language)} ${i18n.language.toUpperCase()}`,
            icon: <TranslationOutlined />,
            onClick: () => onClickChangeLanguage(i18n),
          },
          {
            key: '3',
            label: t(translations.str.logout),
            icon: <LogoutOutlined />,
            onClick: logoutLocal,
          },
        ],
      }}
      placement="bottomRight"
      arrow
    >
      <Button
        onClick={isMobile ? () => setOpen((o) => !o) : undefined}
        type="text"
        className="d-flex align-items-center h-100"
      >
        <UserAvatar value={name} />
        {isDesktop ? <Typography className={'ml-1'}>{name}</Typography> : <></>}
      </Button>
    </Dropdown>
  );
};

export default UserDetailsComponent;
