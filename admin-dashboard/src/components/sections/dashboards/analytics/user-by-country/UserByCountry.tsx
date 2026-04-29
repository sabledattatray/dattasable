'use client';
import { MouseEvent, useState } from 'react';
import { Paper, ToggleButton, ToggleButtonGroup, toggleButtonClasses } from '@mui/material';
import { UserByCountryData } from 'types/dashboard';
import SectionHeader from 'components/common/SectionHeader';
import UserByCountryTable from './UserByCountryTable';

const UserByCountry = ({ data }: { data: UserByCountryData[] }) => {
  const [period, setPeriod] = useState('weekly');

  const handleChange = (event: MouseEvent<HTMLElement>, newPeriod: string) => {
    setPeriod(newPeriod);
  };

  return (
    <Paper sx={{ p: 2.5, height: 1 }}>
      <SectionHeader
        title="Users by Country"
        subTitle="User geographical details"
        actionComponent={
          <ToggleButtonGroup
            color="primary"
            value={period}
            exclusive
            onChange={handleChange}
            aria-label="Period"
            sx={{
              [`& .${toggleButtonClasses.root}`]: {
                fontWeight: 600,
                color: 'neutral.dark',
                borderRadius: 2,
                padding: '6px 12px',
                fontSize: '13px'
              },
            }}
          >
            <ToggleButton value="weekly">Weekly</ToggleButton>
            <ToggleButton value="monthly">Monthly</ToggleButton>
            <ToggleButton value="yearly">Yearly</ToggleButton>
          </ToggleButtonGroup>
        }
        sx={{ mb: 2, flexDirection: { xs: 'column', sm: 'row' }  }}
      />

      <UserByCountryTable data={data} />
    </Paper>
  );
};

export default UserByCountry;
