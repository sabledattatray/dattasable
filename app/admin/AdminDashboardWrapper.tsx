'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { signOut, useSession } from 'next-auth/react';
import { useTheme } from '@/components/ThemeProvider';
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
  LogOut,
  ChevronDown,
  Sun,
  Moon,
  Globe,
  ChevronLeft,
  ChevronRight,
  Layers,
  Sparkles,
  Inbox,
  TrendingUp,
  Zap,
} from 'lucide-react';

const navItems = [
  {
    category: 'Overview',
    links: [
      { name: 'Dashboard', href: '/admin', icon: LayoutDashboard, exact: true, badge: null },
    ],
  },
  {
    category: 'Content',
    links: [
      { name: 'Projects', href: '/admin/projects', icon: Briefcase, exact: false, badge: null },
      { name: 'Add Page/Post', href: '/admin/editor', icon: Edit, exact: false, badge: null },
      { name: 'Edit Page/Post', href: '/admin/blog', icon: FileText, exact: false, badge: null },
    ],
  },
  {
    category: 'Offerings',
    links: [
      { name: 'Services', href: '/admin/services', icon: Layers, exact: false, badge: null },
      { name: 'Testimonials', href: '/admin/testimonials', icon: Star, exact: false, badge: null },
    ],
  },
  {
    category: 'System',
    links: [
      { name: 'Messages', href: '/admin/messages', icon: MessageSquare, exact: false, badge: '4' },
      { name: 'Settings', href: '/admin/settings', icon: Settings, exact: false, badge: null },
    ],
  },
];

