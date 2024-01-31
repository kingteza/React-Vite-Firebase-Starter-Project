/* *****************************************************************************
 Copyright (c) 2020-2022 Kingteza and/or its affiliates. All rights reserved.
 KINGTEZA PROPRIETARY/CONFIDENTIAL. Use is subject to license terms.
***************************************************************************** */

import { UserOutlined } from '@ant-design/icons';
import { initials } from '@dicebear/collection';
import { createAvatar } from '@dicebear/core';
import { Avatar, Tooltip } from 'antd';
import React, { FC, useEffect, useMemo, useState } from 'react';

interface UserAvatarProps {
  value: string;
  src?: string;
  shouldShowNameOnly?: boolean;
}
const UserAvatar: FC<UserAvatarProps> = ({ value, src, shouldShowNameOnly }) => {
  const [_value, set_value] = useState<string>();

  useEffect(() => {
    if (value) {
      const rst = createAvatar(initials, {
        seed: value,
        backgroundType: ['gradientLinear'],
        // ... and other options
      }).toDataUriSync();
      console.log(rst);
      set_value(rst);
    }
  }, [value]);

  if (shouldShowNameOnly) return <>{value}</>;

  // eslint-disable-next-line react-hooks/rules-of-hooks
  // const image = useMemo(
  //   () =>
  //     src ??
  //     createAvatar(initials, {
  //       seed: 'Felix',
  //       backgroundType: ['gradientLinear', 'solid'],
  //       // ... and other options
  //     })
  //       .png({})
  //       .toDataUri(),
  //   [src, value],
  // );

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
