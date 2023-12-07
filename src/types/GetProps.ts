/* *****************************************************************************
 Copyright (c) 2020-2022 Kingteza and/or its affiliates. All rights reserved.
 KINGTEZA PROPRIETARY/CONFIDENTIAL. Use is subject to license terms.
***************************************************************************** */

export interface GetRequestReturn<T> {
  count: number;
  data: T;
}

export interface PaginateProps {
  page?: number;
  pageSize?: number;
  all?: boolean;
}
