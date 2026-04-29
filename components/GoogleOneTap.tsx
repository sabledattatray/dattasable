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
              signIn('google', {
                credential: response.credential,
                redirect: false,
              });
            },
            auto_select: false,
            cancel_on_tap_outside: false,
            itp_support: true,
            use_fedcm_for_prompt: true, // Enable the new FedCM API support
          });

          // Only prompt if not already logged in
          window.google.accounts.id.prompt((notification: any) => {
            if (notification.isNotDisplayed()) {
              const reason = notification.getNotDisplayedReason();
              console.log('One Tap not displayed:', reason);
              
              // If the reason is 'suppressed_by_user' or 'opt_out_or_no_session', it's expected
              if (reason === 'opt_out_or_no_session') {
                console.warn('Google One Tap: No active Google session found or user opted out.');
              }
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
