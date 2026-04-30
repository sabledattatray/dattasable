'use client';
import { useEffect, useRef } from 'react';
import { signIn } from 'next-auth/react';

export default function OfficialGoogleButton() {
  const buttonRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const initializeButton = () => {
      if (window.google?.accounts?.id && buttonRef.current) {
        // Ensure initialization happens at least once
        // GSI SDK doesn't have an 'isInitialized' check, but we can safely call it 
        // if we are sure it won't trigger a prompt here.
        window.google.accounts.id.initialize({
          client_id: "707439992057-j87plivvk29u7nq35l1j7sqdraoqhv5u.apps.googleusercontent.com",
          callback: (response: any) => {
            signIn('google', {
              credential: response.credential,
              callbackUrl: window.location.origin,
            });
          },
          use_fedcm_for_prompt: false,
        });

        window.google.accounts.id.renderButton(buttonRef.current, {
          theme: 'outline',
          size: 'large',
          width: '100%',
          text: 'continue_with',
          shape: 'rectangular',
          logo_alignment: 'left',
        });
      }
    };

    // Initialize if SDK is ready, otherwise wait
    if (window.google?.accounts?.id) {
      initializeButton();
    } else {
      const interval = setInterval(() => {
        if (window.google?.accounts?.id) {
          initializeButton();
          clearInterval(interval);
        }
      }, 500);
      return () => clearInterval(interval);
    }
  }, []);

  return <div ref={buttonRef} className="w-full" style={{ minHeight: '44px' }} aria-label="Sign in with Google" />;
}
