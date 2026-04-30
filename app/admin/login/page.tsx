'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { signIn } from 'next-auth/react';
import { 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  ArrowRight,
  Loader2,
  ShieldCheck
} from 'lucide-react';

export default function AdminLoginPage() {
  const [isLoading, setIsLoading] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Isolation: Force a clean state for the login page
  useEffect(() => {
    document.documentElement.classList.remove('light');
    document.body.style.background = '#0A0A0A';
    return () => { document.body.style.background = ''; };
  }, []);

  const handleSocialLogin = async (provider: string) => {
    setIsLoading(provider);
    try {
      await signIn(provider, { callbackUrl: '/admin' });
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(null);
    }
  };

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading('email');
    try {
      await signIn('credentials', { 
        email, 
        password, 
        callbackUrl: '/admin',
        redirect: true 
      });
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(null);
    }
  };

  return (
    <div className="fixed inset-0 w-full h-full bg-[#0A0A0A] flex flex-col items-center justify-center p-4 relative overflow-hidden font-sans text-white z-[9999]">
      {/* Subtle Background Glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-600/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full max-w-[440px] z-10"
      >
        {/* Logo Section */}
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="font-display font-extrabold text-2xl tracking-tighter text-white"
            id="logo"
          >
            dattasable<span className="text-blue-500">.</span>
          </motion.h2>
        </div>

        {/* glass Card */}
        <div 
          className="bg-white/[0.03] backdrop-blur-2xl border border-white/[0.08] rounded-[24px] p-8 shadow-2xl overflow-hidden relative group"
          id="login-card"
        >
          {/* Subtle line glow */}
          <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent" />

          <div className="mb-10 overflow-hidden">
            <h1 className="font-display text-3xl font-bold mb-3 tracking-[-0.03em] text-white">Admin Login</h1>
            <p className="text-zinc-400 text-sm">Access your dashboard securely</p>
          </div>

          <div className="space-y-4">
            {/* Social Logins */}
            <button
              onClick={() => handleSocialLogin('google')}
              disabled={!!isLoading}
              className="w-full h-12 bg-white hover:bg-zinc-100 text-black font-medium rounded-xl flex items-center justify-center gap-3 transition-all duration-200 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed group shadow-sm"
            >
              {isLoading === 'google' ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  <span>Continue with Google</span>
                </>
              )}
            </button>

            <button
              onClick={() => handleSocialLogin('github')}
              disabled={!!isLoading}
              className="w-full h-12 bg-[#18181B] hover:bg-[#27272A] border border-zinc-800 text-white font-medium rounded-xl flex items-center justify-center gap-3 transition-all duration-200 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading === 'github' ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.372.79 1.102.79 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                  <span>Continue with GitHub</span>
                </>
              )}
            </button>

            <button
              onClick={() => handleSocialLogin('linkedin')}
              disabled={!!isLoading}
              className="w-full h-12 bg-[#0A66C2] hover:bg-[#0077B5] text-white font-medium rounded-xl flex items-center justify-center gap-3 transition-all duration-200 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
            >
              {isLoading === 'linkedin' ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                  </svg>
                  <span>Continue with LinkedIn</span>
                </>
              )}
            </button>
          </div>

          <div className="flex items-center gap-4 my-8">
            <div className="h-[1px] flex-1 bg-zinc-800" />
            <span className="text-zinc-500 text-xs font-medium uppercase tracking-widest leading-none">or</span>
            <div className="h-[1px] flex-1 bg-zinc-800" />
          </div>

          {/* Email Form */}
          <form onSubmit={handleEmailLogin} className="space-y-4">
            <div className="space-y-2">
              <label className="text-xs font-semibold text-zinc-400 uppercase tracking-wider ml-1">Email Address</label>
              <div className="relative group/input">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500 group-focus-within/input:text-blue-500 transition-colors" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@company.com"
                  className="w-full h-12 !bg-[#09090B] border border-zinc-800 rounded-xl pl-10 pr-4 text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all placeholder:text-zinc-600"
                  style={{ colorScheme: 'dark' }}
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between ml-1">
                <label className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">Password</label>
                <button type="button" className="text-[11px] font-medium text-blue-500 hover:text-blue-400 transition-colors">Forgot password?</button>
              </div>
              <div className="relative group/input">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500 group-focus-within/input:text-blue-500 transition-colors" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full h-12 !bg-[#09090B] border border-zinc-800 rounded-xl pl-10 pr-12 text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all placeholder:text-zinc-600"
                  style={{ colorScheme: 'dark' }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-zinc-500 hover:text-zinc-300 transition-colors cursor-pointer"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={!!isLoading}
              className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl flex items-center justify-center gap-2 transition-all duration-200 active:scale-[0.98] shadow-lg shadow-blue-600/20 disabled:opacity-50 mt-2"
            >
              {isLoading === 'email' ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  <span>Sign In</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Footer */}
          <div className="mt-8 flex items-center justify-center gap-2 text-zinc-500">
            <ShieldCheck className="w-3.5 h-3.5 text-zinc-600" />
            <span className="text-[11px] font-medium tracking-wide uppercase">Protected by secure authentication</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