export default function AdminDashboardWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { data: session } = useSession();
  const { theme, setTheme } = useTheme();

  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  const isDark = theme === 'dark';

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem('admin_sidebar_collapsed');
    if (saved !== null) setIsCollapsed(saved === 'true');
  }, []);

  useEffect(() => {
    setIsMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    const close = () => { setProfileOpen(false); setNotifOpen(false); };
    document.addEventListener('click', close);
    return () => document.removeEventListener('click', close);
  }, []);

  // FontAwesome for dashboard icons
  useEffect(() => {
    const existing = document.querySelector('link[data-fa]');
    if (existing) return;
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.setAttribute('data-fa', '1');
    link.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css';
    document.head.appendChild(link);
  }, []);

  const toggleCollapse = () => {
    const next = !isCollapsed;
    setIsCollapsed(next);
    localStorage.setItem('admin_sidebar_collapsed', String(next));
  };

  const isActive = (href: string, exact: boolean) =>
    exact ? pathname === href : pathname?.startsWith(href);

  const bypassLayout =
    pathname === '/admin/login' ||
    pathname?.startsWith('/admin/editor') ||
    pathname?.startsWith('/admin/auth');

  if (bypassLayout) return <>{children}</>;

  const userName = session?.user?.name || 'Admin';
  const userInitial = userName.charAt(0).toUpperCase();
  const userEmail = session?.user?.email || 'admin@dattasable.com';

  // CSS variables for theming
  const css = isDark
    ? {
        bg: '#0a0f1e',
        surface: '#0f172a',
        surface2: '#1e293b',
        border: '#1e293b',
        text: '#f1f5f9',
        muted: '#64748b',
        accent: '#6366f1',
        accentGlow: 'rgba(99,102,241,0.15)',
        headerBg: 'rgba(15,23,42,0.9)',
        sidebarBg: 'linear-gradient(180deg, #0f172a 0%, #0a0f1e 100%)',
        cardBg: '#0f172a',
        badgeBg: '#6366f1',
        activeBg: 'rgba(99,102,241,0.12)',
        activeBorder: '#6366f1',
        hoverBg: 'rgba(99,102,241,0.06)',
        shadow: '0 4px 24px rgba(0,0,0,0.4)',
        glassBg: 'rgba(15,23,42,0.8)',
      }
    : {
        bg: '#f0f4ff',
        surface: '#ffffff',
        surface2: '#f8faff',
        border: '#e2e8f0',
        text: '#0f172a',
        muted: '#64748b',
        accent: '#4f46e5',
        accentGlow: 'rgba(79,70,229,0.08)',
        headerBg: 'rgba(255,255,255,0.92)',
        sidebarBg: 'linear-gradient(180deg, #ffffff 0%, #f8faff 100%)',
        cardBg: '#ffffff',
        badgeBg: '#4f46e5',
        activeBg: 'rgba(79,70,229,0.08)',
        activeBorder: '#4f46e5',
        hoverBg: 'rgba(79,70,229,0.04)',
        shadow: '0 4px 24px rgba(0,0,0,0.08)',
        glassBg: 'rgba(255,255,255,0.9)',
      };

  const sidebarW = isCollapsed ? 72 : 260;

  return (
    <div
      style={{
        display: 'flex',
        minHeight: '100vh',
        background: css.bg,
        color: css.text,
        fontFamily: "'Inter', sans-serif",
        transition: 'background 0.3s, color 0.3s',
      }}
    >
      {/* ── Mobile overlay ── */}
      {isMobileOpen && (
        <div
          onClick={() => setIsMobileOpen(false)}
          style={{
            position: 'fixed', inset: 0,
            background: 'rgba(0,0,0,0.5)',
            backdropFilter: 'blur(4px)',
            zIndex: 40,
          }}
        />
      )}

      {/* ══════════ SIDEBAR ══════════ */}
      <aside
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          height: '100vh',
          width: sidebarW,
          background: css.sidebarBg,
          borderRight: `1px solid ${css.border}`,
          display: 'flex',
          flexDirection: 'column',
          zIndex: 50,
          transition: 'width 0.3s cubic-bezier(0.4,0,0.2,1), transform 0.3s cubic-bezier(0.4,0,0.2,1)',
          transform: isMobileOpen ? 'translateX(0)' : undefined,
          boxShadow: isDark
            ? '4px 0 24px rgba(0,0,0,0.3)'
            : '4px 0 24px rgba(0,0,0,0.06)',
          overflowX: 'hidden',
        }}
        className="hidden md:flex"
      />

      {/* Mobile sidebar */}
      <aside
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          height: '100vh',
          width: 260,
          background: css.sidebarBg,
          borderRight: `1px solid ${css.border}`,
          display: 'flex',
          flexDirection: 'column',
          zIndex: 50,
          transition: 'transform 0.3s cubic-bezier(0.4,0,0.2,1)',
          transform: isMobileOpen ? 'translateX(0)' : 'translateX(-100%)',
          boxShadow: isDark ? '4px 0 24px rgba(0,0,0,0.4)' : '4px 0 24px rgba(0,0,0,0.1)',
          overflowX: 'hidden',
        }}
        className="md:hidden"
      >
        <SidebarContent
          isCollapsed={false}
          isDark={isDark}
          css={css}
          pathname={pathname}
          isActive={isActive}
          navItems={navItems}
          userName={userName}
          userEmail={userEmail}
          userInitial={userInitial}
          onClose={() => setIsMobileOpen(false)}
          onToggleCollapse={toggleCollapse}
          onSignOut={() => signOut({ callbackUrl: '/' })}
          isMobile={true}
        />
      </aside>

      {/* Desktop sidebar */}
      <aside
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          height: '100vh',
          width: sidebarW,
          background: css.sidebarBg,
          borderRight: `1px solid ${css.border}`,
          display: 'flex',
          flexDirection: 'column',
          zIndex: 50,
          transition: 'width 0.3s cubic-bezier(0.4,0,0.2,1)',
          boxShadow: isDark ? '4px 0 24px rgba(0,0,0,0.3)' : '4px 0 24px rgba(0,0,0,0.05)',
          overflowX: 'hidden',
        }}
        className="hidden md:flex"
      >
        <SidebarContent
          isCollapsed={isCollapsed}
          isDark={isDark}
          css={css}
          pathname={pathname}
          isActive={isActive}
          navItems={navItems}
          userName={userName}
          userEmail={userEmail}
          userInitial={userInitial}
          onClose={() => setIsMobileOpen(false)}
          onToggleCollapse={toggleCollapse}
          onSignOut={() => signOut({ callbackUrl: '/' })}
          isMobile={false}
        />
      </aside>

      {/* ══════════ MAIN AREA ══════════ */}
      <div
        style={{
          marginLeft: 0,
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100vh',
          transition: 'margin-left 0.3s cubic-bezier(0.4,0,0.2,1)',
        }}
        className="md:ml-[260px]"
        data-collapsed={isCollapsed}
      >
        <style>{`
          [data-collapsed="true"] { margin-left: 0 !important; }
          @media (min-width: 768px) {
            [data-collapsed="false"] { margin-left: 260px !important; }
            [data-collapsed="true"] { margin-left: 72px !important; }
          }
        `}</style>

        {/* ── TOP HEADER ── */}
        <header
          style={{
            height: 64,
            background: css.headerBg,
            backdropFilter: 'blur(20px)',
            borderBottom: `1px solid ${css.border}`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0 24px',
            position: 'sticky',
            top: 0,
            zIndex: 30,
            boxShadow: isDark
              ? '0 1px 0 rgba(255,255,255,0.03), 0 4px 16px rgba(0,0,0,0.2)'
              : '0 1px 0 rgba(0,0,0,0.04), 0 4px 16px rgba(0,0,0,0.04)',
          }}
        >
          {/* Left: hamburger + search */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <button
              onClick={() => setIsMobileOpen(true)}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                color: css.muted,
                padding: 8,
                borderRadius: 10,
                display: 'flex',
                alignItems: 'center',
                transition: 'background 0.15s, color 0.15s',
              }}
              className="md:hidden"
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.background = css.hoverBg;
                (e.currentTarget as HTMLElement).style.color = css.text;
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.background = 'none';
                (e.currentTarget as HTMLElement).style.color = css.muted;
              }}
            >
              <Menu size={20} />
            </button>

            {/* Search bar */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                background: css.surface2,
                border: `1px solid ${css.border}`,
                borderRadius: 12,
                padding: '8px 14px',
                width: 260,
              }}
              className="hidden md:flex"
            >
              <Search size={14} color={css.muted} />
              <span style={{ fontSize: 13, color: css.muted, userSelect: 'none' }}>
                Search console...
              </span>
              <span
                style={{
                  marginLeft: 'auto',
                  fontSize: 10,
                  color: css.muted,
                  background: css.surface,
                  border: `1px solid ${css.border}`,
                  borderRadius: 5,
                  padding: '1px 5px',
                  fontWeight: 600,
                }}
              >
                ⌘K
              </span>
            </div>
          </div>

          {/* Right: theme + notifications + avatar */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            {/* System live pill */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                padding: '5px 12px',
                background: isDark ? 'rgba(16,185,129,0.08)' : 'rgba(16,185,129,0.06)',
                border: '1px solid rgba(16,185,129,0.2)',
                borderRadius: 999,
              }}
              className="hidden sm:flex"
            >
              <span style={{ position: 'relative', display: 'inline-flex', width: 8, height: 8 }}>
                <span
                  style={{
                    position: 'absolute',
                    inset: 0,
                    borderRadius: '50%',
                    background: '#10b981',
                    animation: 'ping 1.5s cubic-bezier(0,0,0.2,1) infinite',
                    opacity: 0.6,
                  }}
                />
                <span
                  style={{
                    position: 'relative',
                    display: 'inline-flex',
                    borderRadius: '50%',
                    width: 8,
                    height: 8,
                    background: '#10b981',
                  }}
                />
              </span>
              <span style={{ fontSize: 11, fontWeight: 700, color: '#10b981', letterSpacing: '0.05em' }}>
                LIVE
              </span>
            </div>

            {/* Theme toggle */}
            <button
              onClick={() => setTheme(isDark ? 'light' : 'dark')}
              style={{
                background: css.surface2,
                border: `1px solid ${css.border}`,
                cursor: 'pointer',
                color: css.muted,
                padding: 8,
                borderRadius: 10,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.2s',
                width: 38,
                height: 38,
              }}
              title={isDark ? 'Switch to Light' : 'Switch to Dark'}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.background = css.accentGlow;
                (e.currentTarget as HTMLElement).style.color = css.accent;
                (e.currentTarget as HTMLElement).style.borderColor = css.accent;
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.background = css.surface2;
                (e.currentTarget as HTMLElement).style.color = css.muted;
                (e.currentTarget as HTMLElement).style.borderColor = css.border;
              }}
            >
              {isDark ? <Sun size={17} /> : <Moon size={17} />}
            </button>

            {/* Notifications */}
            <div style={{ position: 'relative' }}>
              <button
                onClick={e => { e.stopPropagation(); setNotifOpen(!notifOpen); setProfileOpen(false); }}
                style={{
                  background: css.surface2,
                  border: `1px solid ${css.border}`,
                  cursor: 'pointer',
                  color: css.muted,
                  padding: 8,
                  borderRadius: 10,
                  display: 'flex',
                  alignItems: 'center',
                  position: 'relative',
                  transition: 'all 0.2s',
                  width: 38,
                  height: 38,
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLElement).style.background = css.accentGlow;
                  (e.currentTarget as HTMLElement).style.color = css.accent;
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.background = css.surface2;
                  (e.currentTarget as HTMLElement).style.color = css.muted;
                }}
              >
                <Bell size={17} />
                <span
                  style={{
                    position: 'absolute',
                    top: 6,
                    right: 6,
                    width: 8,
                    height: 8,
                    background: '#ef4444',
                    borderRadius: '50%',
                    border: `2px solid ${css.surface2}`,
                  }}
                />
              </button>

              {notifOpen && (
                <div
                  onClick={e => e.stopPropagation()}
                  style={{
                    position: 'absolute',
                    right: 0,
                    top: 'calc(100% + 8px)',
                    width: 320,
                    background: css.cardBg,
                    border: `1px solid ${css.border}`,
                    borderRadius: 16,
                    boxShadow: css.shadow,
                    zIndex: 100,
                    overflow: 'hidden',
                  }}
                >
                  <div
                    style={{
                      padding: '14px 18px',
                      borderBottom: `1px solid ${css.border}`,
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}
                  >
                    <span style={{ fontWeight: 700, fontSize: 14, color: css.text }}>Notifications</span>
                    <button style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 11, color: css.accent, fontWeight: 700 }}>
                      Mark all read
                    </button>
                  </div>
                  {[
                    { icon: '💬', text: 'New message from Sarah Johnson', time: '2 hrs ago', unread: true },
                    { icon: '⭐', text: 'Testimonial pending review', time: '5 hrs ago', unread: true },
                    { icon: '✅', text: 'Database backup completed', time: '1 day ago', unread: false },
                  ].map((n, i) => (
                    <div
                      key={i}
                      style={{
                        padding: '12px 18px',
                        display: 'flex',
                        gap: 12,
                        alignItems: 'flex-start',
                        background: n.unread ? css.accentGlow : 'transparent',
                        borderBottom: `1px solid ${css.border}`,
                        cursor: 'pointer',
                        transition: 'background 0.15s',
                      }}
                    >
                      <span style={{ fontSize: 18 }}>{n.icon}</span>
                      <div>
                        <p style={{ fontSize: 13, fontWeight: n.unread ? 600 : 400, color: css.text, margin: 0 }}>{n.text}</p>
                        <p style={{ fontSize: 11, color: css.muted, margin: '2px 0 0' }}>{n.time}</p>
                      </div>
                    </div>
                  ))}
                  <div style={{ padding: '10px 18px', textAlign: 'center' }}>
                    <Link href="/admin/messages" style={{ fontSize: 12, color: css.accent, fontWeight: 700, textDecoration: 'none' }}>
                      View all messages →
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* Avatar / Profile */}
            <div style={{ position: 'relative' }}>
              <button
                onClick={e => { e.stopPropagation(); setProfileOpen(!profileOpen); setNotifOpen(false); }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  padding: '4px 6px',
                  borderRadius: 12,
                  transition: 'background 0.15s',
                }}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = css.hoverBg}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = 'none'}
              >
                <div
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: '50%',
                    background: `linear-gradient(135deg, ${css.accent}, #8b5cf6)`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#fff',
                    fontWeight: 800,
                    fontSize: 14,
                    boxShadow: `0 0 0 2px ${css.surface}, 0 0 0 3px ${css.accent}40`,
                  }}
                >
                  {userInitial}
                </div>
                <ChevronDown size={12} color={css.muted} className="hidden sm:block" />
              </button>

              {profileOpen && (
                <div
                  onClick={e => e.stopPropagation()}
                  style={{
                    position: 'absolute',
                    right: 0,
                    top: 'calc(100% + 8px)',
                    width: 220,
                    background: css.cardBg,
                    border: `1px solid ${css.border}`,
                    borderRadius: 16,
                    boxShadow: css.shadow,
                    zIndex: 100,
                    overflow: 'hidden',
                  }}
                >
                  <div style={{ padding: '14px 16px', borderBottom: `1px solid ${css.border}` }}>
                    <div
                      style={{
                        width: 40,
                        height: 40,
                        borderRadius: '50%',
                        background: `linear-gradient(135deg, ${css.accent}, #8b5cf6)`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#fff',
                        fontWeight: 800,
                        fontSize: 16,
                        marginBottom: 8,
                      }}
                    >
                      {userInitial}
                    </div>
                    <p style={{ fontWeight: 700, fontSize: 13, color: css.text, margin: 0 }}>{userName}</p>
                    <p style={{ fontSize: 11, color: css.muted, margin: '2px 0 4px', wordBreak: 'break-all' }}>{userEmail}</p>
                    <span
                      style={{
                        fontSize: 9,
                        fontWeight: 700,
                        background: css.accentGlow,
                        color: css.accent,
                        border: `1px solid ${css.accent}30`,
                        padding: '2px 8px',
                        borderRadius: 999,
                        letterSpacing: '0.08em',
                      }}
                    >
                      ADMINISTRATOR
                    </span>
                  </div>
                  <Link
                    href="/"
                    style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 16px', fontSize: 13, color: css.text, textDecoration: 'none', transition: 'background 0.15s' }}
                    onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = css.hoverBg}
                    onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = 'transparent'}
                  >
                    <Globe size={14} color={css.muted} /> View Live Site
                  </Link>
                  <Link
                    href="/admin/settings"
                    style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 16px', fontSize: 13, color: css.text, textDecoration: 'none', transition: 'background 0.15s' }}
                    onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = css.hoverBg}
                    onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = 'transparent'}
                  >
                    <Settings size={14} color={css.muted} /> Security Settings
                  </Link>
                  <div style={{ height: 1, background: css.border, margin: '4px 0' }} />
                  <button
                    onClick={() => signOut({ callbackUrl: '/' })}
                    style={{
                      display: 'flex',
                      width: '100%',
                      alignItems: 'center',
                      gap: 10,
                      padding: '10px 16px',
                      fontSize: 13,
                      color: '#ef4444',
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      textAlign: 'left',
                      transition: 'background 0.15s',
                    }}
                    onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = 'rgba(239,68,68,0.06)'}
                    onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = 'transparent'}
                  >
                    <LogOut size={14} /> Sign out
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* ── PAGE CONTENT ── */}
        <main
          style={{
            flex: 1,
            padding: pathname === '/admin' ? 0 : '28px 28px',
            overflowY: 'auto',
          }}
        >
          <div
            style={{
              animation: 'fadeSlideIn 0.35s cubic-bezier(0.4,0,0.2,1)',
            }}
          >
            {children}
          </div>
        </main>
      </div>

      <style>{`
        @keyframes ping {
          75%, 100% { transform: scale(2); opacity: 0; }
        }
        @keyframes fadeSlideIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        ::-webkit-scrollbar { width: 5px; height: 5px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: ${css.border}; border-radius: 999px; }
      `}</style>
    </div>
  );
}

