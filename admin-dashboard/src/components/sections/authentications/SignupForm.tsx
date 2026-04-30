'use client';
import { useNavigate } from 'react-router';
import { Box, Button, Divider, Link, Stack, TextField, Typography, Paper } from '@mui/material';
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
    <Box sx={{ 
      minHeight: '100vh', 
      width: '100%',
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      bgcolor: (theme) => theme.palette.mode === 'dark' ? '#000' : '#f5f5f5',
      p: 2
    }}>
      <Paper elevation={0} sx={{ 
        width: '100%', 
        maxWidth: 400, 
        p: 4, 
        borderRadius: 4,
        border: '1px solid',
        borderColor: 'divider',
        bgcolor: 'background.paper'
      }}>
        <Stack spacing={3} sx={{ width: '100%' }}>
          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="h4" sx={{ fontWeight: 800, mb: 1, fontFamily: 'Syne, sans-serif' }}>
              Sign Up
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Create your account to continue
            </Typography>
          </Box>

          <SocialAuth />

          <Divider>or</Divider>

          <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%' }}>
            <Stack spacing={2}>
              <TextField
                fullWidth
                label="Name"
                variant="outlined"
                placeholder="Enter your name"
                slotProps={{ input: { sx: { borderRadius: 2 } } }}
              />
              <TextField
                fullWidth
                label="Email"
                variant="outlined"
                placeholder="Enter your email"
                slotProps={{ input: { sx: { borderRadius: 2 } } }}
              />
              <PasswordTextField
                fullWidth
                label="Password"
                variant="outlined"
                placeholder="Create a password"
                slotProps={{ input: { sx: { borderRadius: 2 } } }}
              />
              <Button 
                fullWidth 
                type="submit" 
                variant="contained" 
                size="large"
                sx={{ py: 1.5, borderRadius: 2, fontWeight: 700, mt: 1 }}
              >
                Create Account
              </Button>
            </Stack>
          </Box>

          <Typography variant="body2" align="center">
            Already have an account?{' '}
            <Link href={paths.login} sx={{ fontWeight: 700, textDecoration: 'none' }}>
              Sign In
            </Link>
          </Typography>
        </Stack>
      </Paper>
    </Box>
  );
};

export default SignupForm;
