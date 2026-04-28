'use client';
import { useState, useEffect } from 'react';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { useNavigate } from 'react-router';
import paths from 'routes/paths';
import PageHeader from 'components/sections/user-table/PageHeader';
import IconifyIcon from 'components/base/IconifyIcon';

interface WebPage {
  id: string;
  title: string;
  url: string;
  status: 'Published' | 'Draft';
  lastModified: string;
}

const Pages = () => {
  const navigate = useNavigate();
  const [pages, setPages] = useState<WebPage[]>([]);

  useEffect(() => {
    const mockPages: WebPage[] = [
      { id: '1', title: 'Home', url: '/', status: 'Published', lastModified: '2026-04-28' },
      { id: '2', title: 'About', url: '/about', status: 'Published', lastModified: '2026-04-25' },
      { id: '3', title: 'Services', url: '/services', status: 'Published', lastModified: '2026-04-20' },
      { id: '4', title: 'Portfolio', url: '/portfolio', status: 'Published', lastModified: '2026-04-22' },
      { id: '5', title: 'Contact', url: '/contact', status: 'Published', lastModified: '2026-04-15' },
    ];
    setPages(mockPages);
  }, []);

  const columns: GridColDef[] = [
    { field: 'title', headerName: 'Page Title', width: 200, flex: 1 },
    { field: 'url', headerName: 'URL Slug', width: 200 },
    { 
      field: 'status', 
      headerName: 'Status', 
      width: 150,
      renderCell: (params) => (
        <span style={{ 
          color: params.value === 'Published' ? '#4caf50' : '#ffa726',
          fontWeight: 600
        }}>
          {params.value}
        </span>
      )
    },
    { field: 'lastModified', headerName: 'Last Modified', width: 180 },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 150,
      renderCell: (params) => (
        <Stack direction="row" spacing={1}>
          <Button 
            size="small" 
            onClick={() => navigate(paths.cms.editPage(params.row.id))}
            startIcon={<IconifyIcon icon="material-symbols:edit-outline" />}
          >
            Edit
          </Button>
        </Stack>
      )
    }
  ];

  return (
    <Stack direction="column" sx={{ height: 1 }}>
      <PageHeader
        title="Site Pages"
        breadcrumb={[
          { label: 'Home', url: paths.root },
          { label: 'CMS', active: false },
          { label: 'Pages', active: true },
        ]}
        actionComponent={
          <Button 
            variant="contained" 
            color="primary" 
            onClick={() => navigate(paths.cms.addPage)}
            startIcon={<IconifyIcon icon="material-symbols:add-rounded" />}
          >
            Add New Page
          </Button>
        }
      />
      <Paper sx={{ flex: 1, p: { xs: 3, md: 5 }, mt: 3 }}>
        <Typography variant="h6" sx={{ mb: 3 }}>Static Content Management</Typography>
        <div style={{ height: 600, width: '100%' }}>
          <DataGrid
            rows={pages}
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

export default Pages;
