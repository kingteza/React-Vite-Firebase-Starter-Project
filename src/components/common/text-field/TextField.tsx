/* *****************************************************************************
 Copyright (c) 2020-2021 KINGTEZA and/or its affiliates. All rights reserved.
 KINGTEZA PROPRIETARY/CONFIDENTIAL. Use is subject to license terms.
***************************************************************************** */

import { FormInstance } from 'antd/lib/form/Form';
import FormItem, { FormItemProps } from 'antd/lib/form/FormItem';
import Input from 'antd/lib/input/Input';
import Password from 'antd/lib/input/Password';
import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { translations } from '../../../config/localization/translations';

export interface TextFieldProps extends FormItemProps<any> {
  type?: any;
  placeholder?: string;
  onEnter?: React.KeyboardEventHandler<HTMLInputElement>;
  form?: FormInstance<any>;
  nextFocus?: string;
  autoComplete?: string;
  defaultValue?: any;
  readOnly?: boolean;
  value?: any;
  disabled?: boolean;
  onChange?: (val: any) => void;
}

export const onEnterInternalTextField = (
  e: React.KeyboardEvent<HTMLInputElement>,
  nextFocus?: string,
  form?: FormInstance<any>,
  onEnter?: React.KeyboardEventHandler<HTMLInputElement>,
) => {
  if (nextFocus && form) {
    e.preventDefault();
    form?.getFieldInstance(nextFocus)?.focus();
  }
  if (onEnter) onEnter(e);
};

const TextField: React.FC<TextFieldProps> = ({
  type,
  required,
  label,
  disabled,
  rules = [],
  placeholder,
  onEnter,
  form,
  nextFocus,
  autoComplete = 'off',
  defaultValue,
  readOnly,
  value,
  ...props
}) => {
  const { t } = useTranslation();

  const r = useMemo(
    () => [
      ...rules,
      {
        required,
        message: `${label ?? placeholder ?? ''} ${t(
          translations.err.validation.required,
        )}`,
      },
    ],
    [rules, label, placeholder, t, required],
  );

  const inputProps = {
    disabled: disabled,
    value: value,
    readOnly: readOnly,
    defaultValue: defaultValue,
    autoComplete: autoComplete,
    onPressEnter: (e) => onEnterInternalTextField(e, nextFocus, form, onEnter),
    type: type as any,
    placeholder: placeholder ?? (label as any),
  };
  const Component = type == 'password' ? Password : Input;
  return (
    <FormItem {...props} label={label} rules={r}>
      <Component {...inputProps} />
    </FormItem>
  );
};

export default TextField;
