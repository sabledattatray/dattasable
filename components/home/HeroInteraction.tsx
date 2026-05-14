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

      <div className="flex flex-col sm:flex-row sm:flex-nowrap gap-4">
        <Link href="/tools" className="btn-primary w-full sm:w-auto text-center flex items-center justify-center gap-2" style={{ textDecoration: 'none' }}>
           START BUILDING WORKFLOWS
        </Link>
        <Link href="/tools/demo" className="btn-outline w-full sm:w-auto text-center" style={{ textDecoration: 'none' }}>
          EXPLORE SYSTEM DEMO
        </Link>
        <Link href="/knowledge/architecture" className="btn-outline w-full sm:w-auto text-center" style={{ textDecoration: 'none' }}>
          VIEW ARCHITECTURE
        </Link>
      </div>

      <div className="mt-10 flex items-center gap-3 opacity-60">
        <div className="flex -space-x-2">
          <div className="w-2 h-2 rounded-full bg-[var(--accent)] animate-pulse" />
        </div>
        <p className="text-[10px] mono uppercase tracking-widest">
          No-code / low-code AI systems • Built for creators, developers & operators • Scalable workflow engine
        </p>
      </div>
    </>
  );
}
