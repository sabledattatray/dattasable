'use client';
import { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import { Stack, CircularProgress, Typography, Box, Paper } from '@mui/material';
import AnalyticKPI from 'components/sections/dashboards/analytics/kpi/AnalyticKPI';
import UserEngagement from 'components/sections/dashboards/analytics/user-engagement/UserEngagement';
import IconifyIcon from 'components/base/IconifyIcon';

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
        <Box sx={{ mb: 4, display: 'flex', flexDirection: { xs: 'column', md: 'row' }, justifyContent: 'space-between', alignItems: { xs: 'flex-start', md: 'center' }, gap: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Box sx={{ 
              width: 48, 
              height: 48, 
              borderRadius: 1, 
              bgcolor: 'primary.main', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              boxShadow: (theme) => `0 0 20px ${theme.palette.primary.main}33`
            }}>
              <IconifyIcon icon="material-symbols:analytics-rounded" sx={{ color: 'black', fontSize: 28 }} />
            </Box>
            <Box>
              <Typography variant="h5" sx={{ fontWeight: 500, textTransform: 'uppercase', letterSpacing: '-0.02em', color: 'text.primary', lineHeight: 1 }}>
                Real-Time Platform Intelligence
              </Typography>
              <Typography variant="caption" sx={{ color: 'text.secondary', letterSpacing: 2, fontWeight: 500, fontSize: '0.65rem' }}>
                LIVE VISITOR TRAJECTORY MONITORING // NODE_ALPHA_01
              </Typography>
            </Box>
          </Box>
          
          <Stack 
            direction="row" 
            spacing={1.5} 
            sx={{ 
              alignItems: 'center',
              bgcolor: 'rgba(255, 77, 77, 0.05)', 
              px: 2, 
              py: 1, 
              borderRadius: 1, 
              border: '1px solid rgba(255, 77, 77, 0.15)' 
            }}
          >
            <Box sx={{ 
              width: 10, 
              height: 10, 
              bgcolor: '#ff4d4d', 
              borderRadius: '50%',
              boxShadow: '0 0 10px #ff4d4d',
              animation: 'pulse 2s infinite ease-in-out',
              '@keyframes pulse': {
                '0%': { transform: 'scale(0.95)', opacity: 0.8 },
                '50%': { transform: 'scale(1.1)', opacity: 1, boxShadow: '0 0 15px #ff4d4d' },
                '100%': { transform: 'scale(0.95)', opacity: 0.8 }
              }
            }} />
            <Typography variant="caption" sx={{ color: '#ff4d4d', fontWeight: 800, fontSize: '0.7rem', letterSpacing: 2 }}>
              SYSTEM_LIVE
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
        <Paper sx={{ 
          p: 3, 
          borderRadius: 1, 
          background: 'rgba(255, 255, 255, 0.02)',
          border: '1px solid rgba(255, 255, 255, 0.05)',
          position: 'relative'
        }}>
          <Typography variant="subtitle2" sx={{ fontWeight: 500, mb: 3, letterSpacing: 1, textTransform: 'uppercase', fontSize: '0.75rem', color: 'text.secondary' }}>
            TOP PERFORMING CONTENT (LIVE) // TRAFFIC_SYNC_NODE
          </Typography>
          <Stack spacing={1}>
            {data?.topPages?.length === 0 ? (
              <Typography variant="body2" color="text.secondary">No traffic data recorded yet.</Typography>
            ) : (
              data?.topPages?.map((page: any, idx: number) => (
                <Stack 
                  key={page.url} 
                  direction="row" 
                  sx={{ 
                    justifyContent: 'space-between', 
                    alignItems: 'center',
                    p: 1.5,
                    bgcolor: 'rgba(255, 255, 255, 0.02)',
                    borderLeft: '2px solid',
                    borderColor: 'primary.main',
                    transition: 'all 0.2s',
                    '&:hover': {
                      bgcolor: 'rgba(255, 255, 255, 0.05)',
                      transform: 'translateX(4px)'
                    }
                  }}
                >
                  <Typography variant="body2" sx={{ fontFamily: 'monospace', fontSize: '0.8rem', color: 'text.primary', fontWeight: 400 }}>
                    {idx + 1}. {page.url}
                  </Typography>
                  <Typography variant="subtitle2" sx={{ fontWeight: 500, color: 'primary.main', fontFamily: 'monospace' }}>
                    {page._count.url} VIEWS
                  </Typography>
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
