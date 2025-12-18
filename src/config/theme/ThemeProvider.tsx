/* *****************************************************************************
 Copyright (c) 2020-2022 Kingteza and/or its affiliates. All rights reserved.
 KINGTEZA PROPRIETARY/CONFIDENTIAL. Use is subject to license terms.
***************************************************************************** */

import { useLocalStorage, useMediaQuery } from '@uidotdev/usehooks';
import { App, ConfigProvider, theme } from 'antd';
import React, {
  createContext,
  FC,
  PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

import ModalProvider from './ModalProvider';
const { defaultAlgorithm, darkAlgorithm } = theme;
import { createStyles } from 'antd-style';

import './ThemeRelatedStyles.css';
type RawMode = 'dark' | 'light';
type Mode = RawMode | 'system';

export interface ThemeContextProps {
  mode: Mode;
  modeExtracted: RawMode;
  set: (mode?: Mode) => void;
  getColor: (hexColor: string) => {
    background: string;
    foreground: string;
  };
}

const ThemeContext = createContext<ThemeContextProps>({
  mode: 'light',
} as any);

function getSystemTheme() {
  if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    // Dark mode
    return 'dark';
  } else {
    // Light mode
    return 'light';
  }
}

const primaryColor = `#0059ff`;

export const useTheme = () => useContext(ThemeContext);

const ThemeProvider: FC<PropsWithChildren> = ({ children }) => {
  const [mode, setMode] = useLocalStorage<Mode>('theme', 'system');

  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const modeExtracted = useMemo(() => {
    return mode === 'system' ? (prefersDarkMode ? 'dark' : 'light') : mode;
  }, [mode, prefersDarkMode]);

  useEffect(() => {
    const isDark = modeExtracted === 'dark';
    document.documentElement.style.display = 'none';
    document.documentElement.setAttribute('data-color-scheme', isDark ? 'dark' : 'light');
    document.documentElement.style.display = '';
  }, [mode, modeExtracted, prefersDarkMode]);
  const { styles: segmentedStyles } = useSegmentedStyle();
  const getColor = useCallback(
    (hexColor: string) => {
      if (modeExtracted === 'light') {
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
    [modeExtracted],
  );

  return (
    <ConfigProvider
      direction="ltr"
      theme={{
        algorithm: modeExtracted === 'dark' ? darkAlgorithm : defaultAlgorithm,
        token: {
          colorPrimary: primaryColor,
        },
        hashed: false,
      }}
      segmented={{ className: segmentedStyles.segmented }}
    >
      <ThemeContext.Provider
        value={{
          modeExtracted,
          getColor,
          mode: mode,
          set: (e) =>
            setMode(
              (x) => e ?? (x === 'light' ? 'dark' : x === 'dark' ? 'system' : 'light'),
            ),
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
  ModalProvider();
  const { modeExtracted } = useTheme();

  useEffect(() => {
    const htmlEl = document.documentElement;
    const bodyEl = document.body;

    // Remove previous theme markers
    htmlEl.classList.remove('dark', 'light');
    bodyEl.classList.remove('dark', 'light');

    // Add current theme markers (Tailwind expects 'dark')
    if (modeExtracted === 'dark') {
      htmlEl.classList.add('dark');
      bodyEl.classList.add('dark');
    } else {
      htmlEl.classList.add('light');
      bodyEl.classList.add('light');
    }

    return () => {
      htmlEl.classList.remove('dark', 'light');
      bodyEl.classList.remove('dark', 'light');
    };
  }, [modeExtracted]);

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

const useSegmentedStyle = createStyles(({ prefixCls, css }) => ({
  segmented: css`
    /* Dark mode styles */
    [data-color-scheme='dark'] & {
      .ant-segmented {
        padding: 4px;
        background-color: rgba(0, 0, 0, 0.6);
        border-radius: 10px;
      }

      .ant-segmented-group {
        border: 1px solid #303030;
        background-color: #1e1e1ed8;
        padding: 4px;
        border-radius: 10px;
      }

      .ant-segmented-item {
        border-radius: 10px !important;
        color: #ffffff;
        transition: all 0.3s ease;
      }

      .ant-segmented-item-selected {
        background-color: ${primaryColor} !important;
        color: white !important;
        font-weight: 500;
      }

      .ant-segmented-thumb {
        background-color: #3082fc !important;
        border-radius: 10px !important;
      }
    }

    /* Light mode styles */
    [data-color-scheme='light'] & {
      .ant-segmented {
        padding: 4px;
        background-color: rgba(255, 255, 255, 0.85);
        border-radius: 10px;
      }

      .ant-segmented-group {
        border: 1px solid #e5e5e5;
        background-color: #ffffff;
        padding: 4px;
        border-radius: 10px;
      }

      .ant-segmented-item {
        border-radius: 10px !important;
        color: #000000;
        transition: all 0.3s ease;
      }

      .ant-segmented-item-selected {
        background-color: ${primaryColor} !important;
        color: white !important;
        font-weight: 500;
      }

      .ant-segmented-thumb {
        background-color: #e6f0ff !important;
        border-radius: 10px !important;
      }
    }

    .ant-segmented-item-label {
      padding: 8px 24px;
      font-size: 18px;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  `,
}));
