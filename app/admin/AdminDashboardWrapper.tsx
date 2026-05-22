'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  FileText, 
  MessageSquare, 
  Briefcase, 
  Settings, 
  Star, 
  Edit,
  Menu,
  X 
} from 'lucide-react';

const adminLinks = [
  { name: 'Projects', href: '/admin/projects', icon: Briefcase },
  { name: 'Blog', href: '/admin/blog', icon: FileText },
  { name: 'Messages', href: '/admin/messages', icon: MessageSquare },
  { name: 'Services', href: '/admin/services', icon: LayoutDashboard },
  { name: 'Testimonials', href: '/admin/testimonials', icon: Star },
  { name: 'Editor', href: '/admin/editor', icon: Edit },
  { name: 'Settings', href: '/admin/settings', icon: Settings },
];

export default function AdminDashboardWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  // Force light theme and light background specifically within admin routes
  useEffect(() => {
    const html = document.documentElement;
    const hasDark = html.classList.contains('dark');
    const hasLight = html.classList.contains('light');

    // Force light mode classes
    html.classList.remove('dark');
    html.classList.add('light');

    // Override inline background color set by RootLayout body styling
    const originalBodyBg = document.body.style.background;
    document.body.style.background = '#f8fafc';

    return () => {
      // Clean up and restore theme parameters on route unmounting
      if (hasDark) {
        html.classList.add('dark');
        html.classList.remove('light');
      } else if (hasLight) {
        html.classList.add('light');
        html.classList.remove('dark');
      }
      document.body.style.background = originalBodyBg;
    };
  }, []);

  // Collapse mobile sidebar automatically when current page route transitions
  useEffect(() => {
    setIsMobileOpen(false);
  }, [pathname]);

  // If it's a login page, don't show the sidebar or any layout wrappers
  if (pathname === '/admin/login' || pathname === '/admin/_old_login') {
    return <>{children}</>;
  }

  return (
    <div className="flex min-h-screen bg-slate-50 text-slate-900 font-sans">
      {/* Mobile Header Bar */}
      <header className="md:hidden flex items-center justify-between px-6 h-16 bg-white border-b border-slate-200 fixed top-0 left-0 right-0 z-30">
        <Link href="/" className="font-bold text-xl tracking-tight text-slate-900">
          dattasable<span className="text-blue-500">.</span> admin
        </Link>
        <button
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          className="p-2 -mr-2 text-slate-600 hover:text-slate-900 transition-colors focus:outline-none"
          aria-label="Toggle menu"
        >
          {isMobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </header>

      {/* Mobile Drawer Overlay Backdrop */}
      {isMobileOpen && (
        <div
          onClick={() => setIsMobileOpen(false)}
          className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-30 md:hidden transition-opacity duration-300"
        />
      )}

      {/* Sidebar Drawer */}
      <aside
        className={`w-64 bg-white border-r border-slate-200 flex flex-col fixed left-0 top-0 h-full z-40 transition-transform duration-300 ease-in-out md:translate-x-0 ${
          isMobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="h-16 flex items-center justify-between px-6 border-b border-slate-200 shrink-0">
          <Link href="/" className="font-bold text-xl tracking-tight text-slate-900 hover:text-blue-600 transition-colors">
            dattasable<span className="text-blue-500">.</span> admin
          </Link>
          <button
            onClick={() => setIsMobileOpen(false)}
            className="md:hidden p-2 text-slate-500 hover:text-slate-900"
            aria-label="Close sidebar"
          >
            <X size={20} />
          </button>
        </div>
        <nav className="flex-1 overflow-y-auto py-6 px-4 space-y-1">
          {adminLinks.map((link) => {
            const Icon = link.icon;
            const isActive = pathname?.startsWith(link.href);
            return (
              <Link
                key={link.name}
                href={link.href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 font-medium text-sm ${
                  isActive 
                    ? 'bg-blue-50 text-blue-700 font-semibold' 
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                <Icon size={18} className={isActive ? 'text-blue-600' : 'text-slate-400'} />
                {link.name}
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* Page Canvas Container */}
      <main className="flex-1 ml-0 md:ml-64 min-h-screen pt-20 md:pt-8 p-4 md:p-8 transition-all duration-300">
        <div className="max-w-7xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}

