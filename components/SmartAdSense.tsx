'use client';

import { useEffect, useState } from 'react';
import Script from 'next/script';

export default function SmartAdSense({ client }: { client: string }) {
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    // Wait for the page to be fully interactive + a small buffer to prioritize LCP
    const timer = setTimeout(() => {
      if ('requestIdleCallback' in window) {
        window.requestIdleCallback(() => setShouldLoad(true));
      } else {
        setShouldLoad(true);
      }
    }, 3500);

    return () => clearTimeout(timer);
  }, []);

  if (!shouldLoad) return null;

  return (
    <script
      async
      src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${client}`}
      crossOrigin="anonymous"
    />
  );
}
