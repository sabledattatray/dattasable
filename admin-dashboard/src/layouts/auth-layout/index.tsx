'use client';

import { PropsWithChildren } from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Logo from 'components/common/Logo';

const AuthLayout = ({ children }: PropsWithChildren) => {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        width: '100%',
        bgcolor: '#F9FAFB', // Reference gray background
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        py: 12,
        px: 4
      }}
    >
      {/* Subtle Grain Overlay for Premium Look */}
      <Box
        sx={{
          position: 'fixed',
          inset: 0,
          pointerEvents: 'none',
          opacity: 0.03,
          zIndex: 50,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
        }}
      />

      <Stack 
        spacing={4} 
        sx={{ 
          width: '100%', 
          maxWidth: '448px', // max-w-md
          alignItems: 'center',
          position: 'relative',
          zIndex: 10
        }}
      >
        <Box sx={{ mb: 2 }}>
          <Logo />
        </Box>
        
        <Box sx={{ width: '100%' }}>
          {children}
        </Box>
      </Stack>
    </Box>
  );
};

export default AuthLayout;
