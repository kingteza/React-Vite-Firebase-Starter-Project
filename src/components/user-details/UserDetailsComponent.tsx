/* *****************************************************************************
 Copyright (c) 2020-2022 Kingteza and/or its affiliates. All rights reserved.
 KINGTEZA PROPRIETARY/CONFIDENTIAL. Use is subject to license terms.
***************************************************************************** */

import {
  AlertOutlined,
  CheckOutlined,
  DesktopOutlined,
  LogoutOutlined,
  MoonOutlined,
  SunOutlined,
  TranslationOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Button, MenuProps } from 'antd';
import { Dropdown, Typography } from 'antd';
import UserAvatar from 'components/common/avatar/UserAvatar';
import ButtonComponent from 'components/common/button/Button';
import AdminIcon from 'components/icons/AdminIcon';
import { translations } from 'config/localization/translations';
import { useTheme } from 'config/theme/ThemeProvider';
import Role from 'constants/role.enum';
import { useUserContext } from 'context/UserContext';
import useWindowDimensions from 'context/WindowDimension';
import React, { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { onClickChangeLanguage } from './util';

export interface UserDetailsComponentProps {}

const UserDetailsComponent = () => {
  const { name, id, role } = useUserContext() ?? {};
  const { isDesktop, isMobile } = useWindowDimensions();
  const { t, i18n } = useTranslation();
  const { mode, set } = useTheme();
  const { modeExtracted } = useTheme();
  const { orgId } = useUserContext() ?? {};

  const logoutLocal = async () => {
    localStorage.removeItem('mfaSkipped');
  };

  const [open, setOpen] = useState(false);

  const items: MenuProps['items'] = useMemo(
    () => [
      {
        key: '0',
        label: `${name} : ${orgId}`,
        icon: role === Role.ADMIN ? <AdminIcon className="mr-2" /> : <UserOutlined />,
        disabled: true,
        style: {
          cursor: 'initial',
          color: modeExtracted === 'dark' ? 'white' : 'rgba(0, 0, 0, 0.88)',
        },
      },
      {
        key: '1',
        label: t(translations.str.theme),
        icon: <AlertOutlined />,
        selectable: false,
        children: [
          {
            key: '1-1',
            label: (
              <span>
                {mode === 'system' && <CheckOutlined className="mr-2" />}
                {t(translations.type.theme.system)}
              </span>
            ),
            icon: <DesktopOutlined />,
            onClick: () => set('system'),
          },
          {
            key: '1-2',
            label: (
              <span>
                {mode === 'light' && <CheckOutlined className="mr-2" />}
                {t(translations.type.theme.light)}
              </span>
            ),
            icon: <SunOutlined />,
            onClick: () => set('light'),
          },
          {
            key: '1-3',
            label: (
              <span>
                {mode === 'dark' && <CheckOutlined className="mr-2" />}
                {t(translations.type.theme.dark)}
              </span>
            ),
            icon: <MoonOutlined />,
            onClick: () => set('dark'),
          },
        ],
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
    [name, orgId, role, modeExtracted, t, mode, set, i18n],
  );

  const selectedKeys = useMemo(() => {
    const themeKey = mode === 'system' ? '1-1' : mode === 'light' ? '1-2' : '1-3';
    return [themeKey];
  }, [mode]);

  return (
    <Dropdown
      open={isMobile ? open : undefined}
      className="fit-hight"
      menu={{ items, selectedKeys }}
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
