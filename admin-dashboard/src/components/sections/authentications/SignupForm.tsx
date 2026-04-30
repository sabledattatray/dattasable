'use client';
import { useNavigate } from 'react-router';
import { Box, Button, Divider, Link, Stack, TextField, Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
import paths from 'routes/paths';
import PasswordTextField from 'components/common/PasswordTextField';
import SocialAuth from './SocialAuth';

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
        height: 1,
        alignItems: 'center',
        justifyContent: 'center',
        p: { xs: 2, sm: 4 },
        background: (theme) => 
          theme.palette.mode === 'dark' 
            ? 'radial-gradient(circle at 50% 50%, rgba(13, 110, 253, 0.05) 0%, transparent 50%)'
            : 'radial-gradient(circle at 50% 50%, rgba(13, 110, 253, 0.02) 0%, transparent 50%)',
      }}
    >
      <Box
        sx={{
          width: 1,
          maxWidth: 450,
          p: { xs: 3, sm: 5 },
          borderRadius: 4,
          bgcolor: 'background.paper',
          border: '1px solid',
          borderColor: (theme) => 
            theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.05)',
          boxShadow: (theme) => 
            theme.palette.mode === 'dark' 
              ? '0 20px 40px rgba(0,0,0,0.4), inset 0 1px 1px rgba(255,255,255,0.05)'
              : '0 20px 40px rgba(0,0,0,0.05)',
          backdropFilter: 'blur(10px)',
        }}
      >
        <Stack spacing={4}>
          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="h3" sx={{ fontWeight: 800, mb: 1, letterSpacing: '-0.02em' }}>
              Create Account
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Join the Datta Sable ecosystem today
            </Typography>
          </Box>

          <SocialAuth />

          <Divider sx={{ 
            '&::before, &::after': { borderColor: 'divider' },
            color: 'text.secondary',
            fontSize: '0.75rem',
            textTransform: 'uppercase',
            fontWeight: 700,
            letterSpacing: '0.1em'
          }}>
            or use email
          </Divider>

          <Box component="form" noValidate onSubmit={handleSubmit}>
            <Stack spacing={2.5}>
              <TextField
                fullWidth
                id="name"
                label="Full Name"
                variant="outlined"
                placeholder="John Doe"
                InputProps={{
                  sx: { borderRadius: 2 }
                }}
              />
              <TextField
                fullWidth
                id="email"
                type="email"
                label="Email Address"
                variant="outlined"
                placeholder="name@example.com"
                InputProps={{
                  sx: { borderRadius: 2 }
                }}
              />
              <PasswordTextField
                fullWidth
                id="password"
                label="Password"
                variant="outlined"
                placeholder="••••••••"
                InputProps={{
                  sx: { borderRadius: 2 }
                }}
              />

              <Button 
                fullWidth 
                type="submit" 
                size="large" 
                variant="contained"
                sx={{ 
                  py: 1.5, 
                  borderRadius: 2, 
                  fontWeight: 700,
                  fontSize: '1rem',
                  textTransform: 'none',
                  boxShadow: (theme) => `0 8px 16px ${theme.palette.primary.main}40`,
                  '&:hover': {
                    boxShadow: (theme) => `0 12px 20px ${theme.palette.primary.main}60`,
                  }
                }}
              >
                Sign Up
              </Button>
            </Stack>
          </Box>

          <Typography variant="body2" align="center" color="text.secondary">
            Already have an account?{' '}
            <Link 
              href={paths.login} 
              sx={{ 
                fontWeight: 700, 
                color: 'primary.main', 
                textDecoration: 'none',
                '&:hover': { textDecoration: 'underline' }
              }}
            >
              Log in
            </Link>
          </Typography>
        </Stack>
      </Box>

      <Link 
        href={paths.settings} 
        variant="caption" 
        sx={{ 
          mt: 4, 
          color: 'text.disabled',
          textDecoration: 'none',
          '&:hover': { color: 'text.secondary' }
        }}
      >
        Trouble signing in? Contact support
      </Link>
    </Stack>
  );
};

export default SignupForm;
