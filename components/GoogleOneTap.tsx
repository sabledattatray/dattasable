'use client';
import { useEffect } from 'react';
import { signIn, useSession } from 'next-auth/react';

declare global {
  interface Window {
    google: any;
  }
}

export default function GoogleOneTap() {
  const { data: session, status } = useSession();
  const clientId = "707439992057-j87plivvk29u7nq35l1j7sqdraoqhv5u.apps.googleusercontent.com";

  useEffect(() => {
    // Only run if user is not authenticated
    if (status === 'unauthenticated') {
      const initializeOneTap = () => {
        if (window.google) {
          window.google.accounts.id.initialize({
            client_id: clientId,
            callback: (response: any) => {
              // Sign in with NextAuth using the credential from Google
              signIn('google', {
                credential: response.credential,
                redirect: false,
              });
            },
            auto_select: false,
            cancel_on_tap_outside: false,
          });

          window.google.accounts.id.prompt((notification: any) => {
            if (notification.isNotDisplayed()) {
              console.log('One Tap not displayed:', notification.getNotDisplayedReason());
            } else if (notification.isSkippedMoment()) {
              console.log('One Tap skipped:', notification.getSkippedReason());
            } else if (notification.isDismissedMoment()) {
              console.log('One Tap dismissed:', notification.getDismissedReason());
            }
          });
        }
      };

      // Check if script is already loaded
      if (window.google) {
        initializeOneTap();
      } else {
        // Script might still be loading, wait a bit
        const interval = setInterval(() => {
          if (window.google) {
            initializeOneTap();
            clearInterval(interval);
          }
        }, 1000);
        return () => clearInterval(interval);
      }
    }
  }, [status, clientId]);

  return null; // This component doesn't render anything itself
}
