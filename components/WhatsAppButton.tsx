'use client';

import React, { useState, useEffect } from 'react';
import { MessageCircle } from 'lucide-react';

export default function WhatsAppButton() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Delay visibility to ensure it doesn't affect initial FCP/LCP metrics
    const timer = setTimeout(() => setIsVisible(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) return null;

  return (
    <a
      href="https://wa.me/918010803756?text=Hi%20Datta,%20I%20saw%20your%20portfolio%20and%20would%20like%20to%20discuss%20a%20project."
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with Datta on WhatsApp"
      style={{
        position: 'fixed',
        bottom: '30px',
        right: '30px',
        zIndex: 999,
        background: '#25D366',
        color: '#fff',
        width: '56px',
        height: '56px',
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0 10px 25px rgba(37, 211, 102, 0.3)',
        transition: 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
        cursor: 'pointer',
        textDecoration: 'none',
      }}
      className="whatsapp-float hover:scale-110 active:scale-95"
    >
      <MessageCircle size={28} />
      
      {/* Pulse Effect */}
      <div style={{
        position: 'absolute',
        inset: 0,
        borderRadius: '50%',
        border: '2px solid #25D366',
        animation: 'whatsapp-pulse 2s infinite',
        pointerEvents: 'none'
      }} />

      {/* Styles for the pulse animation */}
      <style jsx global>{`
        @keyframes whatsapp-pulse {
          0% { transform: scale(1); opacity: 0.8; }
          100% { transform: scale(1.5); opacity: 0; }
        }
        .whatsapp-float:hover {
          box-shadow: 0 15px 35px rgba(37, 211, 102, 0.5);
        }
      `}</style>
    </a>
  );
}
