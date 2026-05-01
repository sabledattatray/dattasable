'use client';
import { Box, Typography, Stack, Link, Paper, Grid } from '@mui/material';
import IconifyIcon from 'components/base/IconifyIcon';

const WpAtAGlance = () => {
  return (
    <Paper sx={{ 
      borderRadius: 0, 
      border: '1px solid #c3c4c7', 
      bgcolor: '#fff',
      boxShadow: 'none',
      overflow: 'hidden'
    }}>
      <Box sx={{ 
        p: 1.5, 
        borderBottom: '1px solid #f0f0f1', 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        bgcolor: '#fff'
      }}>
        <Typography sx={{ fontSize: '14px', fontWeight: 600, color: '#1d2327' }}>At a Glance</Typography>
        <IconifyIcon icon="material-symbols:expand-more" fontSize={18} sx={{ color: '#646970' }} />
      </Box>
      <Box sx={{ p: 2 }}>
        <Grid container spacing={1}>
          <Grid size={6}>
            <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
              <IconifyIcon icon="material-symbols:article" fontSize={16} sx={{ color: '#2271b1' }} />
              <Link href="#" sx={{ fontSize: '13px', color: '#2271b1', textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}>1 Post</Link>
            </Stack>
          </Grid>
          <Grid size={6}>
            <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
              <IconifyIcon icon="material-symbols:description" fontSize={16} sx={{ color: '#2271b1' }} />
              <Link href="#" sx={{ fontSize: '13px', color: '#2271b1', textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}>1 Page</Link>
            </Stack>
          </Grid>
          <Grid size={6}>
            <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
              <IconifyIcon icon="material-symbols:forum" fontSize={16} sx={{ color: '#2271b1' }} />
              <Link href="#" sx={{ fontSize: '13px', color: '#2271b1', textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}>1 Comment</Link>
            </Stack>
          </Grid>
        </Grid>
        <Typography sx={{ mt: 2, fontSize: '13px', color: '#646970' }}>
          WordPress 6.4.3 running Twenty Twenty-Four theme.
        </Typography>
      </Box>
    </Paper>
  );
};

export default WpAtAGlance;
