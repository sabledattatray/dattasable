'use client';
import { MouseEvent, SyntheticEvent, useCallback, useState } from 'react';
import {
  Box,
  Button,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Radio,
  SnackbarCloseReason,
  Typography,
  useColorScheme,
  radioClasses,
} from '@mui/material';
import { presetOptions } from 'data/color-presets';
import IconifyIcon from 'components/base/IconifyIcon';
import ProSnackbar from './ProSnackbar';

const ThemeToggler = () => {
  const { mode, setMode } = useColorScheme();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleOpen = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleModeChange = (newMode: 'light' | 'dark' | 'system') => {
    setMode(newMode);
    handleClose();
  };

  if (!mode) {
    return null;
  }

  return (
    <>
      <Button color="neutral" variant="soft" shape="circle" onClick={handleOpen}>
        <IconifyIcon 
          icon={mode === 'dark' ? 'material-symbols:dark-mode-outline' : 'material-symbols:light-mode-outline'} 
          sx={{ fontSize: 22, color: 'inherit' }} 
        />
      </Button>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        slotProps={{
          paper: {
            sx: { minWidth: 150 },
          },
        }}
      >
        <MenuItem onClick={() => handleModeChange('light')} selected={mode === 'light'}>
          <ListItemIcon>
            <IconifyIcon icon="material-symbols:light-mode-outline" />
          </ListItemIcon>
          <ListItemText>Light</ListItemText>
        </MenuItem>
        <MenuItem onClick={() => handleModeChange('dark')} selected={mode === 'dark'}>
          <ListItemIcon>
            <IconifyIcon icon="material-symbols:dark-mode-outline" />
          </ListItemIcon>
          <ListItemText>Dark</ListItemText>
        </MenuItem>
        <MenuItem onClick={() => handleModeChange('system')} selected={mode === 'system'}>
          <ListItemIcon>
            <IconifyIcon icon="material-symbols:settings-brightness-outline" />
          </ListItemIcon>
          <ListItemText>System</ListItemText>
        </MenuItem>
      </Menu>
    </>
  );
};

export default ThemeToggler;
