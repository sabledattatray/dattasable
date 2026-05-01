'use client';
import { ReactElement } from 'react';
import IconifyIcon from 'components/base/IconifyIcon';
import { Stack, SxProps, Button, IconButton, Tooltip } from '@mui/material';
import LanguageMenu from './LanguageMenu';
import ProfileMenu from './ProfileMenu';
import LayoutToggler from './LayoutToggler';
import ThemeToggler from './ThemeToggler';

interface AppbarActionItemsProps {
  sx?: SxProps;
  searchComponent?: ReactElement;
}

const AppbarActionItems = ({ sx, searchComponent }: AppbarActionItemsProps) => {
  const handleClearCache = async () => {
    if (confirm('Clear application cache? This will reset all local settings and refresh the page.')) {
      localStorage.clear();
      sessionStorage.clear();
      if ('caches' in window) {
        const names = await caches.keys();
        await Promise.all(names.map(name => caches.delete(name)));
      }
      window.location.reload();
    }
  };

  return (
    <Stack
      className="action-items"
      spacing={1}
      sx={{
        alignItems: 'center',
        ml: 'auto',
        ...sx,
      }}
    >
      {searchComponent}
      
      <Button
        component="a"
        href="/"
        target="_blank"
        variant="text"
        size="small"
        startIcon={<IconifyIcon icon="material-symbols:home-outline" />}
        sx={{ color: 'text.secondary', textTransform: 'none', fontWeight: 500, '&:hover': { color: 'primary.main' } }}
      >
        Visit Site
      </Button>

      <Tooltip title="Clear Cache">
        <IconButton 
          size="small" 
          onClick={handleClearCache}
          sx={{ color: 'text.secondary', '&:hover': { color: '#ef4444' } }}
        >
          <IconifyIcon icon="material-symbols:mop-outline-rounded" fontSize={20} />
        </IconButton>
      </Tooltip>

      <LayoutToggler />
      <ThemeToggler />
      <ProfileMenu />
    </Stack>
  );
};

export default AppbarActionItems;
