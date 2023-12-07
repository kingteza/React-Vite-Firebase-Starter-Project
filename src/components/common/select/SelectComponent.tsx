/* *****************************************************************************
 Copyright (c) 2020-2021 KINGTEZA and/or its affiliates. All rights reserved.
 KINGTEZA PROPRIETARY/CONFIDENTIAL. Use is subject to license terms.
***************************************************************************** */

import { ConfigProvider, Form, FormItemProps, Select, SelectProps, Spin } from 'antd';
import { RefSelectProps } from 'antd/lib/select';
import React, { ReactElement, useCallback } from 'react';
import { useTranslation } from 'react-i18next';

import { translations } from '../../../config/localization/translations';

// eslint-disable-next-line no-unused-vars
interface SelectComponentProps<T> extends SelectProps<any>, FormItemProps<any> {
  children?: any[];
  required?: boolean;
  notSearch?: boolean;
  readOnly?: boolean;
  status?: any;
  nameFieldInArray?: string;
  items?: T[];
  showLoadingInEmptyIndicator?: boolean;
  itemBuilder?: (t: T) => ReactElement;
  dropdownRender?: (menu: ReactElement) => ReactElement;
  innerRef?: React.Ref<RefSelectProps>;
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
  dropdownRender,
  itemBuilder,
  loading,
  showLoadingInEmptyIndicator,
  nameFieldInArray = 'name',
  innerRef,
  ...props
}: SelectComponentProps<T>) {
  const { t } = useTranslation();
  const _itemBuilder = useCallback(
    (value) => {
      const key =
        typeof value === 'string' || typeof value === 'number' ? value : value.id;
      const val =
        typeof value === 'string' || typeof value === 'number'
          ? value
          : value[nameFieldInArray];
      return (
        <option key={key} value={key}>
          <div dangerouslySetInnerHTML={{ __html: val }} />
        </option>
      );
    },
    [nameFieldInArray],
  );
  return (
    <ConfigProvider
      renderEmpty={showLoadingInEmptyIndicator && loading ? () => <Spin /> : undefined}
    >
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
          ref={innerRef}
          loading={loading}
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
          dropdownRender={dropdownRender}
        >
          {children ?? (items && items?.map(itemBuilder ?? _itemBuilder))}
        </Select>
      </Form.Item>
    </ConfigProvider>
  );
}

export default SelectComponent;
