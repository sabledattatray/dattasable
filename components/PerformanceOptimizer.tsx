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
  const [loadAdSense, setLoadAdSense] = useState(false);
  const [loadAnalytics, setLoadAnalytics] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const ua = navigator.userAgent;
    
    // Only load immediately for AdSense verification crawlers
    // Standard Googlebot / PageSpeed Insights / Lighthouse will load scripts lazily
    const isAdSenseVerificationBot = /adsbot|mediapartners|ads-bot|google-display-ads-bot/i.test(ua);

    if (isAdSenseVerificationBot) {
      setLoadAdSense(true);
      setLoadAnalytics(true);
      return;
    }

    // For real human users and PageSpeed Insights, load scripts lazily to keep mobile score 95+
    const triggerLoad = () => {
      setLoadAdSense(true);
      setLoadAnalytics(true);
    };

    // 1. Load on first user interaction
    const interactionEvents = ['mousedown', 'mousemove', 'keydown', 'touchstart', 'scroll'];
    const handleInteraction = () => {
      triggerLoad();
      cleanup();
    };

    const cleanup = () => {
      interactionEvents.forEach(event => {
        window.removeEventListener(event, handleInteraction);
      });
    };

    interactionEvents.forEach(event => {
      window.addEventListener(event, handleInteraction, { once: true, passive: true });
    });

    // 2. Load when browser is idle (fallback after 4.5 seconds)
    let idleId: number;
    const timer = setTimeout(() => {
      if ('requestIdleCallback' in window) {
        idleId = window.requestIdleCallback(triggerLoad);
      } else {
        triggerLoad();
      }
    }, 4500);

    return () => {
      cleanup();
      clearTimeout(timer);
      if (idleId && 'cancelIdleCallback' in window) {
        window.cancelIdleCallback(idleId);
      }
    };
  }, []);

  return (
    <>
      {loadAdSense && (
        <Script
          id="adsense-init"
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4242010382827250"
          strategy="afterInteractive"
          crossOrigin="anonymous"
        />
      )}
      {loadAnalytics && (
        <>
          <Suspense fallback={null}>
            <AnalyticsTracker />
          </Suspense>
          <GoogleAnalytics id={googleAnalyticsId} />
          <Script 
            src="https://accounts.google.com/gsi/client" 
            strategy="lazyOnload"
          />
        </>
      )}
    </>
  );
}
