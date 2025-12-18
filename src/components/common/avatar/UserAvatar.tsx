/* *****************************************************************************
 Copyright (c) 2020-2022 Kingteza and/or its affiliates. All rights reserved.
 KINGTEZA PROPRIETARY/CONFIDENTIAL. Use is subject to license terms.
***************************************************************************** */

import { UserOutlined } from '@ant-design/icons';
import { initials } from '@dicebear/collection';
import { createAvatar } from '@dicebear/core';
import { Avatar, Tooltip } from 'antd';
import { FC, useEffect, useState } from 'react';

interface UserAvatarProps {
  value: string;
  src?: string;
  shouldShowNameOnly?: boolean;
}
const UserAvatar: FC<UserAvatarProps> = ({ value, src, shouldShowNameOnly }) => {
  const [_value, set_value] = useState<string>();

  useEffect(() => {
    if (value) {
      try {
        const seed = value.replace(/\p{Emoji}/gu, '');
        const rst = createAvatar(initials, {
          seed,
          backgroundType: ['gradientLinear'],
          // ... and other options
        }).toDataUri();
        set_value(rst);
      } catch {
        // Ignore
      }
    }
  }, [value]);

  if (shouldShowNameOnly) return <>{value}</>;

  return (
    <Tooltip title={value}>
      <Avatar
        draggable={false}
        src={src ?? _value}
        size="large"
        icon={!(src ?? _value) ? <UserOutlined /> : undefined}
      />
    </Tooltip>
  );
};

export default UserAvatar;
