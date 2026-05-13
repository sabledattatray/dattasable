'use client';

import { useState, useEffect } from 'react';

export function useSurgicalPersistence<T>(key: string, initialValue: T) {
  // Get from local storage then use it
  const [storedValue, setStoredValue] = useState<T>(initialValue);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const item = window.localStorage.getItem(`surgical_${key}`);
      if (item) {
        setStoredValue(JSON.parse(item));
      }
    } catch (error) {
      console.log("Persistence Error:", error);
    }
  }, [key]);

  // Update localStorage when value changes
  const setValue = (value: T | ((val: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(`surgical_${key}`, JSON.stringify(valueToStore));
      }
    } catch (error) {
      console.log(error);
    }
  };

  return [storedValue, setValue] as const;
}
