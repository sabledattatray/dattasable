'use client';
import { useState, useEffect } from 'react';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import paths from 'routes/paths';
import PageHeader from 'components/sections/user-table/PageHeader';

interface Subscriber {
  id: string;
  email: string;
  date: string;
  status: 'Active' | 'Unsubscribed';
}

const Subscribers = () => {
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);

  useEffect(() => {
    // In a real app, fetch from API.
    const mockSubscribers: Subscriber[] = [
      {
        id: '1',
        email: 'news@example.com',
        date: '2026-04-28 09:00',
        status: 'Active',
      },
      {
        id: '2',
        email: 'user@gmail.com',
        date: '2026-04-25 11:20',
        status: 'Active',
      },
      {
        id: '3',
        email: 'test@test.com',
        date: '2026-04-20 14:10',
        status: 'Unsubscribed',
      }
    ];
    setSubscribers(mockSubscribers);
  }, []);

  const columns: GridColDef[] = [
    { field: 'email', headerName: 'Email Address', width: 300, flex: 1 },
    { field: 'date', headerName: 'Subscription Date', width: 200 },
    { 
      field: 'status', 
      headerName: 'Status', 
      width: 150,
      renderCell: (params) => (
        <span style={{ 
          color: params.value === 'Active' ? '#4caf50' : '#f44336',
          fontWeight: 600
        }}>
          {params.value}
        </span>
      )
    },
  ];

  return (
    <Stack direction="column" sx={{ height: 1 }}>
      <PageHeader
        title="Subscribers"
        breadcrumb={[
          { label: 'Home', url: paths.root },
          { label: 'Interactions', active: false },
          { label: 'Subscribers', active: true },
        ]}
      />
      <Paper sx={{ flex: 1, p: { xs: 3, md: 5 }, mt: 3 }}>
        <Typography variant="h6" sx={{ mb: 3 }}>Newsletter List</Typography>
        <div style={{ height: 600, width: '100%' }}>
          <DataGrid
            rows={subscribers}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 10 },
              },
            }}
            pageSizeOptions={[10, 25, 50]}
            checkboxSelection
            disableRowSelectionOnClick
          />
        </div>
      </Paper>
    </Stack>
  );
};

export default Subscribers;
