'use client';
import { PropsWithChildren, useState } from 'react';
import { NavLink } from 'react-router';
import {
  Box,
  Button,
  Divider,
  ListItemIcon,
  MenuItem,
  MenuItemProps,
  Stack,
  Switch,
  SxProps,
  Typography,
  listClasses,
  listItemIconClasses,
  paperClasses,
  useColorScheme,
} from '@mui/material';
import Menu from '@mui/material/Menu';
import { users } from 'data/users';
import paths from 'routes/paths';
import IconifyIcon from 'components/base/IconifyIcon';
import StatusAvatar from 'components/base/StatusAvatar';
import { signOut } from 'next-auth/react';

interface ProfileMenuItemProps extends MenuItemProps {
  icon: string;
  to?: string;
  sx?: SxProps;
}

const demoUser = {
  id: 0,
  email: 'datta@dattasable.com',
  name: 'Datta Sable',
  avatar: users[0].avatar,
  designation: 'BI & Analytics Expert',
};

/* ─────────────────────────────────────────── */
/*  ProfileMenuItem                            */
/* ─────────────────────────────────────────── */
const ProfileMenuItem = ({
  icon,
  onClick,
  children,
  to,
  sx,
  ...rest
}: PropsWithChildren<ProfileMenuItemProps>) => {
  const linkProps = to
    ? { component: NavLink, to, style: { textDecoration: 'none', color: 'inherit' } }
    : {};

  return (
    <MenuItem
      onClick={onClick}
      {...linkProps}
      {...rest}
      sx={{
        gap: 1.5,
        px: 2,
        py: 1,
        borderRadius: 1,
        mx: 1,
        color: 'text.primary',
        transition: 'background 0.18s, color 0.18s',
        '&:hover': {
          background: (theme) =>
            `linear-gradient(90deg, ${theme.palette.primary.main}18 0%, ${theme.palette.primary.main}08 100%)`,
          color: 'primary.main',
          [`& .${listItemIconClasses.root}`]: {
            color: 'primary.main',
          },
        },
        ...sx,
      }}
    >
      <ListItemIcon
        sx={{
          [`&.${listItemIconClasses.root}`]: {
            minWidth: 'unset',
            color: 'text.secondary',
            transition: 'color 0.18s',
          },
        }}
      >
        <IconifyIcon icon={icon} sx={{ fontSize: 20 }} />
      </ListItemIcon>
      <Box sx={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        {children}
      </Box>
    </MenuItem>
  );
};

/* ─────────────────────────────────────────── */
/*  ProfileMenu                                */
/* ─────────────────────────────────────────── */
const ProfileMenu = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const { mode, setMode } = useColorScheme();
  const isDark = mode === 'dark';

  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const toggleDark = () => {
    setMode(isDark ? 'light' : 'dark');
  };

  return (
    <>
      {/* ── Trigger button ── */}
      <Button
        color="neutral"
        variant="text"
        shape="circle"
        onClick={handleClick}
        sx={{ height: 44, width: 44 }}
      >
        <StatusAvatar
          alt={demoUser.name}
          status="online"
          src={demoUser.avatar ?? undefined}
          sx={{
            width: 40,
            height: 40,
            border: 1,
            borderColor: 'divider',
          }}
        />
      </Button>

      {/* ── Dropdown menu ── */}
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        sx={{
          [`& .${paperClasses.root}`]: {
            minWidth: 300,
            borderRadius: 2,
            mt: 0.5,
            boxShadow: (theme) =>
              theme.palette.mode === 'dark'
                ? '0 8px 32px rgba(0,0,0,0.45)'
                : '0 8px 32px rgba(0,0,0,0.12)',
          },
          [`& .${listClasses.root}`]: { py: 0 },
        }}
      >
        {/* ── User header ── */}
        <Stack
          direction="row"
          sx={{
            alignItems: 'center',
            gap: 2,
            px: 2.5,
            py: 2,
          }}
        >
          <StatusAvatar
            status="online"
            alt={demoUser.name}
            src={demoUser.avatar ?? undefined}
            sx={{ width: 48, height: 48, flexShrink: 0 }}
          />
          <Box>
            <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
              {demoUser.name}
            </Typography>
            <Typography variant="caption" sx={{ color: 'text.secondary' }}>
              {demoUser.email}
            </Typography>
            {demoUser.designation && (
              <Typography variant="caption" sx={{ display: 'flex', alignItems: 'center', gap: 0.5, color: 'warning.main', mt: 0.25 }}>
                <IconifyIcon icon="material-symbols:diamond-rounded" sx={{ fontSize: 14 }} />
                {demoUser.designation}
              </Typography>
            )}
          </Box>
        </Stack>

        <Divider />

        {/* ── Section 1: Accessibility & Preferences ── */}
        <Box sx={{ py: 1 }}>
          <ProfileMenuItem
            icon="material-symbols:accessible-forward-rounded"
            to={paths.settings}
            onClick={handleClose}
          >
            Accessibility
          </ProfileMenuItem>

          <ProfileMenuItem
            icon="material-symbols:settings-outline-rounded"
            to={paths.settings}
            onClick={handleClose}
          >
            Preferences
          </ProfileMenuItem>

          <ProfileMenuItem
            icon={isDark ? 'material-symbols:dark-mode-outline-rounded' : 'material-symbols:light-mode-outline-rounded'}
            onClick={toggleDark}
          >
            Dark mode
            <Switch
              checked={isDark}
              onChange={toggleDark}
              onClick={(e) => e.stopPropagation()}
              size="small"
              sx={{ ml: 'auto', pointerEvents: 'none' }}
            />
          </ProfileMenuItem>
        </Box>

        <Divider />

        {/* ── Section 2: Account & Help ── */}
        <Box sx={{ py: 1 }}>
          <ProfileMenuItem
            icon="material-symbols:manage-accounts-outline-rounded"
            to={paths.account}
            onClick={handleClose}
          >
            Account Settings
          </ProfileMenuItem>

          <ProfileMenuItem
            icon="material-symbols:help-outline-rounded"
            to={paths.settings}
            onClick={handleClose}
          >
            Help Center
          </ProfileMenuItem>
        </Box>

        <Divider />

        {/* ── Section 3: Sign Out ── */}
        <Box sx={{ py: 1 }}>
          <ProfileMenuItem
            onClick={() => signOut({ callbackUrl: '/' })}
            icon="material-symbols:logout-rounded"
            sx={{
              '&:hover': {
                background: (theme) =>
                  `linear-gradient(90deg, ${theme.palette.error.main}18 0%, ${theme.palette.error.main}08 100%)`,
                color: 'error.main',
                [`& .${listItemIconClasses.root}`]: { color: 'error.main' },
              },
            }}
          >
            Sign Out
          </ProfileMenuItem>
        </Box>
      </Menu>
    </>
  );
};

export default ProfileMenu;
