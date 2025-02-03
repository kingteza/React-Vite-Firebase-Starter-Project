import { Space } from 'antd';
import { FC, PropsWithChildren } from 'react';

const VerticalSpace: FC<PropsWithChildren> = ({ children }) => {
  return (
    <Space direction="vertical" className="w-100">
      {children}
    </Space>
  );
};

export default VerticalSpace;
