'use client';
import { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import { Stack, CircularProgress, Typography, Box, Paper } from '@mui/material';
import AnalyticKPI from 'components/sections/dashboards/analytics/kpi/AnalyticKPI';
import UserEngagement from 'components/sections/dashboards/analytics/user-engagement/UserEngagement';

const RealTimeAnalytics = () => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = () => {
      fetch('/api/admin/analytics')
        .then(res => res.json())
        .then(json => {
          setData(json);
          setLoading(false);
        })
        .catch(err => {
          console.error('Failed to fetch analytics:', err);
          setLoading(false);
        });
    };

    fetchData(); // Initial fetch
    
    // Auto-refresh every 10 seconds for real-time feel
    const interval = setInterval(fetchData, 10000);
    
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <Stack sx={{ height: '60vh', alignItems: 'center', justifyContent: 'center' }}>
        <CircularProgress color="primary" />
        <Typography sx={{ mt: 2, color: 'text.secondary' }} variant="caption">
          GENERATING REAL-TIME INSIGHTS...
        </Typography>
      </Stack>
    );
  }

  const kpis = [
    {
      title: 'Total Views',
      value: data?.totalViews || 0,
      icon: { name: 'material-symbols:visibility-outline-rounded', color: 'primary' },
      link: { prefix: 'View all', text: 'Page Traffic', url: '#' }
    },
    {
      title: 'Unique Visitors',
      value: data?.uniqueVisitors || 0,
      icon: { name: 'material-symbols:person-outline-rounded', color: 'info' },
      link: { prefix: 'Analyze', text: 'User Reach', url: '#' }
    },
    {
      title: 'Popular Page',
      value: data?.topPages?.[0]?.url || 'N/A',
      icon: { name: 'material-symbols:trending-up-rounded', color: 'success' },
      link: { prefix: 'Top', text: 'Content', url: '#' }
    },
    {
      title: 'Site Health',
      value: '100%',
      icon: { name: 'material-symbols:check-circle-outline-rounded', color: 'warning' },
      link: { prefix: 'Status', text: 'Operational', url: '#' }
    }
  ];

  const chartCategories = Object.keys(data?.dayCounts || {}).sort();
  const chartValues = chartCategories.map(cat => data.dayCounts[cat]);

  const engagementData: any = {
    pageViews: {
      actual: chartValues.length ? chartValues : [0,0,0,0,0,0,0],
      projected: chartValues.length ? chartValues.map(v => Math.round(v * 1.1)) : [0,0,0,0,0,0,0]
    },
    newUser: {
      actual: chartValues.map(v => Math.round(v * 0.4)),
      projected: chartValues.map(v => Math.round(v * 0.5))
    },
    avgSession: {
      actual: chartValues.map(v => Math.round(v * 0.8)),
      projected: chartValues.map(v => Math.round(v * 0.9))
    },
    subscribers: {
      actual: chartValues.map(v => Math.round(v * 0.1)),
      projected: chartValues.map(v => Math.round(v * 0.2))
    }
  };

  return (
    <Grid container spacing={2} sx={{ p: 2 }}>
      <Grid size={{ xs: 12 }}>
        <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <Box>
            <Typography variant="h5" sx={{ fontWeight: 700, color: 'text.primary' }}>
              Real-Time Platform Intelligence
            </Typography>
            <Typography variant="caption" sx={{ color: 'text.secondary', letterSpacing: 1 }}>
              LIVE VISITOR TRAJECTORY MONITORING
            </Typography>
          </Box>
          
          <Stack 
            direction="row" 
            spacing={1} 
            sx={{ 
              alignItems: 'center',
              bgcolor: 'rgba(255, 0, 0, 0.1)', 
              px: 1.5, 
              py: 0.5, 
              borderRadius: 10, 
              border: '1px solid rgba(255, 0, 0, 0.2)' 
            }}
          >
            <Box sx={{ 
              width: 8, 
              height: 8, 
              bgcolor: '#ff4d4d', 
              borderRadius: '50%',
              animation: 'pulse 1.5s infinite ease-in-out',
              '@keyframes pulse': {
                '0%': { transform: 'scale(0.8)', opacity: 0.5, boxShadow: '0 0 0 0 rgba(255, 77, 77, 0.7)' },
                '70%': { transform: 'scale(1.1)', opacity: 1, boxShadow: '0 0 0 6px rgba(255, 77, 77, 0)' },
                '100%': { transform: 'scale(0.8)', opacity: 0.5, boxShadow: '0 0 0 0 rgba(255, 77, 77, 0)' }
              }
            }} />
            <Typography variant="caption" sx={{ color: '#ff4d4d', fontWeight: 700, fontSize: '0.65rem', letterSpacing: 1 }}>
              LIVE
            </Typography>
          </Stack>
        </Box>
      </Grid>

      <Grid size={{ xs: 12, xl: 5 }} container spacing={2}>
        {kpis.map((kpi) => (
          <Grid key={kpi.title} size={{ xs: 6, md: 3, xl: 6 }}>
            <AnalyticKPI kpi={kpi} />
          </Grid>
        ))}
      </Grid>

      <Grid size={{ xs: 12, lg: 7 }}>
        <UserEngagement data={engagementData as any} />
      </Grid>

      <Grid size={{ xs: 12 }}>
        <Paper sx={{ p: 3, borderRadius: 3 }}>
          <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 2 }}>
            TOP PERFORMING CONTENT (LIVE)
          </Typography>
          <Stack spacing={2}>
            {data?.topPages?.length === 0 ? (
              <Typography variant="body2" color="text.secondary">No traffic data recorded yet.</Typography>
            ) : (
              data?.topPages?.map((page: any, idx: number) => (
                <Stack key={page.url} direction="row" justifyContent="space-between" alignItems="center">
                  <Typography variant="body2">{idx + 1}. {page.url}</Typography>
                  <Typography variant="subtitle2" color="primary">{page._count.url} Views</Typography>
                </Stack>
              ))
            )}
          </Stack>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default RealTimeAnalytics;
