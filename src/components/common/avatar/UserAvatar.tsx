/* *****************************************************************************
 Copyright (c) 2020-2022 Kingteza and/or its affiliates. All rights reserved.
 KINGTEZA PROPRIETARY/CONFIDENTIAL. Use is subject to license terms.
***************************************************************************** */

import { createAvatar } from '@dicebear/avatars';
import * as style from '@dicebear/avatars-initials-sprites';
import { Avatar, Tooltip } from 'antd';
import React, { FC, useMemo } from 'react';

interface UserAvatarProps {
  value: string;
  src?: string;
  shouldShowNameOnly?: boolean;
}
const UserAvatar: FC<UserAvatarProps> = ({ value, src, shouldShowNameOnly }) => {
  if (shouldShowNameOnly) return <>{value}</>;

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const image = useMemo(
    () =>
      src ??
      createAvatar(style, {
        seed: value,
        dataUri: true,
        // ... and other options
      }),
    [src, value],
  );

  return (
    <Tooltip title={value}>
      <Avatar draggable={false} src={image} size="large" />
    </Tooltip>
  );
};

export default UserAvatar;
