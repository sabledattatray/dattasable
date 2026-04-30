'use client';
import { useMemo, useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';
import {
  DataGrid,
  GridColDef,
  GridRenderCellParams,
} from '@mui/x-data-grid';
import dayjs from 'dayjs';
import DataGridPagination from 'components/pagination/DataGridPagination';

interface AuditLog {
  id: string;
  userId: string | null;
  action: string;
  status: string;
  details: string | null;
  ipAddress: string | null;
  createdAt: string;
}

const AuditLogsTable = () => {
  const [rows, setRows] = useState<AuditLog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const response = await fetch('/api/admin/logs');
        if (response.ok) {
          const data = await response.json();
          setRows(data);
        }
      } catch (error) {
        console.error('Error fetching logs:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchLogs();
  }, []);

  const columns: GridColDef<AuditLog>[] = useMemo(
    () => [
      {
        field: 'createdAt',
        headerName: 'Timestamp',
        width: 200,
        renderCell: (params: GridRenderCellParams<AuditLog>) => (
          <Typography variant="body2" sx={{ fontWeight: 500 }}>
            {dayjs(params.row.createdAt).format('MMM DD, YYYY hh:mm:ss A')}
          </Typography>
        ),
      },
      {
        field: 'action',
        headerName: 'Action',
        width: 150,
        renderCell: (params: GridRenderCellParams<AuditLog>) => (
          <Chip 
            label={params.row.action} 
            color={params.row.action === 'LOGIN' ? 'success' : 'primary'}
            size="small"
            sx={{ fontWeight: 600, fontSize: '11px' }}
          />
        ),
      },
      {
        field: 'status',
        headerName: 'Status',
        width: 120,
        renderCell: (params: GridRenderCellParams<AuditLog>) => (
          <Chip 
            label={params.row.status} 
            color={params.row.status === 'SUCCESS' ? 'success' : 'error'}
            variant="outlined"
            size="small"
          />
        ),
      },
      {
        field: 'details',
        headerName: 'Details',
        minWidth: 300,
        flex: 1,
        renderCell: (params: GridRenderCellParams<AuditLog>) => (
          <Typography variant="caption" sx={{ color: 'text.secondary' }}>
            {params.row.details}
          </Typography>
        ),
      },
    ],
    [],
  );

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', p: 5 }}>
        <CircularProgress size={24} />
      </Box>
    );
  }

  return (
    <Box sx={{ width: 1 }}>
      <DataGrid
        rowHeight={56}
        rows={rows}
        columns={columns}
        pageSizeOptions={[10, 25, 50]}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 10,
            },
          },
        }}
        slots={{
          basePagination: (props) => <DataGridPagination showFullPagination {...props} />,
        }}
      />
    </Box>
  );
};

export default AuditLogsTable;
