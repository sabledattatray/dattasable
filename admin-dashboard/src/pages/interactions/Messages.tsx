'use client';
import { useState, useEffect } from 'react';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import paths from 'routes/paths';
import PageHeader from 'components/sections/user-table/PageHeader';

interface Message {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  date: string;
}

const Messages = () => {
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await fetch('/api/contact');
        if (!response.ok) throw new Error('Failed to fetch');
        const data = await response.json();
        
        // Map Prisma model to local interface
        const formattedMessages = data.map((msg: any) => ({
          ...msg,
          date: new Date(msg.createdAt).toLocaleString(),
        }));
        
        setMessages(formattedMessages);
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    };

    fetchMessages();
  }, []);

  const columns: GridColDef[] = [
    { field: 'name', headerName: 'Name', width: 150 },
    { field: 'email', headerName: 'Email', width: 200 },
    { field: 'subject', headerName: 'Subject', width: 200 },
    { field: 'message', headerName: 'Message', width: 400, flex: 1 },
    { field: 'date', headerName: 'Date', width: 180 },
  ];

  return (
    <Stack direction="column" sx={{ height: 1 }}>
      <PageHeader
        title="Messages"
        breadcrumb={[
          { label: 'Home', url: paths.root },
          { label: 'Interactions', active: false },
          { label: 'Messages', active: true },
        ]}
      />
      <Paper sx={{ flex: 1, p: { xs: 3, md: 5 }, mt: 3 }}>
        <Typography variant="h6" sx={{ mb: 3 }}>Recent Inquiries</Typography>
        <div style={{ height: 600, width: '100%' }}>
          <DataGrid
            rows={messages}
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

export default Messages;
