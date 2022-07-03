/* *****************************************************************************
 Copyright (c) 2020-2022 Kingteza and/or its affiliates. All rights reserved.
 KINGTEZA PROPRIETARY/CONFIDENTIAL. Use is subject to license terms.
***************************************************************************** */

import Checkbox from 'antd/lib/checkbox/Checkbox';
import FormItem, { FormItemProps } from 'antd/lib/form/FormItem';
import React, { FC } from 'react';

interface Props extends FormItemProps {
  onChange: (evt: boolean) => void;
}

const CheckBoxComponent: FC<Props> = ({
  onChange,
  label,
  initialValue = false,
  ...props
}) => {
  return (
    <FormItem {...props} valuePropName="checked" initialValue={initialValue}>
      <Checkbox onChange={onChange && ((e) => onChange(e.target.checked))}>
        {label}
      </Checkbox>
    </FormItem>
  );
};

export default CheckBoxComponent;
