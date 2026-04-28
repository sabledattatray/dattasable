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
  }, [mounted, status, pathname, router]);

  if (!mounted || status === 'loading') return null;

  // Handle Login page separately
  if (pathname === '/admin/login') return <>{children}</>;

  return (
    <AdminDashboardWrapper>
      {children}
    </AdminDashboardWrapper>
  );
}
