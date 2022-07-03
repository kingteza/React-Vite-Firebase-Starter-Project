/* *****************************************************************************
 Copyright (c) 2020-2021 KINGTEZA and/or its affiliates. All rights reserved.
 KINGTEZA PROPRIETARY/CONFIDENTIAL. Use is subject to license terms.
***************************************************************************** */
import Tooltip from 'antd/lib/tooltip';
import Button, { ButtonProps } from 'antd-button-color';
import React, { useMemo } from 'react';
import { useNavigate } from 'react-router';

interface ButtonComponentProps extends ButtonProps {
  to?: string | number;
  tooltip?: string | undefined;
}

const ButtonComponent: React.FC<ButtonComponentProps> = ({
  className,
  to,
  onClick,
  tooltip,
  ...props
}) => {
  const navigate = useNavigate();

  const btn = useMemo(
    () => (
      <Button
        onClick={onClick ? onClick : to ? () => navigate(to as any) : undefined}
        className={className}
        {...props}
      />
    ),
    [className, navigate, onClick, props, to],
  );
  return tooltip ? <Tooltip title={tooltip}>{btn}</Tooltip> : btn;
};

export default ButtonComponent;
