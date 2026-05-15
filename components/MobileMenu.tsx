'use client';
import React from 'react';
import { AnimatePresence } from 'framer-motion';
import dynamic from 'next/dynamic';

const MobileMenuDrawer = dynamic(() => import('./MobileMenuDrawer'), { ssr: false });

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  navLinks?: any[];
  megaMenuData?: any;
  expandedMobile: string | null;
  setExpandedMobile: (label: string | null) => void;
  session: any;
  signOut: () => void;
  setIsLoginOpen: (open: boolean) => void;
}

export default function MobileMenu({
  isOpen,
  onClose,
  expandedMobile,
  setExpandedMobile,
  session,
  signOut,
  setIsLoginOpen
}: MobileMenuProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <MobileMenuDrawer
          onClose={onClose}
          expandedMobile={expandedMobile}
          setExpandedMobile={setExpandedMobile}
          session={session}
          signOut={signOut}
          setIsLoginOpen={setIsLoginOpen}
        />
      )}
    </AnimatePresence>
  );
}
