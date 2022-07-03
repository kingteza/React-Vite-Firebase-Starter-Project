/* *****************************************************************************
 Copyright (c) 2020-2021 KINGTEZA and/or its affiliates. All rights reserved.
 KINGTEZA PROPRIETARY/CONFIDENTIAL. Use is subject to license terms.
***************************************************************************** */

import Table, { ColumnsType, TableProps } from 'antd/lib/table/Table';
import React, { useMemo } from 'react';

const PageConstant = {
  SIZE: 10,
};

interface TableComponentProps<T> extends TableProps<T> {
  minusHeight?: number;
  count?: number;
  dataSource?: T[];
  columns: {
    dataIndex?: keyof T;
    render?: (_, record: T) => React.ReactNode;
    hidden?: boolean;
  }[] &
    ColumnsType<T>;
  onPageSizeChanged?: (page: number, pageSize: number) => void;
}

function TableComponent<T>({
  minusHeight,
  onRow = ({ id }: any) => id,
  count = 1,
  onPageSizeChanged,
  pagination = false,
  rowKey = 'id',
  columns,
  className,
  ...props
}: TableComponentProps<T>) {
  const cols = useMemo(() => columns.filter((val: any) => !val.hidden), [columns]);
  return (
    <Table
      className={`custom-scroll ${className}`}
      style={{ width: '100%' }}
      columns={cols}
      rowKey={rowKey as any}
      onRow={onRow as any}
      {...(props as any)}
      scroll={{
        // y: `calc(100vh - ${minusHeight ?? 0}px)`,
        x: true,
        // scrollToFirstRowOnChange: true,
      }}
      pagination={
        pagination && {
          ...pagination,
          hideOnSinglePage: true,
          showSizeChanger: false,
        }
      }
    />
  );
}

export default TableComponent;
