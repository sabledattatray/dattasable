import React from 'react';

interface CrosshairProps {
  position: 'tl' | 'tr' | 'bl' | 'br';
}

export default function Crosshair({ position }: CrosshairProps) {
  const style: React.CSSProperties = {
    position: 'absolute',
    zIndex: 10,
  };

  if (position === 'tl') { style.top = '-20px'; style.left = '-20px'; }
  if (position === 'tr') { style.top = '-20px'; style.right = '-20px'; }
  if (position === 'bl') { style.bottom = '-20px'; style.left = '-20px'; }
  if (position === 'br') { style.bottom = '-20px'; style.right = '-20px'; }

  return (
    <div className="crosshair" style={style}>
      <div className="crosshair-ring" />
      <div className="crosshair-v" />
      <div className="crosshair-h" />
      <div className="crosshair-dot" />
    </div>
  );
}
