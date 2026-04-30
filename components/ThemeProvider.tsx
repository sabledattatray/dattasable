'use client';

import * as React from 'react';

type Theme = 'dark' | 'light';

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = React.createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = React.useState<Theme>('dark');
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    // Determine initial theme safely
    let savedTheme: Theme | null = null;
    try {
      savedTheme = localStorage.getItem('theme') as Theme;
    } catch (e) {
      console.warn('LocalStorage access denied:', e);
    }

    const initialTheme = savedTheme || 'dark';
    
    setThemeState(initialTheme);
    document.documentElement.classList.toggle('light', initialTheme === 'light');
    setMounted(true);
  }, []);

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
    try {
      localStorage.setItem('theme', newTheme);
    } catch (e) {
      console.warn('LocalStorage setItem failed:', e);
    }
    document.documentElement.classList.toggle('light', newTheme === 'light');
  };

  // Provide a stable context value
  const value = React.useMemo(() => ({
    theme,
    setTheme
  }), [theme]);

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = React.useContext(ThemeContext);
  if (context === undefined) {
    // Provide a default that doesn't crash
    return { 
      theme: 'dark' as Theme, 
      setTheme: (t: Theme) => console.warn('ThemeProvider not found') 
    };
  }
  return context;
}
