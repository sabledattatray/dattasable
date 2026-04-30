'use client';
import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useSession } from 'next-auth/react';
import AdminDashboardWrapper from './AdminDashboardWrapper';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted && status === 'unauthenticated' && pathname !== '/admin/login') {
      router.push('/admin/login');
    }
    
    // Security: Prevent non-ADMIN users from accessing /admin paths
    if (mounted && status === 'authenticated' && pathname !== '/admin/login') {
      if ((session?.user as any)?.role !== 'ADMIN') {
        console.error('Access denied: User is not an ADMIN');
        router.push('/');
      }
    }
  }, [mounted, status, pathname, router, session]);

  if (!mounted || status === 'loading') return null;

  // Handle Login page separately
  if (pathname === '/admin/login') return <>{children}</>;

  // Prevent flicker: Do not render admin wrapper if not an admin
  const isAdmin = status === 'authenticated' && (session?.user as any)?.role === 'ADMIN';
  
  if (!isAdmin) {
    // We return null here because the useEffect will handle the redirect
    return null;
  }

  return (
    <AdminDashboardWrapper>
      {children}
    </AdminDashboardWrapper>
  );
}
