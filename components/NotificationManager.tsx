'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';

export default function NotificationManager() {
  const [permission, setPermission] = useState<NotificationPermission>('default');
  const [showPrompt, setShowPrompt] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    const triggerNativePrompt = async () => {
      if (typeof window !== 'undefined' && 'Notification' in window) {
        if (Notification.permission === 'default') {
          try {
            const result = await Notification.requestPermission();
            setPermission(result);
          } catch (err) {
            console.error('Native notification prompt failed:', err);
          }
        }
      }
      // Remove the listener after the first attempt
      window.removeEventListener('click', triggerNativePrompt);
    };

    // Add a one-time listener for any click on the page
    // This is required because modern browsers block automatic prompts without a user gesture
    window.addEventListener('click', triggerNativePrompt, { once: true });

    return () => window.removeEventListener('click', triggerNativePrompt);
  }, []);

  return null;
}
