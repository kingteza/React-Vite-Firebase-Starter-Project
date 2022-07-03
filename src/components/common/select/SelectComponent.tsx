/* *****************************************************************************
 Copyright (c) 2020-2021 KINGTEZA and/or its affiliates. All rights reserved.
 KINGTEZA PROPRIETARY/CONFIDENTIAL. Use is subject to license terms.
***************************************************************************** */

import { Form, FormItemProps } from 'antd/lib';
import Select, { SelectProps } from 'antd/lib/select';
import React, { ReactElement } from 'react';
import { useTranslation } from 'react-i18next';

import { translations } from '../../../config/localization/translations';

// eslint-disable-next-line no-unused-vars
interface SelectComponentProps<T> extends SelectProps<any>, FormItemProps<any> {
  children?: any[];
  required?: boolean;
  notSearch?: boolean;
  readOnly?: boolean;
  status?: any;
  items?: T[];
  itemBuilder?: (t: T) => ReactElement;
}

function SelectComponent<T = any>({
  label,
  rules = [],
  required,
  placeholder,
  notSearch,
  children,
  readOnly,
  items,
  itemBuilder,
  ...props
}: SelectComponentProps<T>) {
  const { t } = useTranslation();

  return (
    <Form.Item
      label={label}
      name={props.name}
      help={props.help}
      className={props.className}
      rules={[
        ...rules,
        {
          required,
          message: `${label ?? placeholder ?? ''} ${t(
            translations.err.validation.required,
          )}`,
        },
      ]}
    >
      <Select
        open={readOnly ? false : undefined}
        onChange={(!readOnly && props.onChange) as any}
        allowClear={!readOnly && props.allowClear}
        showSearch={!notSearch}
        className={`max-width ${readOnly ? 'readOnly' : ''}`}
        {...props}
        placeholder={placeholder ?? (label as any)}
        filterOption={(input, option) => {
          try {
            return (
              (option as any)?.children.toLowerCase().indexOf(input?.toLowerCase()) >=
                0 ||
              (option as any)?.value
                .toString()
                .toLowerCase()
                .indexOf(input?.toLowerCase()) >= 0
            );
          } catch (err) {
            return true;
          }
        }}
      >
        {children ?? (items && itemBuilder ? items?.map(itemBuilder) : <></>)}
      </Select>
    </Form.Item>
  );
}

export default SelectComponent;
