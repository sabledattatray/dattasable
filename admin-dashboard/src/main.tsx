'use client';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router';
import BreakpointsProvider from 'providers/BreakpointsProvider';
import SettingsPanelProvider from 'providers/SettingsPanelProvider';
import SettingsProvider from 'providers/SettingsProvider';
import ThemeProvider from 'providers/ThemeProvider';
import { SessionProvider } from 'next-auth/react';
import router from 'routes/router';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <SettingsProvider>
      <ThemeProvider>
        <BreakpointsProvider>
          <SettingsPanelProvider>
            <SessionProvider>
              <RouterProvider router={router} />
            </SessionProvider>
          </SettingsPanelProvider>
        </BreakpointsProvider>
      </ThemeProvider>
    </SettingsProvider>
  </StrictMode>,
);
