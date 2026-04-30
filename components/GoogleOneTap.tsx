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
  const initialized = useRef(false);
  const clientId = "707439992057-j87plivvk29u7nq35l1j7sqdraoqhv5u.apps.googleusercontent.com";

  useEffect(() => {
    // Only run if user is not authenticated and not already initialized
    if (status === 'unauthenticated' && !initialized.current) {
      const initializeOneTap = () => {
        if (window.google?.accounts?.id && !initialized.current) {
          try {
            initialized.current = true;
            window.google.accounts.id.initialize({
              client_id: clientId,
              callback: (response: any) => {
                console.log('✅ Google One Tap Response Received');
                signIn('google', {
                  credential: response.credential,
                  redirect: false,
                });
              },
              auto_select: false, // Changed to false to prevent conflicting auto-requests
              cancel_on_tap_outside: true,
              itp_support: true,
              use_fedcm_for_prompt: true, 
            });

            window.google.accounts.id.prompt((notification: any) => {
              if (notification.isNotDisplayed()) {
                console.log('One Tap not displayed:', notification.getNotDisplayedReason());
                // If not displayed, we might want to allow re-init later if state changes
                if (notification.getNotDisplayedReason() === 'suppressed_by_user') {
                  // Keep as initialized to respect user choice
                }
              }
            });
          } catch (error) {
            console.error('Error initializing Google One Tap:', error);
            initialized.current = false;
          }
        }
      };

      // Check for google object
      if (window.google?.accounts?.id) {
        initializeOneTap();
      } else {
        const interval = setInterval(() => {
          if (window.google?.accounts?.id) {
            initializeOneTap();
            clearInterval(interval);
          }
        }, 1000);
        return () => clearInterval(interval);
      }
    }
  }, [status, clientId]);

  return null;
}
