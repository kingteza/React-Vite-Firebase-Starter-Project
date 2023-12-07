import { useCallback, useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

type ValidParamTypes = NumberConstructor | StringConstructor | ArrayConstructor;

type Params<T> = {
  [K in keyof T]: ValidParamTypes;
};

export interface UsePaginationProps<T> {
  initPageSize?: number;
  approvedSizes?: number[];
  params?: Params<T>;
}

export function usePagination<T = {}>({
  initPageSize = 25,
  approvedSizes = [25],
  params: approvedParams,
}: UsePaginationProps<T> = {}): {
  page: number;
  setPage: (value: number) => void;
  pageSize: number;
  setPageSize: (value: number) => void;
  setParams: (t: T) => void;
} & T {
  const [params, setParams] = useSearchParams();

  const page = useMemo(() => {
    const p = params.get('p');
    return p ? (!isNaN(Math.max(Number(p), 1)) ? Math.max(Number(p), 1) : 1) : 1;
  }, [params]);

  const [props, setProps] = useState<T>({} as any);
  useEffect(() => {
    const paramReturn: T = {} as any;
    for (const key in approvedParams) {
      const Obj = approvedParams[key];
      if (Obj) {
        let item: any = params.get(key as any);
        if (item) {
          if (Obj === Number) {
            paramReturn[key] = Number(item) as any;
          } else if (Obj === String) {
            paramReturn[key] = item as any;
          } else if (Obj === Array) {
            if (item?.includes(',')) item = item.split(',');
            else item = [item];
            paramReturn[key] = item.map((s: any)=> isNaN(s) ? s : Number(s));
          }
        }
      }
    }
    setProps(paramReturn);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params]);

  const pageSize = useMemo(() => {
    const p = params.get('ps');
    let ps = !isNaN(Math.max(Number(p), initPageSize))
      ? Math.max(Number(p), initPageSize)
      : initPageSize;
    for (let i = 0; i < approvedSizes.length; i++) {
      const e = approvedSizes[i];
      if (ps > e) ps = e;
    }
    return ps;
  }, [approvedSizes, initPageSize, params]);

  const setPageSize = useCallback(
    async (pageSize: number) => {
      setParams(
        (p) => {
          const newParams = new URLSearchParams(p);
          newParams.set('ps', String(pageSize));
          return newParams;
        },
        {
          replace: true,
        },
      );
    },
    [setParams],
  );

  const setPage = useCallback(
    async (page: number) => {
      setParams(
        (p) => {
          const newParams = new URLSearchParams(p);
          newParams.set('p', String(page));
          return newParams;
        },
        {
          replace: true,
        },
      );
    },
    [setParams],
  );

  const _setParams = useCallback(
    async (t: T) => {
      setParams(
        (params) => {
          const newParams = new URLSearchParams(params);
          for (const p in t) {
            if (approvedParams?.[p]) {
              const value = t[p as any];
              if (value) newParams.set(p, Array.isArray(value) ? value.join(',') : value);
            }
          }
          return newParams;
        },
        {
          replace: true,
        },
      );
    },
    [approvedParams, setParams],
  );

  return {
    ...props,
    page,
    setPage,
    pageSize,
    setPageSize,
    setParams: _setParams,
  };
}
