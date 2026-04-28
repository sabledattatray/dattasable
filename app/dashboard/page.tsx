'use client';
import React, { Suspense } from 'react';
import dynamic from 'next/dynamic';
import { Grid, Paper, Typography, Box, Skeleton } from '@mui/material';

// Dynamic import for heavy charts with SSR disabled
const UserEngagementChart = dynamic(() => import('../../components/charts/UserEngagementChart'), { 
  ssr: false,
  loading: () => <Skeleton variant="rectangular" height={300} />
});

const TopCampaignsChart = dynamic(() => import('../../components/charts/TopCampaignsChart'), { 
  ssr: false,
  loading: () => <Skeleton variant="rectangular" height={300} />
});

export default function NativeDashboard() {
  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" sx={{ mb: 4, fontWeight: 700 }}>
        Native Analytics Dashboard
      </Typography>

      <Grid container spacing={3}>
        {/* KPI Cards (Server Rendered for SEO/Speed) */}
        <Grid size={{ xs: 12, md: 3 }}>
          <Paper sx={{ p: 3, bgcolor: 'background.paper' }}>
            <Typography variant="subtitle2" color="text.secondary">Total Visitors</Typography>
            <Typography variant="h4">5.9M</Typography>
          </Paper>
        </Grid>
        
        <Grid size={{ xs: 12, md: 3 }}>
          <Paper sx={{ p: 3, bgcolor: 'background.paper' }}>
            <Typography variant="subtitle2" color="text.secondary">Bounce Rate</Typography>
            <Typography variant="h4">62.1%</Typography>
          </Paper>
        </Grid>

        {/* Charts (Lazy Loaded for Performance) */}
        <Grid size={{ xs: 12, md: 8 }}>
          <Paper sx={{ p: 3, minHeight: 400 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>User Engagement</Typography>
            <Suspense fallback={<Skeleton height={300} />}>
              <UserEngagementChart />
            </Suspense>
          </Paper>
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          <Paper sx={{ p: 3, minHeight: 400 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>Top Campaigns</Typography>
            <Suspense fallback={<Skeleton height={300} />}>
              <TopCampaignsChart />
            </Suspense>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}
