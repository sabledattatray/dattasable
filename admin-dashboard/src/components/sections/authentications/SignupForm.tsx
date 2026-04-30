'use client';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import { 
  Box, 
  Button, 
  Divider, 
  Link, 
  Stack, 
  TextField, 
  Typography, 
  Paper, 
  Grid,
  Checkbox,
  FormControlLabel
} from '@mui/material';
import paths from 'routes/paths';
import PasswordTextField from 'components/common/PasswordTextField';
import SocialAuth from './SocialAuth';

const SignupForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false,
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    navigate('/');
  };

  const handleChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <Box sx={{ 
      minHeight: '100vh', 
      width: '100%',
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      bgcolor: (theme) => theme.palette.mode === 'dark' ? '#0A0A0A' : '#f8fafc',
      p: 2
    }}>
      <Paper elevation={0} sx={{ 
        width: '100%', 
        maxWidth: 480, 
        p: { xs: 3, sm: 5 }, 
        borderRadius: 4,
        border: '1px solid',
        borderColor: 'divider',
        bgcolor: 'background.paper',
        boxShadow: (theme) => theme.palette.mode === 'dark' ? '0 20px 40px rgba(0,0,0,0.4)' : '0 20px 40px rgba(0,0,0,0.05)'
      }}>
        <Stack spacing={4}>
          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="h4" sx={{ fontWeight: 800, mb: 1, fontFamily: 'Syne, sans-serif', letterSpacing: '-0.02em' }}>
              Sign Up
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Create your account to get started
            </Typography>
          </Box>

          <SocialAuth />

          <Divider sx={{ typography: 'caption', color: 'text.disabled', textTransform: 'uppercase', fontWeight: 700 }}>
            or use email
          </Divider>

          <Box component="form" onSubmit={handleSubmit}>
            <Stack spacing={2.5}>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label="First Name"
                    placeholder="John"
                    value={formData.firstName}
                    onChange={(e) => handleChange('firstName', e.target.value)}
                    slotProps={{ input: { sx: { borderRadius: 2 } } }}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label="Last Name"
                    placeholder="Doe"
                    value={formData.lastName}
                    onChange={(e) => handleChange('lastName', e.target.value)}
                    slotProps={{ input: { sx: { borderRadius: 2 } } }}
                  />
                </Grid>
              </Grid>

              <TextField
                fullWidth
                label="Email"
                type="email"
                placeholder="your@email.com"
                value={formData.email}
                onChange={(e) => handleChange('email', e.target.value)}
                slotProps={{ input: { sx: { borderRadius: 2 } } }}
              />

              <PasswordTextField
                fullWidth
                label="Password"
                placeholder="••••••••"
                value={formData.password}
                onChange={(e) => handleChange('password', e.target.value)}
                slotProps={{ input: { sx: { borderRadius: 2 } } }}
              />

              <PasswordTextField
                fullWidth
                label="Confirm Password"
                placeholder="••••••••"
                value={formData.confirmPassword}
                onChange={(e) => handleChange('confirmPassword', e.target.value)}
                slotProps={{ input: { sx: { borderRadius: 2 } } }}
              />

              <FormControlLabel
                control={
                  <Checkbox 
                    checked={formData.agreeToTerms}
                    onChange={(e) => handleChange('agreeToTerms', e.target.checked)}
                    size="small"
                  />
                }
                label={
                  <Typography variant="caption" color="text.secondary">
                    I agree to the <Link href="#">Terms and Conditions</Link>
                  </Typography>
                }
              />

              <Button 
                fullWidth 
                type="submit" 
                variant="contained" 
                size="large"
                disabled={!formData.agreeToTerms}
                sx={{ 
                  py: 1.8, 
                  borderRadius: 2, 
                  fontWeight: 800, 
                  textTransform: 'none',
                  fontSize: '1rem'
                }}
              >
                Create Account
              </Button>
            </Stack>
          </Box>

          <Typography variant="body2" align="center" color="text.secondary">
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
