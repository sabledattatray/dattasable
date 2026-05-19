'use client';

import { useEffect, useState, Suspense } from 'react';
import Script from 'next/script';
import AnalyticsTracker from './AnalyticsTracker';
import GoogleAnalytics from './GoogleAnalytics';

interface PerformanceOptimizerProps {
  googleAnalyticsId: string;
  googleSignInClientId: string;
}

export default function PerformanceOptimizer({
  googleAnalyticsId,
  googleSignInClientId,
}: PerformanceOptimizerProps) {
  const [shouldLoadScripts, setShouldLoadScripts] = useState(false);

  useEffect(() => {
    if (shouldLoadScripts) return;

    // Load scripts immediately for search engines, AdSense crawlers, and performance bots (e.g. Lighthouse)
    const isBot = typeof window !== 'undefined' && 
      /bot|google|crawl|spider|slurp|lighthouse/i.test(navigator.userAgent);
    
    if (isBot) {
      setShouldLoadScripts(true);
      return;
    }

    const loadScripts = () => {
      setShouldLoadScripts(true);
    };

    const interactionEvents = ['mousedown', 'mousemove', 'keydown', 'touchstart', 'scroll'];
    
    // 1. Listen for user interaction
    interactionEvents.forEach(event => {
      window.addEventListener(event, loadScripts, { once: true, passive: true });
    });

    // 2. Fallback timer (20 seconds) to ensure they load eventually
    const timer = setTimeout(loadScripts, 20000);

    return () => {
      interactionEvents.forEach(event => {
        window.removeEventListener(event, loadScripts);
      });
      clearTimeout(timer);
    };
  }, [shouldLoadScripts]);

  return (
    <>
      {shouldLoadScripts && (
        <>
          <Suspense fallback={null}>
            <AnalyticsTracker />
          </Suspense>
          <GoogleAnalytics id={googleAnalyticsId} />
          <Script 
            src="https://accounts.google.com/gsi/client" 
            strategy="lazyOnload"
          />
          <Script
            id="adsense-init"
            src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4242010382827250"
            strategy="lazyOnload"
            crossOrigin="anonymous"
          />
        </>
      )}
    </>
  );
}
