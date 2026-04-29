'use client';

import { useEffect } from 'react';

interface AdSenseProps {
  slot: string;
  format?: 'auto' | 'fluid' | 'rectangle';
  responsive?: 'true' | 'false';
  style?: React.CSSProperties;
}

export default function AdSense({ slot, format = 'auto', responsive = 'true', style }: AdSenseProps) {
  useEffect(() => {
    try {
      // @ts-ignore
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (err) {
      console.error('AdSense error:', err);
    }
  }, []);

  return (
    <div style={{ 
      margin: '2rem 0', 
      textAlign: 'center', 
      overflow: 'hidden',
      background: 'rgba(255,255,255,0.02)',
      border: '1px solid var(--border)',
      minHeight: '100px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      ...style 
    }}>
      {/* 
          Note: This is a production-ready AdSense slot.
          Replace 'YOUR-CLIENT-ID' in the global script when you get approved.
      */}
      <ins
        className="adsbygoogle"
        style={{ display: 'block', minWidth: '250px' }}
        data-ad-client="ca-pub-4242010382827250"
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive={responsive}
      />
      
      {/* Debug label for development */}
      <div className="mono" style={{ position: 'absolute', fontSize: '8px', color: 'var(--muted)', opacity: 0.5 }}>
        AD_SLOT: {slot}
      </div>
    </div>
  );
}
