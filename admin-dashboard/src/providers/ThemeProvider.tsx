'use client';
import { PropsWithChildren, useEffect, useMemo } from 'react';
import { CssBaseline, ThemeProvider as MuiThemeProvider, createTheme } from '@mui/material';
import { themeOverrides } from 'theme/theme';
import createTypography from 'theme/typography';
import { useSettingsContext } from './SettingsProvider';

// ── Google Fonts URLs for every selectable font ──────────────────────────────
const GOOGLE_FONTS_URLS: Record<string, string> = {
  'Plus Jakarta Sans':
    'https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&display=swap',
  Syne: 'https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&display=swap',
  Kanit:
    'https://fonts.googleapis.com/css2?family=Kanit:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&display=swap',
  Inter:
    'https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,300;0,14..32,400;0,14..32,500;0,14..32,600;0,14..32,700;1,14..32,400&display=swap',
  Roboto:
    'https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,300;0,400;0,500;0,700;1,400&display=swap',
  Poppins:
    'https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&display=swap',
  // '-apple-system' is a native system font — no Google Fonts URL needed
};

const FONT_LINK_ID = 'dattasable-dynamic-font';
const FONT_STYLE_ID = 'dattasable-font-override';

const ThemeProvider = ({ children }: PropsWithChildren) => {
  const {
    config: { fontFamily },
  } = useSettingsContext();

  const typography = useMemo(() => createTypography(fontFamily), [fontFamily]);

  const theme = useMemo(
    () =>
      createTheme({
        ...themeOverrides,
        typography,
      }),
    [typography],
  );

  // ── 1. Fetch the Google Fonts stylesheet ─────────────────────────────────
  useEffect(() => {
    const existing = document.getElementById(FONT_LINK_ID);
    if (existing) existing.remove();

    const url = GOOGLE_FONTS_URLS[fontFamily];
    if (!url) return; // system font — skip network load

    // Add preconnect hints once
    if (!document.getElementById('gfonts-preconnect')) {
      const pc1 = Object.assign(document.createElement('link'), {
        id: 'gfonts-preconnect',
        rel: 'preconnect',
        href: 'https://fonts.googleapis.com',
      });
      const pc2 = Object.assign(document.createElement('link'), {
        rel: 'preconnect',
        href: 'https://fonts.gstatic.com',
        crossOrigin: 'anonymous',
      });
      document.head.append(pc1, pc2);
    }

    const link = Object.assign(document.createElement('link'), {
      id: FONT_LINK_ID,
      rel: 'stylesheet',
      href: url,
    });
    document.head.appendChild(link);
  }, [fontFamily]);

  // ── 2. Force the font onto the entire document ───────────────────────────
  // MUI's CSS variable approach can fail to propagate to non-MUI elements.
  // Injecting a <style> tag is the only guaranteed way to cover 100 % of the UI.
  useEffect(() => {
    let styleEl = document.getElementById(FONT_STYLE_ID) as HTMLStyleElement | null;
    if (!styleEl) {
      styleEl = document.createElement('style');
      styleEl.id = FONT_STYLE_ID;
      document.head.appendChild(styleEl);
    }

    // Quote family names that contain spaces
    const quoted = fontFamily.includes(' ') ? `"${fontFamily}"` : fontFamily;
    const fallback = `${quoted}, -apple-system, BlinkMacSystemFont, sans-serif`;

    styleEl.textContent = `
      /* ── Datta Sable dynamic font override ── */
      :root {
        --dattasable-typography-fontFamily: ${fallback};
        --dattasable-font-family:           ${fallback};
      }
      html,
      body,
      body * {
        font-family: ${fallback} !important;
      }
      /* Restore monospace for code blocks */
      pre, code, kbd, samp, tt {
        font-family: "Spline Sans Mono", "Courier New", monospace !important;
      }
    `;
  }, [fontFamily]);

  return (
    <MuiThemeProvider disableTransitionOnChange theme={theme} modeStorageKey="dattasable-mode">
      <CssBaseline enableColorScheme />
      {children}
    </MuiThemeProvider>
  );
};

export default ThemeProvider;
