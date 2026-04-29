'use client';
import { mainDrawerWidth } from 'lib/constants';

export const fontFamilies = ['Plus Jakarta Sans', 'Syne', 'Kanit', 'Inter', 'Roboto', 'Poppins', '-apple-system'] as const;

export type FontFamily = (typeof fontFamilies)[number];

export interface Config {
  assetsDir: string;
  sidenavCollapsed: boolean;
  openNavbarDrawer: boolean;
  drawerWidth: number;
  fontFamily: FontFamily;
}

export const initialConfig: Config = {
  assetsDir: ({ MODE: process.env.NODE_ENV, VITE_BASENAME: "/admin", VITE_APP_VERSION: "1.0.0", VITE_ASSET_BASE_URL: "" } as any).VITE_ASSET_BASE_URL ?? '',
  sidenavCollapsed: false,
  openNavbarDrawer: false,
  drawerWidth: mainDrawerWidth.full,
  fontFamily: fontFamilies[0],
};

// Remove hardcoded credentials for production security
export const defaultAuthCredentials = undefined;
