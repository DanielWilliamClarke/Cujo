import React, { useState, useEffect } from 'react';
import ThemeContext, { initialThemeState } from './ThemeContext';

type ThemeProviderProps = {
  children?: React.ReactNode;
};

export const ThemeProvider: React.FC<ThemeProviderProps> = ({
  children,
}: ThemeProviderProps) => {
  const [theme, setTheme] = useState(initialThemeState.theme);
  const [storage, setStorage] = useState<Storage | undefined>(undefined);

  useEffect(() => {
    setStorage(window.localStorage);
  }, []);

  useEffect(() => {
    const savedThemeLocal = storage?.getItem('globalTheme');

    if (savedThemeLocal) {
      setTheme(savedThemeLocal);
    }
  }, [storage]);

  useEffect(() => {
    storage?.setItem('globalTheme', theme);
  }, [theme, storage]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <div className={`theme--${theme}`}>{children}</div>
    </ThemeContext.Provider>
  );
};
