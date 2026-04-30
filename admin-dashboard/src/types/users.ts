'use client';
export interface User {
  id: string;
  name: string;
  avatar: string;
  email: string;
  emailVerified: string | Date | null;
  status: string;
  role: 'ADMIN' | 'USER';
  department: string;
  phone: string;
  location: string;
  createdAt: string;
  lastLoginAt?: string;
  provider?: string;
}
