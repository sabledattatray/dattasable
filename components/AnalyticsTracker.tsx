'use client';

import { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

export default function AnalyticsTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
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

    trackView();
  }, [pathname, searchParams]);

  return null;
}
