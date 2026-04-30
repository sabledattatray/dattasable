import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router";
import { signIn } from 'next-auth/react';

import Logo from "components/common/Logo";

export default function SignUp() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    agreeToTerms: false,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);
    setError(null);

    if (!formData.agreeToTerms) {
      setError("Please agree to the Terms and Conditions.");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setIsSubmitted(true);
    
    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(data.message || "Account created! Please check your email to verify.");
        // Reset form on success
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          password: "",
          confirmPassword: "",
          agreeToTerms: false,
        });
      } else {
        setError(data.error || "Something went wrong. Please try again.");
      }
    } catch (err) {
      console.error("Registration error:", err);
      setError("Network error. Please check your connection.");
    } finally {
      setIsSubmitted(false);
    }
  };

  const handleSocialLogin = (provider: string) => {
    console.log(`Social login with ${provider} initiated`);
    signIn(provider.toLowerCase(), { callbackUrl: '/admin' });
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center py-10 px-4 sm:px-6 lg:px-8 overflow-y-auto relative">
      <style dangerouslySetInnerHTML={{ __html: `
        input {
          color: #1a1a1a !important;
          background-color: white !important;
        }
        input::placeholder {
          color: #9ca3af !important;
        }
        [role="checkbox"] {
          border-color: #d1d5db !important;
        }
        input[type="checkbox"] {
          appearance: none !important;
          -webkit-appearance: none !important;
        }
        input[type="checkbox"]:checked {
          background-color: #2563eb !important;
          border-color: #2563eb !important;
        }
        input[type="checkbox"]:checked + svg {
          display: block !important;
          color: white !important;
        }
      `}} />
      <div className="max-w-md w-full space-y-6 relative z-10">
        <Card className="shadow-lg border border-gray-200 min-h-[680px] flex flex-col justify-center py-6" style={{ backgroundColor: '#fcfcfc' }}>
          <CardHeader className="text-center" style={{ padding: '32px', paddingTop: '48px', paddingBottom: '0px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div className="flex justify-center mb-1 scale-110">
              <Logo showName={true} sx={{ 
                color: '#1a1a1a !important',
                '& .MuiSvgIcon-root': { color: '#1a1a1a !important' },
                '& + .MuiTypography-root': { color: '#1a1a1a !important' }, 
                '& .MuiTypography-root': { color: '#1a1a1a !important' } 
              }} />
            </div>
            <div className="space-y-2">
              <CardTitle className="text-xl font-bold text-gray-900">Sign Up</CardTitle>
              <p className="text-xs text-gray-500">Create your account to get started</p>
            </div>
          </CardHeader>
          
          <CardContent style={{ padding: '32px', paddingTop: '20px' }}>
            {message && (
              <div style={{ marginBottom: '20px', padding: '12px', backgroundColor: '#ecfdf5', border: '1px solid #10b981', borderRadius: '6px', color: '#065f46', fontSize: '14px', textAlign: 'center', fontWeight: '600' }}>
                {message}
              </div>
            )}
            {error && (
              <div style={{ marginBottom: '20px', padding: '12px', backgroundColor: '#fef2f2', border: '1px solid #ef4444', borderRadius: '6px', color: '#991b1b', fontSize: '14px', textAlign: 'center', fontWeight: '600' }}>
                {error}
              </div>
            )}
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
              <div className="flex justify-center">
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', width: '75%' }}>
                  <Label htmlFor="first-name" className="text-xs font-semibold text-gray-600 tracking-wide">First Name</Label>
                  <Input id="first-name" name="first-name" type="text" required autoFocus value={formData.firstName} onChange={(e) => setFormData({ ...formData, firstName: e.target.value })} style={{ height: '36px', padding: '0 14px', fontSize: '14px', background: 'white !important', color: '#1a1a1a !important' }} placeholder="John" />
                </div>
              </div>
              <div className="flex justify-center">
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', width: '75%' }}>
                  <Label htmlFor="last-name" className="text-xs font-semibold text-gray-600 tracking-wide">Last Name</Label>
                  <Input id="last-name" name="last-name" type="text" required value={formData.lastName} onChange={(e) => setFormData({ ...formData, lastName: e.target.value })} style={{ height: '36px', padding: '0 14px', fontSize: '14px', background: 'white !important', color: '#1a1a1a !important' }} placeholder="Doe" />
                </div>
              </div>
              <div className="flex justify-center">
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', width: '75%' }}>
                  <Label htmlFor="signup-email" className="text-xs font-semibold text-gray-600 tracking-wide">Email</Label>
                  <Input id="signup-email" name="email" type="email" required value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} style={{ height: '36px', padding: '0 14px', fontSize: '14px', background: 'white !important', color: '#1a1a1a !important' }} placeholder="your@email.com" />
                </div>
              </div>
              <div className="flex justify-center">
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', width: '75%' }}>
                  <Label htmlFor="signup-password" className="text-xs font-semibold text-gray-600 tracking-wide">Password</Label>
                  <div className="relative">
                    <Input id="signup-password" name="password" type={showPassword ? "text" : "password"} required value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })} style={{ height: '36px', padding: '0 14px', paddingRight: '40px', fontSize: '14px', background: 'white !important', color: '#1a1a1a !important' }} placeholder="••••••••" />
                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none">
                      {showPassword ? (
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" /></svg>
                      ) : (
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                      )}
                    </button>
                  </div>
                </div>
              </div>
              <div className="flex justify-center">
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', width: '75%' }}>
                  <Label htmlFor="confirm-password" className="text-xs font-semibold text-gray-600 tracking-wide">Confirm Password</Label>
                  <div className="relative">
                    <Input id="confirm-password" name="confirm-password" type={showConfirmPassword ? "text" : "password"} required value={formData.confirmPassword} onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })} style={{ height: '36px', padding: '0 14px', paddingRight: '40px', fontSize: '14px', background: 'white !important', color: '#1a1a1a !important' }} placeholder="••••••••" />
                    <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none">
                      {showConfirmPassword ? (
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" /></svg>
                      ) : (
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                      )}
                    </button>
                  </div>
                </div>
              </div>

              <div className="flex justify-center">
                <div className="flex items-center space-x-2 w-[75%]" style={{ paddingTop: '4px' }}>
                  <Checkbox id="terms" checked={formData.agreeToTerms} onCheckedChange={(checked: boolean | string) => setFormData({ ...formData, agreeToTerms: !!checked })} />
                  <Label htmlFor="terms" className="text-xs text-gray-500 leading-none">I agree to the <span className="text-blue-600 font-bold cursor-pointer hover:underline">Terms and Conditions</span></Label>
                </div>
              </div>

              <div className="flex justify-center" style={{ paddingTop: '12px' }}>
                <Button type="submit" disabled={isSubmitted} style={{ height: '42px', fontSize: '15px', width: '75%' }} className="bg-blue-600 hover:bg-blue-700 text-white rounded-md font-bold shadow-lg flex items-center justify-center gap-2">
                  {isSubmitted ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Creating Account...
                    </>
                  ) : "Create Account"}
                </Button>
              </div>
            </form>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', paddingTop: '24px' }}>
              <div className="flex justify-center">
                <div className="relative w-[75%]">
                  <div className="absolute inset-0 flex items-center"><Separator className="w-full" /></div>
                  <div className="relative flex justify-center text-[10px] uppercase tracking-widest"><span className="px-4 bg-white text-gray-400 font-bold">Or sign up with</span></div>
                </div>
              </div>

              <div className="flex justify-center">
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', width: '75%' }}>
                  <Button onClick={() => handleSocialLogin('Google')} variant="outline" style={{ height: '40px', padding: '0', minWidth: '0' }} className="w-full border-gray-200 hover:bg-gray-50 shadow-sm">
                    <svg className="w-5 h-5 mx-auto" viewBox="0 0 24 24"><path fill="#EA4335" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="#4285F4" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
                  </Button>
                  <Button onClick={() => handleSocialLogin('GitHub')} variant="outline" style={{ height: '40px', padding: '0', minWidth: '0' }} className="w-full border-gray-200 hover:bg-gray-50 shadow-sm">
                    <svg className="w-5 h-5 mx-auto" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                  </Button>
                  <Button onClick={() => handleSocialLogin('LinkedIn')} variant="outline" style={{ height: '40px', padding: '0', minWidth: '0' }} className="w-full border-gray-200 hover:bg-gray-50 shadow-sm">
                    <svg className="w-5 h-5 mx-auto" fill="#0077b5" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                  </Button>
                </div>
              </div>

              <p className="text-center text-sm text-gray-500" style={{ paddingTop: '16px' }}>
                Already have an account? <Link to="/auth/login" className="font-bold text-blue-600 hover:text-blue-700 hover:underline">Sign in</Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
