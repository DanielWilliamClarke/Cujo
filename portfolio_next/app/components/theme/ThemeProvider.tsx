import React, { useState, useEffect } from 'react';
import ThemeContext, { initialThemeState } from './ThemeContext';

type ThemeProviderProps = { 
  children?: React.ReactNode
};

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }: ThemeProviderProps) => {
  const [theme, setTheme] = useState(initialThemeState.theme);

  const localStorage = window.localStorage;

  useEffect(() => {
    const savedThemeLocal = localStorage.getItem('globalTheme');

    if (savedThemeLocal) {
      setTheme(savedThemeLocal);
    }
  }, [localStorage]);

  useEffect(() => {
    localStorage.setItem('globalTheme', theme);
  }, [theme, localStorage]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <div className={`theme--${theme}`}>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};
