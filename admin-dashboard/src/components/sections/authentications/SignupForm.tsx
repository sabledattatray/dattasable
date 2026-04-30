'use client';
import { useNavigate } from 'react-router';
import { Box, Button, Divider, Link, Stack, TextField, Typography } from '@mui/material';
import paths from 'routes/paths';
import PasswordTextField from 'components/common/PasswordTextField';
import SocialAuth from './SocialAuth';
import { motion } from 'framer-motion';
import { User, Mail, Lock, ArrowRight, ShieldCheck } from 'lucide-react';
import IconifyIcon from 'components/base/IconifyIcon';

const SignupForm = () => {
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    navigate('/');
  };

  return (
    <Stack
      direction="column"
      sx={{
        minHeight: '100vh',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
        p: 2,
        background: (theme) => 
          theme.palette.mode === 'dark' 
            ? '#050505' 
            : '#f8fafc',
      }}
    >
      {/* Dynamic Background Accents */}
      <Box sx={{ 
        position: 'absolute', top: '-10%', left: '-5%', width: '40%', height: '40%', 
        background: 'radial-gradient(circle, rgba(59, 130, 246, 0.15) 0%, transparent 70%)', 
        filter: 'blur(80px)', zIndex: 0 
      }} />
      <Box sx={{ 
        position: 'absolute', bottom: '-10%', right: '-5%', width: '40%', height: '40%', 
        background: 'radial-gradient(circle, rgba(147, 51, 234, 0.1) 0%, transparent 70%)', 
        filter: 'blur(80px)', zIndex: 0 
      }} />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        style={{ width: '100%', maxWidth: '480px', zIndex: 1 }}
      >
        <Box
          sx={{
            p: { xs: 3, sm: 6 },
            borderRadius: 6,
            position: 'relative',
            background: (theme) => 
              theme.palette.mode === 'dark' 
                ? 'rgba(255, 255, 255, 0.02)' 
                : 'rgba(255, 255, 255, 0.8)',
            backdropFilter: 'blur(20px)',
            border: '1px solid',
            borderColor: (theme) => 
              theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)',
            boxShadow: (theme) => 
              theme.palette.mode === 'dark' 
                ? '0 30px 60px -12px rgba(0,0,0,0.8)' 
                : '0 30px 60px -12px rgba(0,0,0,0.1)',
          }}
        >
          {/* Top Gradient Line */}
          <Box sx={{ 
            position: 'absolute', top: 0, left: '10%', right: '10%', height: '2px',
            background: 'linear-gradient(90deg, transparent, #3b82f6, transparent)',
            opacity: 0.5
          }} />

          <Stack spacing={4}>
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="h3" sx={{ 
                fontFamily: 'Syne, sans-serif', 
                fontWeight: 800, 
                letterSpacing: '-0.04em',
                mb: 1,
                background: (theme) => theme.palette.mode === 'dark' 
                  ? 'linear-gradient(135deg, #fff 0%, #a1a1aa 100%)'
                  : 'linear-gradient(135deg, #000 0%, #4b5563 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}>
                Get Started<span style={{ color: '#3b82f6' }}>.</span>
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>
                Join the exclusive Datta Sable network
              </Typography>
            </Box>

            <SocialAuth />

            <Divider sx={{ 
              '&::before, &::after': { borderColor: 'divider', borderTopStyle: 'dashed' },
              color: 'text.disabled',
              fontSize: '0.65rem',
              textTransform: 'uppercase',
              fontWeight: 800,
              letterSpacing: '0.2em'
            }}>
              Direct Access
            </Divider>

            <Box component="form" noValidate onSubmit={handleSubmit}>
              <Stack spacing={2.5}>
                <TextField
                  fullWidth
                  label="Full Name"
                  placeholder="Enter your name"
                  InputProps={{
                    startAdornment: <User size={18} style={{ marginRight: 12, opacity: 0.4 }} />,
                    sx: { borderRadius: 3, height: 56 }
                  }}
                />
                <TextField
                  fullWidth
                  label="Email Address"
                  placeholder="name@email.com"
                  InputProps={{
                    startAdornment: <Mail size={18} style={{ marginRight: 12, opacity: 0.4 }} />,
                    sx: { borderRadius: 3, height: 56 }
                  }}
                />
                <PasswordTextField
                  fullWidth
                  label="Password"
                  placeholder="Create a password"
                  InputProps={{
                    startAdornment: <Lock size={18} style={{ marginRight: 12, opacity: 0.4 }} />,
                    sx: { borderRadius: 3, height: 56 }
                  }}
                />

                <Button 
                  fullWidth 
                  type="submit" 
                  variant="contained"
                  sx={{ 
                    height: 56,
                    borderRadius: 3, 
                    fontWeight: 800,
                    fontSize: '1rem',
                    textTransform: 'none',
                    fontFamily: 'Syne, sans-serif',
                    background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
                    boxShadow: '0 10px 20px -5px rgba(37, 99, 235, 0.4)',
                    '&:hover': {
                      background: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)',
                      transform: 'translateY(-1px)',
                      boxShadow: '0 15px 25px -5px rgba(37, 99, 235, 0.5)',
                    },
                    transition: 'all 0.2s ease-in-out'
                  }}
                >
                  Create My Account <ArrowRight size={18} style={{ marginLeft: 8 }} />
                </Button>
              </Stack>
            </Box>

            <Typography variant="body2" align="center" sx={{ color: 'text.secondary', fontWeight: 500 }}>
              Member already?{' '}
              <Link 
                href={paths.login} 
                sx={{ 
                  fontWeight: 700, 
                  color: 'primary.main', 
                  textDecoration: 'none',
                  '&:hover': { color: '#3b82f6', textDecoration: 'underline' }
                }}
              >
                Sign In
              </Link>
            </Typography>
          </Stack>
        </Box>

        <Stack direction="row" spacing={1} sx={{ mt: 4, justifyContent: 'center', alignItems: 'center', opacity: 0.5 }}>
          <ShieldCheck size={14} />
          <Typography variant="caption" sx={{ fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase' }}>
            Enterprise Grade Security
          </Typography>
        </Stack>
      </motion.div>
    </Stack>
  );
};

export default SignupForm;
