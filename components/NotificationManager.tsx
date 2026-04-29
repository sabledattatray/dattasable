'use client';
import { useEffect } from 'react';

export default function NotificationManager() {
  useEffect(() => {
    // Attempting direct SSL permission request after a short delay
    // Note: Modern browsers (Chrome/Safari) may block automatic requests without a user gesture.
    const requestDirectPermission = async () => {
      if (typeof window !== 'undefined' && 'Notification' in window) {
        if (Notification.permission === 'default') {
          try {
            // Delay to allow the page to settle before the SSL prompt
            setTimeout(async () => {
              const result = await Notification.requestPermission();
              if (result === 'granted') {
                new Notification('Insights Enabled', {
                  body: 'You will now receive real-time updates and BI insights.',
                  icon: '/favicon.svg'
                });
              }
            }, 3000);
          } catch (error) {
            console.error('Direct SSL notification error:', error);
          }
        }
      }
    };

    requestDirectPermission();
  }, []);

  return null; // No custom UI, strictly native SSL interaction
}
