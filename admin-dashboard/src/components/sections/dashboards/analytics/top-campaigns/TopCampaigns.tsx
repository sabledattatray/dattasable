'use client';
import { Button, Paper, Stack } from '@mui/material';
import { TopCampaignsData } from 'types/dashboard';
import IconifyIcon from 'components/base/IconifyIcon';
import DashboardSelectMenu from 'components/common/DashboardSelectMenu';
import SectionHeader from 'components/common/SectionHeader';
import TopCampaignsChart from './TopCampaignsChart';

interface TopCampaignsProps {
  data: TopCampaignsData[];
}

const TopCampaigns = ({ data }: TopCampaignsProps) => {
  return (
    <Paper
      component={Stack}
      sx={{
        height: 1,
        p: 2.5,
        flexDirection: 'column',
      }}
    >
      <SectionHeader
        title="Top Campaigns"
        subTitle="Users across sources"
        actionComponent={
          <DashboardSelectMenu
            defaultValue="this-week"
            options={[
              {
                value: 'this-week',
                label: 'This Week',
              },
              {
                value: 'last-week',
                label: 'Last Week',
              },
              {
                value: 'this-month',
                label: 'This Month',
              },
            ]}
          />
        }
        sx={{ mb: 2 }}
      />

      <TopCampaignsChart data={data} sx={{ minHeight: 140, flex: 1, mb: 1 }} />

      <Stack sx={{ justifyContent: 'space-between', alignItems: 'center' }}>
        <Button
          variant="text"
          size="small"
          endIcon={
            <IconifyIcon
              icon="material-symbols:chevron-right-rounded"
              sx={{ fontSize: '18px !important' }}
            />
          }
        >
          All Countries
        </Button>

        <Button
          variant="text"
          size="small"
          endIcon={
            <IconifyIcon
              icon="material-symbols:open-in-new-rounded"
              sx={{ fontSize: '18px !important' }}
            />
          }
        >
          See Report
        </Button>
      </Stack>
    </Paper>
  );
};

export default TopCampaigns;
