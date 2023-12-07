/* *****************************************************************************
 Copyright (c) 2020-2022 Kingteza and/or its affiliates. All rights reserved.
 KINGTEZA PROPRIETARY/CONFIDENTIAL. Use is subject to license terms.
***************************************************************************** */

import React, { KeyboardEvent, useCallback, useEffect } from 'react';

export const useKeyPress = (
  key: string,
  callback: (e: KeyboardEvent<any>) => void,
  activate = true,
) => {
  const downHandler = useCallback(
    async (e: KeyboardEvent<any>) => {
      if (e.code === key) {
        callback?.(e);
      }
    },
    [callback, key],
  );

  useEffect(() => {
    if (activate) window.addEventListener('keydown', downHandler as any);

    return () => {
      window.removeEventListener('keydown', downHandler as any);
    };
  }, [downHandler, activate]);
};
