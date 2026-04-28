'use client';
import { SyntheticEvent } from 'react';
import { IconButton, Snackbar, SnackbarCloseReason, Stack, Typography } from '@mui/material';
import IconifyIcon from 'components/base/IconifyIcon';

interface ProSnackbarProps {
  open: boolean;
  onClose: (event: any, reason?: SnackbarCloseReason) => void;
  message?: string;
  icon?: string;
  duration?: number;
}

const ProSnackbar = ({
  open,
  onClose,
  message = 'Contact Datta Sable for custom features',
  icon = 'material-symbols:info-outline-rounded',
  duration = 3000,
}: ProSnackbarProps) => {
  return (
    <Snackbar
      open={open}
      onClose={onClose}
      autoHideDuration={duration}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
      message={
        <Stack spacing={1} sx={{ alignItems: 'center' }}>
          <Stack
            sx={{
              alignItems: 'center',
              justifyContent: 'center',
              width: 40,
              height: 40,
              bgcolor: 'info.darker',
              borderRadius: '50%',
            }}
          >
            <IconifyIcon icon={icon} sx={{ fontSize: 20, color: 'info.main' }} />
          </Stack>

          <Typography variant="body2">{message}</Typography>
        </Stack>
      }
      action={
        <IconButton onClick={onClose} sx={{ mr: 1 }}>
          <IconifyIcon icon="material-symbols:close-rounded" sx={{ fontSize: 20 }} />
        </IconButton>
      }
    />
  );
};

export default ProSnackbar;
