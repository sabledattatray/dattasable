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

  const isAuthPath = pathname?.startsWith('/admin/auth') || pathname === '/admin/login';

  useEffect(() => {
    if (mounted && status === 'unauthenticated' && pathname !== '/admin/login' && !isAuthPath) {
      router.push('/admin/login');
    }
    
    // Security: Prevent non-ADMIN users from accessing /admin paths
    if (mounted && status === 'authenticated' && pathname !== '/admin/login' && !isAuthPath) {
      if ((session?.user as any)?.role !== 'ADMIN') {
        console.error('Access denied: User is not an ADMIN');
        router.push('/');
      }
    }
  }, [mounted, status, pathname, router, session, isAuthPath]);

  if (!mounted || status === 'loading') return null;

  // Allow new auth paths to be rendered with the wrapper (for router context)
  if (isAuthPath) {
    return (
      <AdminDashboardWrapper>
        {children}
      </AdminDashboardWrapper>
    );
  }

  // Prevent flicker: Do not render admin wrapper if not an admin
  const isAdmin = status === 'authenticated' && (session?.user as any)?.role === 'ADMIN';
  
  if (!isAdmin) {
    return null;
  }

  return (
    <AdminDashboardWrapper>
      {children}
    </AdminDashboardWrapper>
  );
}
