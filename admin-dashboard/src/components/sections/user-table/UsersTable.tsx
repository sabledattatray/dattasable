'use client';
import { RefObject, useMemo, useState, useEffect } from 'react';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Chip, { ChipOwnProps } from '@mui/material/Chip';
import Link from '@mui/material/Link';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';
import {
  DataGrid,
  GRID_CHECKBOX_SELECTION_COL_DEF,
  GridColDef,
  GridRenderCellParams,
} from '@mui/x-data-grid';
import { GridApiCommunity } from '@mui/x-data-grid/internals';
import dayjs from 'dayjs';
import { User } from 'types/users';
import DashboardMenu from 'components/common/DashboardMenu';
import ConfirmDialog from 'components/common/ConfirmDialog';
import DataGridPagination from 'components/pagination/DataGridPagination';

interface UsersTableProps {
  apiRef: RefObject<GridApiCommunity | null>;
  filterButtonEl: HTMLButtonElement | null;
}

const getStatusChipColor = (value: User['status']): ChipOwnProps['color'] => {
  switch (value) {
    case 'online':
      return 'success';
    case 'offline':
      return 'error';
    case 'away':
      return 'warning';
    default:
      return 'neutral';
  }
};

const getProviderIcon = (provider?: string) => {
  switch (provider) {
    case 'google':
      return 'logo-google';
    case 'github':
      return 'logo-github';
    case 'linkedin':
      return 'logo-linkedin';
    default:
      return 'key-outline';
  }
};

const UsersTable = ({ apiRef, filterButtonEl }: UsersTableProps) => {
  const [rows, setRows] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [userToDelete, setUserToDelete] = useState<User | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDeleteConfirm = async () => {
    if (!userToDelete) return;
    setIsDeleting(true);
    try {
      const res = await fetch(`/api/admin/users?id=${userToDelete.id}`, { method: 'DELETE' });
      if (res.ok) {
        setRows((prev) => prev.filter((u) => u.id !== userToDelete.id));
      } else {
        console.error('Failed to delete user');
      }
    } catch (error) {
      console.error('Error deleting user:', error);
    } finally {
      setIsDeleting(false);
      setUserToDelete(null);
    }
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('/api/admin/users');
        if (response.ok) {
          const data = await response.json();
          setRows(data);
        }
      } catch (error) {
        console.error('Error fetching users:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const columns: GridColDef<User>[] = useMemo(
    () => [
      {
        ...GRID_CHECKBOX_SELECTION_COL_DEF,
        width: 64,
      },
      {
        field: 'avatar',
        headerName: 'Avatar',
        width: 64,
        sortable: false,
        filterable: false,
        align: 'center',
        headerAlign: 'center',
        renderCell: (params: GridRenderCellParams<User>) => (
          <Tooltip title={params.row.name}>
            <Avatar
              src={params.row.avatar}
              alt={params.row.name}
              sx={{
                width: 32,
                height: 32,
              }}
            />
          </Tooltip>
        ),
      },
      {
        field: 'name',
        headerName: 'Name',
        minWidth: 160,
        flex: 1,
      },
      {
        field: 'email',
        headerName: 'Email',
        minWidth: 230,
        flex: 1,
        renderCell: (params: GridRenderCellParams<User>) => (
          <Link href={`mailto:${params.row.email}`} variant="body2">
            {params.row.email}
          </Link>
        ),
      },
      {
        field: 'provider',
        headerName: 'Auth Method',
        width: 130,
        renderCell: (params: GridRenderCellParams<User>) => (
          <Chip 
            label={params.row.provider?.toUpperCase() || 'N/A'} 
            size="small" 
            variant="outlined"
            sx={{ fontSize: '13px', fontWeight: 600 }}
          />
        ),
      },
      {
        field: 'role',
        headerName: 'Role',
        width: 100,
        renderCell: (params: GridRenderCellParams<User>) => (
          <Chip 
            label={params.row.role} 
            color={params.row.role === 'ADMIN' ? 'primary' : 'default'}
            size="small"
          />
        ),
      },
      {
        field: 'createdAt',
        headerName: 'Joined',
        width: 180,
        renderCell: (params: GridRenderCellParams<User>) => (
          <Typography variant="caption">
            {dayjs(params.row.createdAt).format('MMM DD, YYYY')}
          </Typography>
        ),
      },
      {
        field: 'action',
        headerName: '',
        filterable: false,
        sortable: false,
        width: 60,
        align: 'right',
        headerAlign: 'right',
        renderCell: (params: GridRenderCellParams<User>) => (
          <DashboardMenu
            menuItems={[
              {
                label: 'Delete',
                sx: { color: 'error.main' },
                onClick: () => {
                  setUserToDelete(params.row);
                },
              },
            ]}
          />
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
        rowHeight={64}
        rows={rows}
        apiRef={apiRef}
        columns={columns}
        pageSizeOptions={[8, 20, 50]}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 8,
            },
          },
        }}
        checkboxSelection
        slots={{
          basePagination: (props) => <DataGridPagination showFullPagination {...props} />,
        }}
        slotProps={{
          panel: {
            target: filterButtonEl,
          },
        }}
      />
      {userToDelete && (
        <ConfirmDialog
          open={!!userToDelete}
          title="Delete User"
          message={`Are you sure you want to delete ${userToDelete.name}? This action cannot be undone.`}
          confirmLabel={isDeleting ? 'Deleting...' : 'Delete'}
          onConfirm={handleDeleteConfirm}
          onCancel={() => !isDeleting && setUserToDelete(null)}
        />
      )}
    </Box>
  );
};

export default UsersTable;
