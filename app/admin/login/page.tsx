'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
// @ts-ignore - next-auth is not installed in this environment but is required for production Next.js
import { signIn } from 'next-auth/react';
import { 
  Github, 
  Linkedin, 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  Chrome, 
  ArrowRight,
  Loader2,
  ShieldCheck
} from 'lucide-react';

export default function AdminLoginPage() {
  const [isLoading, setIsLoading] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

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
    <div className="min-h-screen w-full bg-[#0A0A0A] flex flex-col items-center justify-center p-4 relative overflow-hidden font-sans text-white">
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
        <div className="text-center mb-10">
          <motion.h2 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="font-display font-extrabold text-2xl tracking-tighter text-white"
          >
            dattasable<span className="text-blue-500">.</span>
          </motion.h2>
        </div>

        {/* glass Card */}
        <div className="bg-white/[0.03] backdrop-blur-2xl border border-white/[0.08] rounded-[24px] p-8 shadow-2xl overflow-hidden relative group">
          {/* Subtle line glow */}
          <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent" />

          <div className="mb-8 overflow-hidden">
            <h1 className="font-display text-2xl font-bold mb-2 tracking-tight text-white">Admin Login</h1>
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
                  <Chrome className="w-5 h-5 fill-current text-current" />
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
                  <Github className="w-5 h-5" />
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
                  <Linkedin className="w-5 h-5" />
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
                  className="w-full h-12 bg-[#09090B] border border-zinc-800 rounded-xl pl-10 pr-4 text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all placeholder:text-zinc-600"
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
                  className="w-full h-12 bg-[#09090B] border border-zinc-800 rounded-xl pl-10 pr-12 text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all placeholder:text-zinc-600"
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
              className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl flex items-center justify-center gap-2 transition-all duration-200 active:scale-[0.98] shadow-lg shadow-blue-600/20 disabled:opacity-50"
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
