/* *****************************************************************************
 Copyright (c) 2020-2022 Kingteza and/or its affiliates. All rights reserved.
 KINGTEZA PROPRIETARY/CONFIDENTIAL. Use is subject to license terms.
***************************************************************************** */

import { useLocalStorage } from '@uidotdev/usehooks';
import { App, ConfigProvider, theme } from 'antd';
import React, {
  createContext,
  FC,
  PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
} from 'react';

import ModalProvider from './ModalProvider';
const { defaultAlgorithm, darkAlgorithm } = theme;
import './ThemeRelatedStyles.css';

type Mode = 'dark' | 'light';

export interface ThemeContextProps {
  mode: Mode;
  set: (mode?: Mode) => void;
  getColor: (hexColor: string) => {
    background: string;
    foreground: string;
  };
}

const ThemeContext = createContext<ThemeContextProps>({
  mode: 'light',
} as any);

// eslint-disable-next-line react-hooks/rules-of-hooks
export const useTheme = () => useContext(ThemeContext);

const ThemeProvider: FC<PropsWithChildren> = ({ children }) => {
  const [mode, setMode] = useLocalStorage<Mode>('theme', 'light');

  useEffect(() => {
    // https://stackoverflow.com/questions/65940522/how-do-i-switch-to-chromes-dark-scrollbar-like-github-does
    const isDark = mode === 'dark';
    document.documentElement.setAttribute('data-color-scheme', isDark ? 'dark' : 'light');
    document.documentElement.classList.add(mode);
    return () => {
      document.documentElement.classList.remove(mode);
    };
  }, [mode]);

  const getColor = useCallback(
    (hexColor: string) => {
      if (mode === 'light') {
        return {
          background: hexColor,
          foreground: getForegroundColor(hexColor),
        };
      } else {
        return {
          background: darkenColor(hexColor, 0.85),
          foreground: getForegroundColor(hexColor),
        };
      }
    },
    [mode],
  );

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
          getColor,
          mode: mode,
          set: (e) => setMode((x) => e ?? (x === 'light' ? 'dark' : 'light')),
        }}
      >
        <App>
          <TempChild>{children}</TempChild>
        </App>
      </ThemeContext.Provider>
    </ConfigProvider>
  );
};

const TempChild: FC<PropsWithChildren> = ({ children }) => {
  const { mode } = useTheme();

  useEffect(() => {
    document.body.classList.add(mode);

    // Cleanup function to remove the class when the component unmounts
    return () => {
      document.body.classList.remove(mode);
    };
  }, [mode]);

  ModalProvider();
  return children;
};

export default ThemeProvider;

function darkenColor(hexColor, factor) {
  // Convert hex to RGB
  let r = parseInt(hexColor.slice(1, 3), 16);
  let g = parseInt(hexColor.slice(3, 5), 16);
  let b = parseInt(hexColor.slice(5, 7), 16);

  // Darken each RGB component by the given factor
  r = Math.floor(r * factor);
  g = Math.floor(g * factor);
  b = Math.floor(b * factor);

  // Convert back to hex
  return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b
    .toString(16)
    .padStart(2, '0')}`;
}

function getForegroundColor(hexColor) {
  // Convert hex to RGB
  let r = parseInt(hexColor.slice(1, 3), 16);
  let g = parseInt(hexColor.slice(3, 5), 16);
  let b = parseInt(hexColor.slice(5, 7), 16);

  // Calculate the perceptive luminance
  let luma = (0.299 * r + 0.587 * g + 0.114 * b) / 255;

  // Return black for bright colors, white for dark colors
  return luma > 0.2 ? '#000000' : '#FFFFFF';
}
