'use client';

import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { 
  Box, 
  Button, 
  TextField, 
  Typography, 
  Stack, 
  Paper, 
  IconButton, 
  InputAdornment,
  Divider,
  Link
} from '@mui/material';
import { 
  Eye, 
  EyeOff, 
  Mail, 
  Lock, 
  AlertCircle, 
  ChevronRight,
  Loader2
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface LoginFormProps {
  defaultCredential?: { email: string; password: string };
}

const LoginForm = ({ defaultCredential }: LoginFormProps) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: defaultCredential?.email || "",
    password: defaultCredential?.password || "",
  });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [socialLoading, setSocialLoading] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Simulate login logic
    setTimeout(() => {
      setLoading(false);
      navigate('/');
    }, 1000);
  };

  const handleSocialSignIn = (provider: string) => {
    setSocialLoading(provider);
    setTimeout(() => setSocialLoading(null), 1000);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
      <Paper
        elevation={0}
        component={motion.div}
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        sx={{
          width: '100%',
          maxWidth: 420,
          p: 4, // 32px padding
          borderRadius: 5, // 20px radius
          border: '1px solid',
          borderColor: 'grey.100',
          boxShadow: '0 8px 40px rgba(0,0,0,0.04)',
          bgcolor: 'white',
          display: 'flex',
          flexDirection: 'column',
          gap: 2.5 // 20px gap
        }}
      >
        {/* Header Section */}
        <Box sx={{ textAlign: 'left', mb: 1 }}>
          <Typography 
            variant="h4" 
            sx={{ 
              fontSize: 28, 
              fontWeight: 700, 
              color: 'grey.900', 
              mb: 0.5,
              fontFamily: 'Syne, sans-serif'
            }}
          >
            Sign In
          </Typography>
          <Typography 
            variant="body2" 
            sx={{ 
              fontSize: 15, 
              color: 'grey.500', 
              fontWeight: 500 
            }}
          >
            Welcome back! Please sign in to your account
          </Typography>
        </Box>

        {/* Form Section */}
        <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%' }}>
          <Stack spacing={2.5}> {/* 20px spacing between blocks */}
            
            <AnimatePresence mode="wait">
              {error && (
                <Box
                  component={motion.div}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  sx={{
                    p: 2,
                    bgcolor: 'error.lighter',
                    border: '1px solid',
                    borderColor: 'error.light',
                    borderRadius: 3,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1.5
                  }}
                >
                  <AlertCircle size={18} color="#d32f2f" />
                  <Typography variant="caption" sx={{ color: 'error.main', fontWeight: 600 }}>
                    {error}
                  </Typography>
                </Box>
              )}
            </AnimatePresence>

            {/* Email Field */}
            <Box>
              <Typography 
                variant="caption" 
                sx={{ 
                  fontWeight: 700, 
                  color: 'grey.700', 
                  mb: 1, 
                  display: 'block', 
                  textTransform: 'uppercase', 
                  letterSpacing: '0.05em' 
                }}
              >
                Email Address
              </Typography>
              <TextField
                fullWidth
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="name@company.com"
                variant="outlined"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Mail size={18} color="#9e9e9e" />
                    </InputAdornment>
                  ),
                  sx: { 
                    height: 48, 
                    borderRadius: 3, 
                    bgcolor: '#F9FAFB',
                    '& fieldset': { borderColor: '#E5E7EB' },
                  }
                }}
              />
            </Box>

            {/* Password Field */}
            <Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                <Typography 
                  variant="caption" 
                  sx={{ 
                    fontWeight: 700, 
                    color: 'grey.700', 
                    textTransform: 'uppercase', 
                    letterSpacing: '0.05em' 
                  }}
                >
                  Password
                </Typography>
                <Link 
                  href="#" 
                  underline="none" 
                  sx={{ fontSize: 12, fontWeight: 700, color: 'grey.400', '&:hover': { color: 'black' } }}
                >
                  Forgot password?
                </Link>
              </Box>
              <TextField
                fullWidth
                required
                type={showPassword ? 'text' : 'password'}
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                placeholder="••••••••"
                variant="outlined"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Lock size={18} color="#9e9e9e" />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={() => setShowPassword(!showPassword)} edge="end" size="small">
                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                      </IconButton>
                    </InputAdornment>
                  ),
                  sx: { 
                    height: 48, 
                    borderRadius: 3, 
                    bgcolor: '#F9FAFB',
                    '& fieldset': { borderColor: '#E5E7EB' },
                  }
                }}
              />
            </Box>

            {/* Sign In Button */}
            <Button
              type="submit"
              fullWidth
              disabled={loading || !!socialLoading}
              variant="contained"
              sx={{
                mt: 1,
                height: 48,
                borderRadius: 3,
                bgcolor: 'black',
                fontWeight: 700,
                textTransform: 'none',
                fontSize: 15,
                boxShadow: '0 8px 16px rgba(0,0,0,0.1)',
                '&:hover': { bgcolor: 'grey.900' }
              }}
            >
              {loading ? (
                <Loader2 size={20} className="animate-spin" />
              ) : (
                <>
                  Sign In <ChevronRight size={18} style={{ marginLeft: 8 }} />
                </>
              )}
            </Button>
          </Stack>
        </Box>

        {/* Divider Section */}
        <Box sx={{ mt: 1, mb: 0, position: 'relative' }}>
          <Divider sx={{ '&::before, &::after': { borderColor: 'grey.100' } }}>
            <Typography variant="caption" sx={{ color: 'grey.400', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.15em', px: 1 }}>
              Or continue with
            </Typography>
          </Divider>
        </Box>

        {/* Social Buttons */}
        <Stack direction="row" spacing={1.5} sx={{ width: '100%' }}>
          <Button
            onClick={() => handleSocialSignIn('google')}
            disabled={!!socialLoading}
            variant="outlined"
            fullWidth
            sx={{
              height: 44,
              borderRadius: 3,
              borderColor: 'grey.200',
              color: 'grey.700',
              fontWeight: 700,
              textTransform: 'none',
              '&:hover': { bgcolor: 'grey.50', borderColor: 'grey.300' }
            }}
          >
            {socialLoading === 'google' ? <Loader2 size={16} className="animate-spin" /> : (
              <Box component="img" src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" sx={{ width: 16, height: 16, mr: 1.5 }} />
            )}
            Google
          </Button>
          <Button
            onClick={() => handleSocialSignIn('github')}
            disabled={!!socialLoading}
            variant="outlined"
            fullWidth
            sx={{
              height: 44,
              borderRadius: 3,
              borderColor: 'grey.200',
              color: 'grey.700',
              fontWeight: 700,
              textTransform: 'none',
              '&:hover': { bgcolor: 'grey.50', borderColor: 'grey.300' }
            }}
          >
            {socialLoading === 'github' ? <Loader2 size={16} className="animate-spin" /> : (
              <Box component="svg" sx={{ width: 16, height: 16, mr: 1.5, fill: 'currentColor' }} viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </Box>
            )}
            GitHub
          </Button>
        </Stack>

        {/* Bottom Section */}
        <Stack spacing={1} sx={{ mt: 2, alignItems: 'center' }}>
          <Typography variant="body2" sx={{ fontSize: 13, color: 'grey.400', fontWeight: 500 }}>
            Don't have an account?{' '}
            <Link href="#" underline="none" sx={{ color: 'black', fontWeight: 700, '&:hover': { textDecoration: 'underline' } }}>
              Contact Support
            </Link>
          </Typography>
          <Link 
            href="/" 
            underline="none" 
            sx={{ 
              fontSize: 12, 
              color: 'grey.400', 
              fontWeight: 600, 
              display: 'flex', 
              alignItems: 'center', 
              gap: 1,
              '&:hover': { color: 'black' }
            }}
          >
            ← Back to site
          </Link>
        </Stack>
      </Paper>
    </Box>
  );
};

export default LoginForm;
