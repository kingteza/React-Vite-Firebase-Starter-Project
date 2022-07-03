/* *****************************************************************************
 Copyright (c) 2020-2021 KINGTEZA and/or its affiliates. All rights reserved.
 KINGTEZA PROPRIETARY/CONFIDENTIAL. Use is subject to license terms.
***************************************************************************** */

import { FormInstance } from 'antd/lib/form/Form';
import FormItem, { FormItemProps } from 'antd/lib/form/FormItem';
import TextArea, { TextAreaProps } from 'antd/lib/input/TextArea';
import React, { InputHTMLAttributes } from 'react';
import { useTranslation } from 'react-i18next';

import { translations } from '../../../config/localization/translations';

export interface TextFieldProps extends TextAreaProps, FormItemProps<any> {
  type?: InputHTMLAttributes<HTMLInputElement>;
  placeholder?: string;
  status?: any;
  onEnter?: React.KeyboardEventHandler<HTMLInputElement>;
  form?: any;
  nextFocus?: string;
  children?: any;
  name?: any;
  onReset?: any;
}

export const onEnterInternalTextField = (
  e: React.KeyboardEvent<HTMLTextAreaElement>,
  nextFocus?: string,
  form?: FormInstance<any>,
  onEnter?: React.KeyboardEventHandler<HTMLInputElement>,
) => {
  if (nextFocus && form) {
    e.preventDefault();
    form?.getFieldInstance(nextFocus)?.focus();
  }
  if (onEnter) onEnter(e as any);
};

const TextAreaComponent: React.FC<TextFieldProps> = ({
  required,
  label,
  rules = [],
  placeholder,
  onEnter,
  form,
  nextFocus,
  className,
  ...props
}) => {
  const { t } = useTranslation();
  return (
    <FormItem
      {...props}
      className={className}
      label={label}
      rules={[
        ...rules,
        {
          required,
          message: `${label} ${t(translations.err.validation.required)}`,
        },
      ]}
    >
      <TextArea
        {...props}
        className={className}
        onPressEnter={(e) => onEnterInternalTextField(e, nextFocus, form, onEnter)}
        placeholder={placeholder ?? (label as any)}
      />
    </FormItem>
  );
};

export default TextAreaComponent;
