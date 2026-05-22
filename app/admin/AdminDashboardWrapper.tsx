'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { signOut, useSession } from 'next-auth/react';
import { 
  LayoutDashboard, 
  FileText, 
  MessageSquare, 
  Briefcase, 
  Settings, 
  Star, 
  Edit,
  Menu,
  X,
  Search,
  Bell,
  User,
  LogOut,
  ChevronDown
} from 'lucide-react';

const adminLinks = [
  { name: 'Projects', href: '/admin/projects', icon: Briefcase, category: 'Content' },
  { name: 'Blog', href: '/admin/blog', icon: FileText, category: 'Content' },
  { name: 'Editor', href: '/admin/editor', icon: Edit, category: 'Content' },
  { name: 'Services', href: '/admin/services', icon: LayoutDashboard, category: 'Offerings' },
  { name: 'Testimonials', href: '/admin/testimonials', icon: Star, category: 'Offerings' },
  { name: 'Messages', href: '/admin/messages', icon: MessageSquare, category: 'System' },
  { name: 'Settings', href: '/admin/settings', icon: Settings, category: 'System' },
];

export default function AdminDashboardWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { data: session } = useSession();
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

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

  // Close profile dropdown when clicking outside
  useEffect(() => {
    const handleOutsideClick = () => setIsProfileOpen(false);
    window.addEventListener('click', handleOutsideClick);
    return () => window.removeEventListener('click', handleOutsideClick);
  }, []);

  // If it's a login page, don't show the sidebar or any layout wrappers
  if (pathname === '/admin/login' || pathname === '/admin/_old_login') {
    return <>{children}</>;
  }

  const categories = ['Content', 'Offerings', 'System'];

  return (
    <div className="flex min-h-screen bg-slate-50 text-slate-900 font-sans">
      
      {/* Mobile Drawer Overlay Backdrop */}
      {isMobileOpen && (
        <div
          onClick={() => setIsMobileOpen(false)}
          className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-30 md:hidden transition-opacity duration-300"
        />
      )}

      {/* Sidebar Drawer */}
      <aside
        className={`w-64 bg-white border-r border-slate-200 flex flex-col fixed md:sticky md:h-screen md:top-0 left-0 top-0 h-full z-40 transition-transform duration-300 ease-in-out md:translate-x-0 ${
          isMobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="h-16 flex items-center justify-between px-6 border-b border-slate-200 shrink-0">
          <Link href="/" className="font-bold text-xl tracking-tight text-slate-900 hover:text-blue-600 transition-colors">
            dattasable<span className="text-blue-500">.</span> admin
          </Link>
          <button
            onClick={() => setIsMobileOpen(false)}
            className="md:hidden p-2 text-slate-500 hover:text-slate-950 transition-colors"
            aria-label="Close sidebar"
          >
            <X size={20} />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto py-6 px-4 space-y-7">
          {categories.map((category) => {
            const links = adminLinks.filter((link) => link.category === category);
            return (
              <div key={category} className="space-y-2">
                <span className="px-3 text-[10px] font-bold tracking-wider text-slate-400 uppercase">
                  {category}
                </span>
                <div className="space-y-1">
                  {links.map((link) => {
                    const Icon = link.icon;
                    const isActive = pathname?.startsWith(link.href);
                    return (
                      <Link
                        key={link.name}
                        href={link.href}
                        className={`flex items-center gap-3 px-3 py-2 rounded-xl transition-all duration-150 font-semibold text-sm ${
                          isActive 
                            ? 'bg-slate-100 text-slate-900 border-l-4 border-blue-500 pl-2 rounded-l-none' 
                            : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                        }`}
                      >
                        <Icon size={18} className={isActive ? 'text-blue-500' : 'text-slate-400'} />
                        {link.name}
                      </Link>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </nav>
      </aside>

      {/* Main Page Area */}
      <div className="flex-1 flex flex-col min-h-screen">
        
        {/* Sticky Top Header */}
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6 sticky top-0 z-30 shadow-sm">
          {/* Mobile hamburger menu */}
          <div className="flex items-center gap-4">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsMobileOpen(!isMobileOpen);
              }}
              className="p-2 -ml-2 text-slate-600 hover:text-slate-900 transition-colors md:hidden focus:outline-none"
              aria-label="Toggle menu"
            >
              <Menu size={22} />
            </button>

            {/* Desktop Mock Search Bar */}
            <div className="hidden md:flex items-center relative w-72">
              <Search size={16} className="absolute left-3 text-slate-400" />
              <input 
                type="text" 
                placeholder="Search console..." 
                className="w-full bg-slate-50 border border-slate-200 rounded-xl py-1.5 pl-9 pr-4 text-xs font-medium text-slate-700 placeholder-slate-400 outline-none focus:border-blue-500 transition-colors"
                disabled
              />
            </div>
          </div>

          {/* Right Header Navigation Panel */}
          <div className="flex items-center gap-4">
            
            {/* System Status Pill */}
            <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 bg-emerald-50 border border-emerald-100 rounded-full">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="text-[10px] font-bold text-emerald-700 uppercase tracking-wider">System Live</span>
            </div>

            {/* Notification bell mock */}
            <button className="p-2 text-slate-400 hover:text-slate-600 transition-colors relative" aria-label="Notifications">
              <Bell size={18} />
              <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-red-500 rounded-full"></span>
            </button>

            {/* User Profile dropdown */}
            <div className="relative">
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  setIsProfileOpen(!isProfileOpen);
                }}
                className="flex items-center gap-2 focus:outline-none"
              >
                <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold text-sm shadow-sm select-none">
                  {session?.user?.name ? session.user.name.charAt(0).toUpperCase() : 'A'}
                </div>
                <ChevronDown size={14} className="text-slate-400" />
              </button>

              {isProfileOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white border border-slate-200 rounded-xl shadow-lg py-1.5 z-50">
                  <div className="px-4 py-2 border-b border-slate-100">
                    <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Signed in as</p>
                    <p className="text-sm font-bold text-slate-900 truncate">{session?.user?.email || 'Admin User'}</p>
                  </div>
                  <button
                    onClick={() => signOut({ callbackUrl: '/' })}
                    className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-slate-50 font-semibold flex items-center gap-2 transition-colors"
                  >
                    <LogOut size={16} /> Sign out
                  </button>
                </div>
              )}
            </div>

          </div>
        </header>

        {/* Content canvas */}
        <main className="flex-1 p-4 md:p-8">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>

    </div>
  );
}
