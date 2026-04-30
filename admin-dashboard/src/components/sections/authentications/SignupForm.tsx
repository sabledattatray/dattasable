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
        p: 3,
        background: (theme) => 
          theme.palette.mode === 'dark' ? '#050505' : '#f0f2f5',
      }}
    >
      {/* Background Accents */}
      <Box sx={{ 
        position: 'absolute', top: '20%', left: '10%', width: '30%', height: '30%', 
        background: 'rgba(59, 130, 246, 0.1)', filter: 'blur(100px)', zIndex: 0 
      }} />

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        style={{ width: '100%', maxWidth: '420px', zIndex: 1 }}
      >
        <Box
          sx={{
            p: { xs: 3, sm: 5 },
            borderRadius: 5,
            bgcolor: 'background.paper',
            border: '1px solid',
            borderColor: 'divider',
            boxShadow: (theme) => 
              theme.palette.mode === 'dark' 
                ? '0 25px 50px -12px rgba(0,0,0,0.7)' 
                : '0 20px 40px -12px rgba(0,0,0,0.1)',
          }}
        >
          <Stack spacing={3.5}>
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="h4" sx={{ 
                fontFamily: 'Syne, sans-serif', 
                fontWeight: 800, 
                letterSpacing: '-0.02em',
                mb: 0.5
              }}>
                Get Started<span style={{ color: '#3b82f6' }}>.</span>
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Join the exclusive Datta Sable network
              </Typography>
            </Box>

            <SocialAuth />

            <Divider sx={{ 
              color: 'text.disabled',
              fontSize: '0.7rem',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.1em'
            }}>
              Direct Access
            </Divider>

            <Box component="form" noValidate onSubmit={handleSubmit}>
              <Stack spacing={2}>
                <TextField
                  fullWidth
                  label="Full Name"
                  placeholder="Your Name"
                  variant="outlined"
                  slotProps={{
                    input: {
                      startAdornment: <User size={18} style={{ marginRight: 12, opacity: 0.5 }} />,
                      sx: { borderRadius: 2.5, bgcolor: 'action.hover' }
                    }
                  }}
                />
                <TextField
                  fullWidth
                  label="Email Address"
                  placeholder="name@email.com"
                  variant="outlined"
                  slotProps={{
                    input: {
                      startAdornment: <Mail size={18} style={{ marginRight: 12, opacity: 0.5 }} />,
                      sx: { borderRadius: 2.5, bgcolor: 'action.hover' }
                    }
                  }}
                />
                <PasswordTextField
                  fullWidth
                  label="Password"
                  placeholder="••••••••"
                  variant="outlined"
                  slotProps={{
                    input: {
                      startAdornment: <Lock size={18} style={{ marginRight: 12, opacity: 0.5 }} />,
                      sx: { borderRadius: 2.5, bgcolor: 'action.hover' }
                    }
                  }}
                />

                <Button 
                  fullWidth 
                  type="submit" 
                  variant="contained"
                  sx={{ 
                    py: 1.5,
                    borderRadius: 2.5, 
                    fontWeight: 800,
                    fontSize: '0.95rem',
                    textTransform: 'none',
                    fontFamily: 'Syne, sans-serif',
                    boxShadow: '0 8px 16px rgba(37, 99, 235, 0.2)',
                  }}
                >
                  Create Account <ArrowRight size={18} style={{ marginLeft: 8 }} />
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
                  '&:hover': { textDecoration: 'underline' }
                }}
              >
                Sign In
              </Link>
            </Typography>
          </Stack>
        </Box>

        <Stack direction="row" spacing={1} sx={{ mt: 3, justifyContent: 'center', alignItems: 'center', opacity: 0.4 }}>
          <ShieldCheck size={14} />
          <Typography variant="caption" sx={{ fontWeight: 700, letterSpacing: '0.05em', textTransform: 'uppercase' }}>
            Secure Authentication
          </Typography>
        </Stack>
      </motion.div>
    </Stack>
  );
};

export default SignupForm;
