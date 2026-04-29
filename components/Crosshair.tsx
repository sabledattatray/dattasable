import React from 'react';

interface CrosshairProps {
  position: 'tl' | 'tr' | 'bl' | 'br';
}

export default function Crosshair({ position }: CrosshairProps) {
  const style: React.CSSProperties = {
    position: 'absolute',
    zIndex: 10,
  };

  if (position === 'tl') { style.top = 'var(--crosshair-offset)'; style.left = 'var(--crosshair-offset)'; }
  if (position === 'tr') { style.top = 'var(--crosshair-offset)'; style.right = 'var(--crosshair-offset)'; }
  if (position === 'bl') { style.bottom = 'var(--crosshair-offset)'; style.left = 'var(--crosshair-offset)'; }
  if (position === 'br') { style.bottom = 'var(--crosshair-offset)'; style.right = 'var(--crosshair-offset)'; }

  return (
    <div className="crosshair" style={style}>
      <div className="crosshair-v" />
      <div className="crosshair-h" />
    </div>
  );
}
