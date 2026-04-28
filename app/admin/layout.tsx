'use client';
import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import AdminDashboardWrapper from './AdminDashboardWrapper';
import MainLayout from 'layouts/main-layout';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Basic auth check
    const auth = localStorage.getItem('admin_auth');
    if (!auth && pathname !== '/admin/login') {
      router.push('/admin/login');
    }
  }, [router, pathname]);

  if (!mounted) return null;

  // Handle Login page separately
  if (pathname === '/admin/login') return <>{children}</>;

  return (
    <AdminDashboardWrapper>
      {children}
    </AdminDashboardWrapper>
  );
}