// ─── Sidebar Inner Content (shared between mobile and desktop) ───
function SidebarContent({
  isCollapsed, isDark, css, pathname, isActive, navItems,
  userName, userEmail, userInitial, onClose, onToggleCollapse, onSignOut, isMobile,
}: {
  isCollapsed: boolean;
  isDark: boolean;
  css: Record<string, string>;
  pathname: string | null;
  isActive: (href: string, exact: boolean) => boolean;
  navItems: Array<{ category: string; links: Array<{ name: string; href: string; icon: any; exact: boolean; badge: string | null }> }>;
  userName: string;
  userEmail: string;
  userInitial: string;
  onClose: () => void;
  onToggleCollapse: () => void;
  onSignOut: () => void;
  isMobile: boolean;
}) {
  return (
    <>
      {/* Logo */}
      <div
        style={{
          height: 64,
          display: 'flex',
          alignItems: 'center',
          padding: isCollapsed ? '0 16px' : '0 20px',
          borderBottom: `1px solid ${css.border}`,
          gap: 10,
          flexShrink: 0,
          justifyContent: isCollapsed ? 'center' : 'space-between',
        }}
      >
        <Link
          href="/"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            textDecoration: 'none',
            minWidth: 0,
          }}
        >
          <div
            style={{
              width: 34,
              height: 34,
              borderRadius: 10,
              background: `linear-gradient(135deg, ${css.accent}, #8b5cf6)`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#fff',
              fontWeight: 900,
              fontSize: 16,
              flexShrink: 0,
              boxShadow: `0 4px 12px ${css.accent}40`,
            }}
          >
            d
          </div>
          {!isCollapsed && (
            <span
              style={{
                fontWeight: 800,
                fontSize: 16,
                color: css.text,
                letterSpacing: '-0.02em',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
              }}
            >
              dattasable<span style={{ color: css.accent }}>.</span>
            </span>
          )}
        </Link>
        {isMobile && (
          <button
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: css.muted,
              display: 'flex',
              padding: 4,
            }}
          >
            <X size={18} />
          </button>
        )}
      </div>

      {/* Nav */}
      <nav
        style={{
          flex: 1,
          overflowY: 'auto',
          padding: isCollapsed ? '12px 8px' : '12px 12px',
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
        }}
      >
        {navItems.map((group: any) => (
          <div key={group.category} style={{ marginBottom: 4 }}>
            {!isCollapsed ? (
              <p
                style={{
                  fontSize: 10,
                  fontWeight: 700,
                  letterSpacing: '0.1em',
                  color: css.muted,
                  textTransform: 'uppercase',
                  padding: '10px 10px 4px',
                  margin: 0,
                }}
              >
                {group.category}
              </p>
            ) : (
              <div style={{ height: 1, background: css.border, margin: '8px 4px' }} />
            )}
            {group.links.map((link: any) => {
              const active = isActive(link.href, link.exact);
              const Icon = link.icon;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  title={isCollapsed ? link.name : undefined}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 10,
                    padding: isCollapsed ? '10px 0' : '9px 10px',
                    borderRadius: 10,
                    textDecoration: 'none',
                    fontSize: 13.5,
                    fontWeight: active ? 700 : 500,
                    color: active ? css.accent : css.muted,
                    background: active ? css.activeBg : 'transparent',
                    borderLeft: active && !isCollapsed ? `3px solid ${css.activeBorder}` : '3px solid transparent',
                    transition: 'all 0.15s',
                    justifyContent: isCollapsed ? 'center' : 'flex-start',
                    marginBottom: 1,
                    position: 'relative',
                  }}
                  onMouseEnter={e => {
                    if (!active) {
                      (e.currentTarget as HTMLElement).style.background = css.hoverBg;
                      (e.currentTarget as HTMLElement).style.color = css.text;
                    }
                  }}
                  onMouseLeave={e => {
                    if (!active) {
                      (e.currentTarget as HTMLElement).style.background = 'transparent';
                      (e.currentTarget as HTMLElement).style.color = css.muted;
                    }
                  }}
                >
                  <Icon size={18} style={{ flexShrink: 0 }} />
                  {!isCollapsed && (
                    <>
                      <span style={{ flex: 1 }}>{link.name}</span>
                      {link.badge && (
                        <span
                          style={{
                            background: css.accent,
                            color: '#fff',
                            fontSize: 10,
                            fontWeight: 700,
                            padding: '1px 7px',
                            borderRadius: 999,
                          }}
                        >
                          {link.badge}
                        </span>
                      )}
                    </>
                  )}
                </Link>
              );
            })}
          </div>
        ))}
      </nav>

      {/* Sidebar footer */}
      <div
        style={{
          padding: isCollapsed ? '12px 8px' : '12px 16px',
          borderTop: `1px solid ${css.border}`,
          display: 'flex',
          flexDirection: 'column',
          gap: 8,
        }}
      >
        {/* User mini-card */}
        {!isCollapsed && (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              padding: '10px 12px',
              background: css.surface2,
              borderRadius: 12,
              border: `1px solid ${css.border}`,
            }}
          >
            <div
              style={{
                width: 32,
                height: 32,
                borderRadius: '50%',
                background: `linear-gradient(135deg, ${css.accent}, #8b5cf6)`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#fff',
                fontWeight: 800,
                fontSize: 13,
                flexShrink: 0,
              }}
            >
              {userInitial}
            </div>
            <div style={{ minWidth: 0, flex: 1 }}>
              <p style={{ fontWeight: 700, fontSize: 12, color: css.text, margin: 0, truncate: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>
                {userName}
              </p>
              <p style={{ fontSize: 10, color: css.muted, margin: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                {userEmail}
              </p>
            </div>
          </div>
        )}

        {/* Collapse toggle (desktop only) */}
        {!isMobile && (
          <button
            onClick={onToggleCollapse}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 6,
              width: '100%',
              padding: '8px',
              background: 'none',
              border: `1px solid ${css.border}`,
              borderRadius: 10,
              cursor: 'pointer',
              color: css.muted,
              fontSize: 12,
              fontWeight: 600,
              transition: 'all 0.15s',
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLElement).style.background = css.hoverBg;
              (e.currentTarget as HTMLElement).style.color = css.text;
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLElement).style.background = 'none';
              (e.currentTarget as HTMLElement).style.color = css.muted;
            }}
          >
            {isCollapsed ? <ChevronRight size={15} /> : <><ChevronLeft size={15} /> <span>Collapse</span></>}
          </button>
        )}
      </div>
    </>
  );
}
