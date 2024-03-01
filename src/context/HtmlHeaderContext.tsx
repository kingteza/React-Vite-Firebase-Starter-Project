import React, { createContext, ReactNode, useContext, useState } from 'react';

// Define the context type
interface HtmlHeaderContextType {
  pageTitle: string;
  updatePageTitle: (title: string, suffix?: string) => void;
}

const HtmlHeaderContext = createContext<HtmlHeaderContextType | undefined>(undefined);

export const useHtmlHeader = () => {
  const context = useContext(HtmlHeaderContext);
  return context;
};

interface HtmlHeaderProviderProps {
  defaultTitleSuffix?: string;
  children: ReactNode;
}

export const HtmlHeaderProvider: React.FC<HtmlHeaderProviderProps> = ({
  defaultTitleSuffix = ' | KING POS',
  children,
}: HtmlHeaderProviderProps) => {
  const [pageTitle, setPageTitle] = useState('');

  // Function to update the page tab title with optional suffix
  const updatePageTitle = (title: string, suffix = '') => {
    document.title = title + (suffix ? ` | ${suffix}` : defaultTitleSuffix);
    setPageTitle(title);
  };

  const contextValue: HtmlHeaderContextType = {
    pageTitle,
    updatePageTitle,
  };

  return (
    <HtmlHeaderContext.Provider value={contextValue}>
      {children}
    </HtmlHeaderContext.Provider>
  );
};
