'use client';

import { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

export default function AnalyticsTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    // Don't track local dev visits in the database to keep logs clean
    if (process.env.NODE_ENV === 'development') {
      return;
    }

    const trackView = async () => {
      try {
        const url = `${pathname}${searchParams.toString() ? `?${searchParams.toString()}` : ''}`;
        
        // Don't track admin pages or API routes to keep data clean
        if (pathname.startsWith('/admin') || pathname.startsWith('/api')) {
          return;
        }

        await fetch('/api/track', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            url,
            referrer: document.referrer || null,
          }),
        });
      } catch (err) {
        // Silently fail to not disrupt user experience
        console.error('Analytics failed:', err);
      }
    };

    // Use requestIdleCallback to ensure tracking doesn't block critical rendering
    if ('requestIdleCallback' in window) {
      window.requestIdleCallback(() => trackView());
    } else {
      setTimeout(trackView, 1000);
    }
  }, [pathname, searchParams]);

  return null;
}
