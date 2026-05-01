'use client';
import { Grid, Box, Typography, Stack, Button, Paper, Link } from '@mui/material';
import WpAtAGlance from 'components/sections/dashboards/analytics/wp-widgets/WpAtAGlance';
import WpQuickDraft from 'components/sections/dashboards/analytics/wp-widgets/WpQuickDraft';
import IconifyIcon from 'components/base/IconifyIcon';
import { Link as RouterLink } from 'react-router';
import paths from 'routes/paths';

const WpAnalytics = () => {
  return (
    <Box sx={{ bgcolor: '#f0f0f1', minHeight: '100%', p: 2 }}>
      <Stack direction="row" spacing={2} sx={{ mb: 3, alignItems: 'center' }}>
        <Typography variant="h5" sx={{ fontSize: '23px', fontWeight: 400, color: '#1d2327' }}>
          Dashboard
        </Typography>
        <Button 
          variant="outlined" 
          size="small" 
          sx={{ 
            color: '#2271b1', 
            borderColor: '#2271b1', 
            textTransform: 'none', 
            fontSize: '13px',
            bgcolor: '#fff',
            '&:hover': { bgcolor: '#f6f7f7', borderColor: '#135e96' }
          }}
        >
          Screen Options
        </Button>
      </Stack>

      <Grid container spacing={2}>
        {/* Left Column */}
        <Grid size={{ xs: 12, lg: 6 }}>
          <Stack spacing={2}>
            <Box sx={{ 
              p: 3, 
              bgcolor: '#fff', 
              border: '1px solid #c3c4c7', 
              borderRadius: 0,
              mb: 2
            }}>
              <Typography variant="h6" sx={{ fontSize: '21px', fontWeight: 300, mb: 1, color: '#1d2327' }}>
                Welcome to Datta Sable
              </Typography>
              <Typography sx={{ fontSize: '14px', color: '#646970', mb: 3 }}>
                We've assembled some links to get you started:
              </Typography>
              <Grid container spacing={4}>
                <Grid size={{ xs: 12, md: 4 }}>
                  <Typography sx={{ fontSize: '16px', fontWeight: 600, mb: 1.5, color: '#1d2327' }}>Get Started</Typography>
                  <Button 
                    variant="contained" 
                    fullWidth
                    component={RouterLink}
                    to={paths.settings}
                    sx={{ 
                      bgcolor: '#2271b1', 
                      textTransform: 'none', 
                      py: 1, 
                      fontSize: '14px',
                      '&:hover': { bgcolor: '#135e96' }
                    }}
                  >
                    Customize Your Site
                  </Button>
                </Grid>
                <Grid size={{ xs: 12, md: 4 }}>
                  <Typography sx={{ fontSize: '16px', fontWeight: 600, mb: 1.5, color: '#1d2327' }}>Next Steps</Typography>
                  <Stack spacing={1}>
                    <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
                      <IconifyIcon icon="material-symbols:edit" fontSize={16} sx={{ color: '#646970' }} />
                      <Link component={RouterLink} to={paths.cms.addPost} sx={{ fontSize: '13px', color: '#2271b1', textDecoration: 'none', '&:hover': { color: '#72aee6' } }}>
                        Write your first blog post
                      </Link>
                    </Stack>
                    <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
                      <IconifyIcon icon="material-symbols:add" fontSize={16} sx={{ color: '#646970' }} />
                      <Link component={RouterLink} to={paths.cms.pages} sx={{ fontSize: '13px', color: '#2271b1', textDecoration: 'none', '&:hover': { color: '#72aee6' } }}>
                        Add an About page
                      </Link>
                    </Stack>
                    <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
                      <IconifyIcon icon="material-symbols:visibility" fontSize={16} sx={{ color: '#646970' }} />
                      <Link component="a" href="/" target="_blank" sx={{ fontSize: '13px', color: '#2271b1', textDecoration: 'none', '&:hover': { color: '#72aee6' } }}>
                        View your site
                      </Link>
                    </Stack>
                  </Stack>
                </Grid>
                <Grid size={{ xs: 12, md: 4 }}>
                  <Typography sx={{ fontSize: '16px', fontWeight: 600, mb: 1.5, color: '#1d2327' }}>More Actions</Typography>
                  <Stack spacing={1}>
                    <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
                      <IconifyIcon icon="material-symbols:widgets" fontSize={16} sx={{ color: '#646970' }} />
                      <Typography sx={{ fontSize: '13px', color: '#2271b1' }}>Manage widgets or menus</Typography>
                    </Stack>
                    <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
                      <IconifyIcon icon="material-symbols:comment" fontSize={16} sx={{ color: '#646970' }} />
                      <Typography sx={{ fontSize: '13px', color: '#2271b1' }}>Turn comments on or off</Typography>
                    </Stack>
                  </Stack>
                </Grid>
              </Grid>
            </Box>

            <WpAtAGlance />
          </Stack>
        </Grid>

        {/* Right Column */}
        <Grid size={{ xs: 12, lg: 6 }}>
          <Stack spacing={2}>
            <WpQuickDraft />
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
                bgcolor: '#fff'
              }}>
                <Typography sx={{ fontSize: '14px', fontWeight: 600, color: '#1d2327' }}>WordPress Events and News</Typography>
              </Box>
              <Box sx={{ p: 2 }}>
                <Typography sx={{ fontSize: '13px', color: '#646970' }}>
                  No upcoming events scheduled.
                </Typography>
              </Box>
            </Paper>
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
};

export default WpAnalytics;
