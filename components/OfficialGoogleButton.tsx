'use client';
import { useEffect, useRef } from 'react';
import { signIn } from 'next-auth/react';

export default function OfficialGoogleButton() {
  const buttonRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const initializeButton = () => {
      if (window.google && buttonRef.current) {
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
    if (window.google) {
      initializeButton();
    } else {
      const interval = setInterval(() => {
        if (window.google) {
          initializeButton();
          clearInterval(interval);
        }
      }, 500);
      return () => clearInterval(interval);
    }
  }, []);

  return <div ref={buttonRef} className="w-full" style={{ minHeight: '44px' }} aria-label="Sign in with Google" />;
}
