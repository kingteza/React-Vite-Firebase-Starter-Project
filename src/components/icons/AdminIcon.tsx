import { CustomIconComponentProps } from '@ant-design/icons/lib/components/Icon';
import icon from '@iconify/icons-eos-icons/admin-outlined';
import KIcon from 'components/common/icon/KIcon';
import React from 'react';

export default ((props) => {
  return <KIcon {...props} icon={icon} />;
}) as React.FC<Partial<CustomIconComponentProps>>;
