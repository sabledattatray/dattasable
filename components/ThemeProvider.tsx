'use client';
import { createContext, useContext } from 'react';

const ThemeContext = createContext({ theme: 'dark', toggle: () => {} });
export const useTheme = () => useContext(ThemeContext);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
    </>
  );
}
