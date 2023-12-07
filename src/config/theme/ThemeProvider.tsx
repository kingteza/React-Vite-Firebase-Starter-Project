/* *****************************************************************************
 Copyright (c) 2020-2022 Kingteza and/or its affiliates. All rights reserved.
 KINGTEZA PROPRIETARY/CONFIDENTIAL. Use is subject to license terms.
***************************************************************************** */

import { ConfigProvider, theme } from 'antd';
import React, {
  createContext,
  FC,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from 'react';
const { defaultAlgorithm, darkAlgorithm } = theme;

type Mode = 'dark' | 'light';
const ThemeContext = createContext<{ mode: Mode; set: (mode?: Mode) => void }>({
  mode: 'light',
} as any);

// eslint-disable-next-line react-hooks/rules-of-hooks
export const useTheme = () => useContext(ThemeContext);

const ThemeProvider: FC<PropsWithChildren> = ({ children }) => {
  const [mode, setMode] = useState<Mode>('dark');

  useEffect(() => {
    // https://stackoverflow.com/questions/65940522/how-do-i-switch-to-chromes-dark-scrollbar-like-github-does
    document.documentElement.style.display = 'none';
    const isDark = mode === 'dark';
    document.documentElement.setAttribute(
      'data-color-scheme',
      isDark ? 'dark' : 'light'
    );
    document.body.clientWidth;
    document.documentElement.style.display = '';

  }, [mode]);
  return (
    <ConfigProvider
      direction="ltr"
      theme={{
        algorithm: mode === 'dark' ? darkAlgorithm : defaultAlgorithm,
        token: {
          colorPrimary: '#0059ff',
        },
      }}
    >
      <ThemeContext.Provider
        value={{
          mode: mode,
          set: (e) => setMode((x) => e ?? (x === 'light' ? 'dark' : 'light')),
        }}
      >
        {children}
      </ThemeContext.Provider>
    </ConfigProvider>
  );
};

export default ThemeProvider;
