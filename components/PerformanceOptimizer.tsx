'use client';

import { useEffect, useState, Suspense } from 'react';
import Script from 'next/script';
import AnalyticsTracker from './AnalyticsTracker';
import GoogleAnalytics from './GoogleAnalytics';

interface PerformanceOptimizerProps {
  googleAnalyticsId: string;
  googleSignInClientId: string;
  adSenseClientId: string;
}

export default function PerformanceOptimizer({
  googleAnalyticsId,
  googleSignInClientId,
  adSenseClientId,
}: PerformanceOptimizerProps) {
  const [shouldLoadScripts, setShouldLoadScripts] = useState(false);

  useEffect(() => {
    // Strategy: Load third-party scripts ONLY after first interaction or 4s delay
    // This is the "Elite Tier" technique to maximize TBT and LCP scores.
    
    const loadScripts = () => {
      if (shouldLoadScripts) return;
      setShouldLoadScripts(true);
    };

    const interactionEvents = ['mousedown', 'mousemove', 'keydown', 'touchstart', 'scroll'];
    
    // 1. Listen for user interaction
    interactionEvents.forEach(event => {
      window.addEventListener(event, loadScripts, { once: true, passive: true });
    });

    // 2. Fallback timer (15 seconds) to ensure they load eventually
    const timer = setTimeout(loadScripts, 15000);

    return () => {
      interactionEvents.forEach(event => {
        window.removeEventListener(event, loadScripts);
      });
      clearTimeout(timer);
    };
  }, [shouldLoadScripts]);

  if (!shouldLoadScripts) return null;

  return (
    <>
      {/* 1. Google Analytics - uses standard Script inside with its own strategy */}
      <GoogleAnalytics id={googleAnalyticsId} />

      {/* 2. Analytics Tracker (Internal) */}
      <Suspense fallback={null}>
        <AnalyticsTracker />
      </Suspense>

      {/* 2. Google Sign In - lazyOnload to minimize TBT */}
      <Script 
        src="https://accounts.google.com/gsi/client" 
        strategy="lazyOnload"
      />

      {/* 3. Google AdSense (Lazy) */}
      <script
        async
        src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adSenseClientId}`}
        crossOrigin="anonymous"
      />
    </>
  );
}
