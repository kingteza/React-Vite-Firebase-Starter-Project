/* *****************************************************************************
 Copyright (c) 2020-2022 Kingteza and/or its affiliates. All rights reserved.
 KINGTEZA PROPRIETARY/CONFIDENTIAL. Use is subject to license terms.
***************************************************************************** */

import { createAvatar } from '@dicebear/avatars';
import * as style from '@dicebear/avatars-initials-sprites';
import { Avatar, Tooltip } from 'antd';
import { AvatarSize } from 'antd/es/avatar/AvatarContext';
import UserModel from 'models/user/User';
import React, { FC, useMemo } from 'react';

interface UserAvatarProps {
  value: string | UserModel;
  src?: string;
  shouldShowNameOnly?: boolean;
  size?: AvatarSize;
}
const UserAvatar: FC<UserAvatarProps> = ({
  value,
  src,
  shouldShowNameOnly,
  size = 'large',
}) => {
  const val = useMemo(() => (typeof value === 'string' ? value : value?.name), [value]);

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const image = useMemo(
    () =>
      src ??
      createAvatar(style, {
        seed: val,
        dataUri: true,
        // ... and other options
      }),
    [src, val],
  );
  if (shouldShowNameOnly) return <>{value}</>;
  return (
    <Tooltip title={val}>
      <Avatar draggable={false} src={image} size={size} />
    </Tooltip>
  );
};

export default UserAvatar;
