'use client';
import React from 'react';
import SettingsProvider from 'providers/SettingsProvider';
import ThemeProvider from 'providers/ThemeProvider';
import BreakpointsProvider from 'providers/BreakpointsProvider';
import SettingsPanelProvider from 'providers/SettingsPanelProvider';
import { BrowserRouter } from 'react-router'; // We use BrowserRouter even in Next.js for the Datta Sable components that depend on it

import { registerIcons } from 'lib/iconify/iconify-register';

export default function AdminDashboardWrapper({ children }: { children: React.ReactNode }) {
  // Register icons once
  React.useEffect(() => {
    registerIcons();
  }, []);

  return (
    <SettingsProvider>
      <ThemeProvider>
        <BreakpointsProvider>
          <SettingsPanelProvider>
            {/* We wrap in BrowserRouter so that Datta Sable's internal Link/useLocation work */}
            {/* basename="/admin" ensures internal links stay within the admin area */}
            <BrowserRouter basename="/admin">
              {children}
            </BrowserRouter>
          </SettingsPanelProvider>
        </BreakpointsProvider>
      </ThemeProvider>
    </SettingsProvider>
  );
}
