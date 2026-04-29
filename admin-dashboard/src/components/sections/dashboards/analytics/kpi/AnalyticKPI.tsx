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
      }}
    >
      <Typography
        variant="caption"
        sx={{
          fontWeight: 600,
          mb: 1,
          color: 'text.secondary',
          whiteSpace: 'nowrap',
          display: 'block',
          textTransform: 'uppercase',
          letterSpacing: '0.05em'
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

        <Typography variant="h6" sx={{ fontWeight: 600 }}>
          {typeof value === 'number' ? formatNumber(value) : value}
        </Typography>
      </Stack>

      <Typography
        variant="caption"
        sx={{
          fontWeight: 500,
          color: 'text.secondary',
          display: 'flex',
          gap: 0.5,
          flexWrap: 'wrap',
        }}
      >
        {link.prefix}
        <Link href={link.url}>{link.text}</Link>
      </Typography>
    </Paper>
  );
};

export default AnalyticKPI;
