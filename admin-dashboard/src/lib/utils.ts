'use client';
import { clsx, type ClassValue } from "clsx"

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs)
}

const getSafeStorage = () => {
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      return window.localStorage;
    }
  } catch (e) {
    // Storage is blocked or unavailable
  }
  return null;
};

export const getItemFromStore = (
  key: string,
  defaultValue?: string | boolean,
  store = getSafeStorage(),
) => {
  if (!store) return defaultValue;
  try {
    const item = store.getItem(key);
    return item === null ? defaultValue : JSON.parse(item);
  } catch {
    try {
      return store.getItem(key) || defaultValue;
    } catch {
      return defaultValue;
    }
  }
};

export const setItemToStore = (key: string, payload: string, store = getSafeStorage()) => {
  if (store) {
    try {
      store.setItem(key, payload);
    } catch (e) {
      // Storage might be full or blocked
    }
  }
};

export const removeItemFromStore = (key: string, store = getSafeStorage()) => {
  if (store) {
    try {
      store.removeItem(key);
    } catch (e) {
      // Storage blocked
    }
  }
};

export const getDates = (
  startDate: Date,
  endDate: Date,
  interval: number = 1000 * 60 * 60 * 24,
): Date[] => {
  const duration = +endDate - +startDate;
  const steps = duration / interval;
  return Array.from({ length: steps + 1 }, (v, i) => new Date(startDate.valueOf() + interval * i));
};

export const getPastDates = (duration: 'week' | 'month' | 'year' | number): Date[] => {
  let days;

  switch (duration) {
    case 'week':
      days = 7;
      break;
    case 'month':
      days = 30;
      break;
    case 'year':
      days = 365;
      break;

    default:
      days = duration;
  }

  const date = new Date();
  const endDate = date;
  const startDate = new Date(new Date().setDate(date.getDate() - (days - 1)));
  return getDates(startDate, endDate);
};

export const currencyFormat = (
  amount: number,
  locale: Intl.LocalesArgument = 'en-US',
  options: Intl.NumberFormatOptions = {},
) => {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: 'usd',
    maximumFractionDigits: 2,
    ...options,
  }).format(amount);
};

export const getCurrencySymbol = (currency: string, locale: Intl.LocalesArgument = 'en-US') => {
  const parts = new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency,
  })
    .formatToParts(0)
    .find((x) => x.type === 'currency');
  return parts ? parts.value : '$';
};

export const numberFormat = (
  number: number,
  locale: Intl.LocalesArgument = 'en-US',
  options: Intl.NumberFormatOptions = {
    notation: 'standard',
  },
) =>
  new Intl.NumberFormat(locale, {
    ...options,
  }).format(number);

export const hexToRgb = (hex: string) => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return [r, g, b];
};

export const kebabCase = (string: string) =>
  string
    .replace(/([a-z])([A-Z])/g, '$1-$2')
    .replace(/[\s_]+/g, '-')
    .toLowerCase();

export const formatNumber = (num: number): string => {
  if (num >= 1_000_000_000) {
    return (num / 1_000_000_000).toFixed(num % 1_000_000_000 < 10 ? 0 : 1) + 'B';
  } else if (num >= 1_000_000) {
    return (num / 1_000_000).toFixed(num % 1_000_000 < 10 ? 0 : 1) + 'M';
  } else if (num >= 1_000) {
    return (num / 1_000).toFixed(num % 1_000 < 10 ? 0 : 1) + 'K';
  } else {
    return num.toString();
  }
};

const hexToRgbChannel = (hexColor: string): string => {
  const r = parseInt(hexColor.substring(1, 3), 16);
  const g = parseInt(hexColor.substring(3, 5), 16);
  const b = parseInt(hexColor.substring(5, 7), 16);

  return `${r} ${g} ${b}`;
};

type ColorPalette = Record<string, string | undefined>;

type PaletteWithChannels<T extends ColorPalette> = T & {
  [K in keyof T as `${string & K}Channel`]: string;
} & {
  [K in keyof T as K extends number ? `${K}Channel` : never]: string;
};

export const generatePaletteChannel = <T extends ColorPalette>(
  palette: T,
): PaletteWithChannels<T> => {
  const channels: Record<string, string | undefined> = {};

  Object.entries(palette).forEach(([colorName, colorValue]) => {
    if (colorValue) {
      channels[`${colorName}Channel`] = hexToRgbChannel(colorValue);
    }
  });

  return { ...palette, ...channels } as PaletteWithChannels<T>;
};

export const cssVarRgba = (color: string, alpha: number) => {
  return `rgba(${color} / ${alpha})`;
};
