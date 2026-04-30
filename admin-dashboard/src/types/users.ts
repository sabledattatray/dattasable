'use client';
export interface User {
  id: string;
  name: string;
  avatar: string;
  email: string;
  status: string;
  role: 'ADMIN' | 'USER' | 'Admin' | 'User';
  department: 'Engineering' | 'Design' | 'Marketing' | 'Human Resources' | 'Finance' | 'Support';
  phone: string;
  location: string;
  createdAt: string;
  provider?: string;
}
