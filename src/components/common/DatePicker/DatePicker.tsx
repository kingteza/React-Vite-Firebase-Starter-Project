/* *****************************************************************************
 Copyright (c) 2020-2022 Kingteza and/or its affiliates. All rights reserved.
 KINGTEZA PROPRIETARY/CONFIDENTIAL. Use is subject to license terms.
***************************************************************************** */

import DatePicker from 'antd/lib/date-picker';
import { FormInstance, FormItemProps } from 'antd/lib/form';
import FormItem from 'antd/lib/form/FormItem';
import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { translations } from '../../../config/localization/translations';

export interface DatePickerComponentProps extends FormItemProps<any> {
  type?: any;
  placeholder?: string;
  onEnter?: React.KeyboardEventHandler<HTMLInputElement>;
  form?: FormInstance<any>;
  nextFocus?: string;
  autoComplete?: string;
}

const DatePickerComponent: FC<DatePickerComponentProps> = ({
  type,
  required,
  label,
  rules = [],
  placeholder,
  onEnter,
  form,
  nextFocus,
  autoComplete = 'off',
  ...props
}) => {
  const { t } = useTranslation();

  return (
    <FormItem
      {...props}
      label={label}
      rules={[
        {
          required,
          message: `${label ?? placeholder ?? ''} ${t(
            translations.err.validation.required,
          )}`,
        },
        ...rules,
      ]}
    >
      <DatePicker className="w-100" placeholder={placeholder} />
    </FormItem>
  );
};

export default DatePickerComponent;
