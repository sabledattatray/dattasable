'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { BookOpen } from 'lucide-react';

export default function HeroInteraction() {
  const [isApp, setIsApp] = useState(false);

  useEffect(() => {
    if ((window as any).Capacitor?.isNative) setIsApp(true);
  }, []);

  return (
    <>
      {/* App-specific overlay (client-side only) */}
      {isApp && (
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(circle at center, var(--accent) 0%, var(--accent) 50%, transparent 85%)',
          zIndex: 1,
          opacity: 0.5,
          pointerEvents: 'none'
        }} />
      )}

      <div className="flex flex-col xs:flex-row flex-wrap gap-4">
        <Link href="/tools" className="btn-primary w-full xs:w-auto text-center flex items-center justify-center gap-2" style={{ textDecoration: 'none' }}>
           LAUNCH AI WORKSPACE
        </Link>
        <Link href="/knowledge" className="btn-outline w-full xs:w-auto text-center" style={{ textDecoration: 'none' }}>
          OPERATOR GUIDES
        </Link>
        <Link href="/portfolio" className="btn-outline w-full xs:w-auto text-center" style={{ textDecoration: 'none' }}>
          BI PORTFOLIO
        </Link>
      </div>
    </>
  );
}
