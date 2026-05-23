'use client';

import React, { useState, useEffect } from 'react';

export default function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <button
      onClick={scrollToTop}
      aria-label="Scroll back to top of page"
      className={`back-to-top-btn ${isVisible ? 'visible' : ''}`}
      style={{
        position: 'fixed',
        zIndex: 998,
        background: 'rgba(7, 7, 7, 0.8)',
        backdropFilter: 'blur(10px)',
        border: '1px solid var(--border)',
        color: 'var(--text)',
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
        transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
      }}
    >
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="arrow-up-icon"
      >
        <polyline points="18 15 12 9 6 15" />
      </svg>

      <style jsx global>{`
        .back-to-top-btn {
          bottom: 100px;
          right: 30px;
          width: 56px;
          height: 56px;
          opacity: 0;
          visibility: hidden;
          transform: translateY(20px) scale(0.8);
        }

        .back-to-top-btn.visible {
          opacity: 1;
          visibility: visible;
          transform: translateY(0) scale(1);
        }

        .arrow-up-icon {
          width: 24px;
          height: 24px;
          transition: transform 0.3s ease;
        }

        @media (max-width: 768px) {
          .back-to-top-btn {
            bottom: 78px;
            right: 20px;
            width: 48px;
            height: 48px;
          }
          .arrow-up-icon {
            width: 20px;
            height: 20px;
          }
        }

        .back-to-top-btn:hover {
          transform: scale(1.1) translateY(-3px);
          border-color: var(--accent) !important;
          box-shadow: 0 0 15px rgba(201, 243, 29, 0.3);
          color: var(--accent) !important;
        }

        .back-to-top-btn:hover .arrow-up-icon {
          transform: translateY(-2px);
        }

        .back-to-top-btn:active {
          transform: scale(0.95);
        }

        /* Adjust colors/shadows for light theme */
        .light .back-to-top-btn {
          background: rgba(255, 255, 255, 0.8) !important;
          border-color: var(--border) !important;
          box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.1) !important;
        }

        .light .back-to-top-btn:hover {
          border-color: var(--accent) !important;
          box-shadow: 0 0 15px rgba(0, 89, 179, 0.3) !important;
          color: var(--accent) !important;
        }
      `}</style>
    </button>
  );
}
