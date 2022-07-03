/* *****************************************************************************
 Copyright (c) 2020-2021 KINGTEZA and/or its affiliates. All rights reserved.
 KINGTEZA PROPRIETARY/CONFIDENTIAL. Use is subject to license terms.
***************************************************************************** */

import { InputNumber } from 'antd';
import FormItem from 'antd/lib/form/FormItem';
import React, { ReactNode, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { translations } from '../../../config/localization/translations';
import { onEnterInternalTextField, TextFieldProps } from './TextField';

interface NumberTextFieldProps extends TextFieldProps {
  moneyField?: boolean;
  addonAfter?: ReactNode;
  minLength?: number;
  isInt?: boolean;
}

function isNumeric(str: any) {
  if (typeof str !== 'string') return false; // we only process strings!
  return (
    !Number.isNaN(str) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
    !Number.isNaN(parseFloat(str))
  ); // ...and ensure strings of whitespace fail
}

const NumberTextField: React.FC<NumberTextFieldProps> = ({
  // eslint-disable-next-line no-unused-vars
  type,
  required,
  label,
  rules = [],
  placeholder,
  onEnter,
  form,
  nextFocus,
  moneyField,
  addonAfter,
  minLength,
  defaultValue,
  disabled,
  readOnly,
  onChange,
  value,
  isInt = false,
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

  return (
    <FormItem {...props} label={label} rules={r}>
      <InputNumber
        disabled={disabled}
        defaultValue={defaultValue}
        value={value}
        readOnly={readOnly}
        minLength={minLength}
        addonAfter={addonAfter}
        step={isInt ? 1 : undefined}
        pattern={isInt ? 'd*' : undefined}
        onChange={onChange}
        onPressEnter={(e) => onEnterInternalTextField(e, nextFocus, form, onEnter)}
        className="max-width"
        // type="number"
        min={0}
        formatter={
          moneyField
            ? (value) => {
                const numeric = isNumeric(value);
                if (numeric) return `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
                else return '';
              }
            : undefined
        }
        parser={
          moneyField
            ? (value) => parseFloat(value?.replace(/\$\s?|(,*)/g, '') ?? '') as any
            : undefined
        }
        placeholder={placeholder ?? (label as any)}
      />
    </FormItem>
  );
};

export default NumberTextField;
