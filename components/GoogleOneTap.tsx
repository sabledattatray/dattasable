'use client';
import { useEffect } from 'react';
import { signIn, useSession } from 'next-auth/react';

declare global {
  interface Window {
    google: any;
  }
}

export default function GoogleOneTap() {
  const { status } = useSession();
  const clientId = "707439992057-j87plivvk29u7nq35l1j7sqdraoqhv5u.apps.googleusercontent.com";

  useEffect(() => {
    // Only run if user is not authenticated
    if (status === 'unauthenticated') {
      const initializeOneTap = () => {
        if (window.google?.accounts?.id) {
          try {
            window.google.accounts.id.initialize({
              client_id: clientId,
              callback: (response: any) => {
                signIn('google', {
                  credential: response.credential,
                  redirect: false,
                });
              },
              auto_select: false,
              cancel_on_tap_outside: false,
              itp_support: true,
              // Enabling FedCM for production compatibility
              use_fedcm_for_prompt: true, 
            });

            window.google.accounts.id.prompt((notification: any) => {
              if (notification.isNotDisplayed()) {
                console.log('One Tap not displayed:', notification.getNotDisplayedReason());
              } else if (notification.isSkippedMoment()) {
                console.log('One Tap skipped:', notification.getSkippedReason());
              }
            });
          } catch (error) {
            console.error('Error initializing Google One Tap:', error);
          }
        }
      };

      // Check for google object
      if (window.google?.accounts?.id) {
        initializeOneTap();
      } else {
        // Retry logic for script loading
        let attempts = 0;
        const interval = setInterval(() => {
          attempts++;
          if (window.google?.accounts?.id) {
            initializeOneTap();
            clearInterval(interval);
          } else if (attempts > 10) {
            clearInterval(interval);
          }
        }, 1000);
        return () => clearInterval(interval);
      }
    }
  }, [status, clientId]);

  return null;
}
