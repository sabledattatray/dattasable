'use client';
import { Avatar, Link, Paper, Typography, Stack } from '@mui/material';
import { formatNumber } from 'lib/utils';
import { AnalyticKPIData } from 'types/dashboard';
import IconifyIcon from 'components/base/IconifyIcon';

const AnalyticKPI = ({ kpi }: { kpi: AnalyticKPIData }) => {
  const { title, link, value, icon } = kpi;

  return (
    <Paper
      sx={{
        height: 1,
        p: 2,
        position: 'relative',
        overflow: 'hidden',
        background: 'rgba(255, 255, 255, 0.03)',
        border: '1px solid rgba(255, 255, 255, 0.05)',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          width: 12,
          height: 12,
          borderTop: '1px solid',
          borderLeft: '1px solid',
          borderColor: 'primary.main',
          opacity: 0.5,
        },
        '&::after': {
          content: '""',
          position: 'absolute',
          bottom: 0,
          right: 0,
          width: 12,
          height: 12,
          borderBottom: '1px solid',
          borderRight: '1px solid',
          borderColor: 'primary.main',
          opacity: 0.5,
        }
      }}
    >
      <Typography
        variant="caption"
        sx={{
          fontWeight: 700,
          mb: 1,
          color: 'text.secondary',
          whiteSpace: 'nowrap',
          display: 'block',
          textTransform: 'uppercase',
          letterSpacing: '0.1em',
          fontSize: '0.65rem'
        }}
      >
        {title}
      </Typography>
      
      <Stack direction="row" spacing={1.5} sx={{ mb: 1, alignItems: 'center' }}>
        <Avatar
          variant="rounded"
          sx={{
            width: 32,
            height: 32,
            bgcolor: `${icon.color}.lighter`,
            borderRadius: 1,
            boxShadow: `0 0 10px ${icon.color}.lighter`,
          }}
        >
          <IconifyIcon
            icon={icon.name}
            sx={{
              fontSize: 20,
              color: `${icon.color}.main`,
            }}
          />
        </Avatar>
 
        <Typography variant="h6" sx={{ fontWeight: 700, letterSpacing: '-0.02em' }}>
          {typeof value === 'number' ? formatNumber(value) : value}
        </Typography>
      </Stack>
 
      <Typography
        variant="caption"
        sx={{
          fontWeight: 600,
          color: 'primary.main',
          display: 'flex',
          gap: 0.5,
          flexWrap: 'wrap',
          fontSize: '0.7rem',
          letterSpacing: '0.05em'
        }}
      >
        {link.prefix}
        <Link href={link.url} sx={{ color: 'text.primary', textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}>{link.text}</Link>
      </Typography>
    </Paper>
  );
};

export default AnalyticKPI;
