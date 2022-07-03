/* *****************************************************************************
 Copyright (c) 2020-2022 Kingteza and/or its affiliates. All rights reserved.
 KINGTEZA PROPRIETARY/CONFIDENTIAL. Use is subject to license terms.
***************************************************************************** */

import Item, { Meta } from 'antd/lib/list/Item';
import Select from 'antd/lib/select';
import React, { FC } from 'react';

type CustomSelectOptionProps = {
  title: string;
  description?: string;
};

const CustomSelectOption: FC<CustomSelectOptionProps> = ({
  title,
  description,
  children,
}) => {
  return (
    <Item className="">
      <div>
        <Meta title={title} description={description} />
      </div>
      <div className="float-right">{children}</div>
    </Item>
  );
};

export default CustomSelectOption;
