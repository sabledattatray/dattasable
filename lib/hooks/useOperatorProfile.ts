'use client';

import { useSurgicalPersistence } from './useSurgicalPersistence';

export type OperatorPersona = 'Founder' | 'Technical Expert' | 'Data Strategist' | 'Creator' | 'Educator';
export type OperatorIntent = 'Authority' | 'Engagement' | 'Lead Generation' | 'SEO' | 'Distribution';
export type OperatorStyle = 'Surgical' | 'Executive' | 'Analytical' | 'Narrative' | 'Minimalist';

export interface OperatorProfile {
  persona: OperatorPersona;
  intent: OperatorIntent;
  style: OperatorStyle;
}

export function useOperatorProfile() {
  const [profile, setProfile] = useSurgicalPersistence<OperatorProfile>('operator-profile', {
    persona: 'Technical Expert',
    intent: 'Authority',
    style: 'Surgical',
  });

  const updateProfile = (updates: Partial<OperatorProfile>) => {
    setProfile((prev) => ({ ...prev, ...updates }));
  };

  return { profile, updateProfile };
}
