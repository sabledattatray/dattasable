'use client';
import React, { useState } from 'react';
import { useLocation, Link as RouterLink } from 'react-router';
import { useSession } from 'next-auth/react';
import { Box, Typography, Stack, Avatar, Button, IconButton, Tooltip } from '@mui/material';
import IconifyIcon from 'components/base/IconifyIcon';
import { useSettingsContext } from 'providers/SettingsProvider';
import sitemap from 'routes/sitemap';
import paths, { rootPaths } from 'routes/paths';

const ClassicWpLayout = ({ children }: { children: React.ReactNode }) => {
  const { setConfig } = useSettingsContext();
  const location = useLocation();
  const pathname = location.pathname;
  const { data: session } = useSession();
  const [collapsed, setCollapsed] = useState(false);

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
    <Box className="wp-admin" sx={{ 
      display: 'flex', 
      flexDirection: 'column', 
      minHeight: '100vh', 
      bgcolor: '#f0f0f1',
      color: '#3c434a',
      fontFamily: '"Inter", sans-serif'
    }}>
      {/* WordPress Top Admin Bar */}
      <Box sx={{ 
        height: 32, 
        bgcolor: '#1e1e1e', 
        position: 'fixed', 
        top: 0, 
        width: '100%', 
        zIndex: 10000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        px: 2
      }}>
        <Stack direction="row" spacing={3} sx={{ alignItems: 'center' }}>
          <Stack direction="row" spacing={1} sx={{ display: 'flex', alignItems: 'center' }}>
            <Button 
              size="small" 
              component="a"
              href="/"
              target="_blank"
              startIcon={<IconifyIcon icon="material-symbols:home-outline" fontSize={16} />}
              sx={{ color: '#d9d9d9', textTransform: 'none', fontSize: '13px', fontWeight: 400, '&:hover': { color: '#72aee6' } }}
            >
              My Site
            </Button>
            <Button 
              size="small" 
              startIcon={<IconifyIcon icon="material-symbols:add" fontSize={16} />}
              sx={{ color: '#d9d9d9', textTransform: 'none', fontSize: '13px', fontWeight: 400, '&:hover': { color: '#72aee6' } }}
            >
              New
            </Button>
            <Button 
              size="small" 
              component={RouterLink}
              to={paths.interactions.messages}
              startIcon={<IconifyIcon icon="material-symbols:chat-bubble-outline-rounded" fontSize={16} />}
              sx={{ color: '#d9d9d9', textTransform: 'none', fontSize: '13px', fontWeight: 400, '&:hover': { color: '#72aee6' } }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                Messages
                <Box sx={{ 
                  ml: 1, 
                  bgcolor: '#dcdcde', 
                  color: '#1d2327', 
                  px: 0.8, 
                  borderRadius: '10px', 
                  fontSize: '11px', 
                  fontWeight: 700 
                }}>
                  5
                </Box>
              </Box>
            </Button>
            <Button 
              size="small" 
              onClick={handleClearCache}
              startIcon={<IconifyIcon icon="material-symbols:mop-outline-rounded" fontSize={16} />}
              sx={{ color: '#d9d9d9', textTransform: 'none', fontSize: '13px', fontWeight: 400, '&:hover': { color: '#ef4444' } }}
            >
              Clear Cache
            </Button>
          </Stack>
        </Stack>

        <Stack direction="row" spacing={2} sx={{ alignItems: 'center' }}>
          <Tooltip title="Switch to Modern Layout">
            <IconButton 
              size="small" 
              onClick={() => setConfig({ layout: 'default' })}
              sx={{ color: '#d9d9d9', '&:hover': { color: '#72aee6' } }}
            >
              <IconifyIcon icon="material-symbols:grid-view-outline-rounded" fontSize={18} />
            </IconButton>
          </Tooltip>
          <Typography variant="caption" sx={{ color: '#d9d9d9', fontSize: '13px' }}>
            Welcome, {session?.user?.name || 'Admin'}
          </Typography>
          <Avatar 
            src={session?.user?.image || ''} 
            sx={{ width: 20, height: 20, borderRadius: '2px' }} 
          />
        </Stack>
      </Box>

      <Box sx={{ display: 'flex', flex: 1, mt: '32px' }}>
        {/* WordPress Side Navigation */}
        <Box sx={{ 
          width: collapsed ? 36 : 160, 
          bgcolor: '#23282d', 
          height: 'calc(100vh - 32px)',
          position: 'fixed',
          left: 0,
          zIndex: 9999,
          transition: 'width 0.2s',
          display: { xs: 'none', md: 'flex' },
          flexDirection: 'column',
          pt: 1,
          overflowY: 'auto',
          overflowX: 'hidden'
        }}>
          <Stack direction="column" spacing={0} sx={{ width: '100%' }}>
            {sitemap.map((section) => (
              <React.Fragment key={section.id}>
                {section.subheader && !collapsed && (
                  <Typography sx={{ 
                    px: 2, 
                    py: 1.5, 
                    fontSize: '11px', 
                    fontWeight: 700, 
                    color: '#646970', 
                    textTransform: 'uppercase', 
                    letterSpacing: '0.05em',
                    mt: 1
                  }}>
                    {section.subheader}
                  </Typography>
                )}
                {section.items.map((item) => {
                  const isActive = pathname === item.path || (item.path !== rootPaths.root && pathname?.startsWith(item.path || ''));
                  return (
                    <Box 
                      key={item.name}
                      component={RouterLink}
                      to={item.path || '#'}
                      sx={{ 
                        display: 'flex',
                        alignItems: 'center',
                        px: 1.5,
                        py: 1,
                        width: '100%',
                        cursor: 'pointer',
                        color: isActive ? '#fff' : '#f0f0f1',
                        bgcolor: isActive ? '#2271b1' : 'transparent',
                        borderLeft: isActive ? '4px solid #72aee6' : '4px solid transparent',
                        textDecoration: 'none',
                        '&:hover': {
                          bgcolor: isActive ? '#2271b1' : '#2c3338',
                          color: '#72aee6'
                        }
                      }}
                    >
                      <IconifyIcon icon={item.icon || ''} fontSize={20} sx={{ mr: collapsed ? 0 : 1.5 }} />
                      {!collapsed && (
                        <Typography sx={{ fontSize: '14px', fontWeight: isActive ? 600 : 400 }}>
                          {item.name}
                        </Typography>
                      )}
                    </Box>
                  );
                })}
              </React.Fragment>
            ))}

            {/* Platform Views Section */}
            {!collapsed && (
              <Typography sx={{ 
                px: 2, 
                py: 1.5, 
                fontSize: '11px', 
                fontWeight: 700, 
                color: '#646970', 
                textTransform: 'uppercase', 
                letterSpacing: '0.05em',
                mt: 1
              }}>
                Platform Views
              </Typography>
            )}

            <Box 
              onClick={() => setConfig({ layout: 'default' })}
              sx={{ 
                display: 'flex',
                alignItems: 'center',
                px: 1.5,
                py: 1,
                width: '100%',
                cursor: 'pointer',
                color: '#f0f0f1',
                textDecoration: 'none',
                '&:hover': { bgcolor: '#2c3338', color: '#72aee6' }
              }}
            >
              <IconifyIcon icon="material-symbols:grid-view-outline-rounded" fontSize={20} sx={{ mr: collapsed ? 0 : 1.5 }} />
              {!collapsed && (
                <Typography sx={{ fontSize: '14px' }}>Modern View</Typography>
              )}
            </Box>

            <Box 
              component="a"
              href="/live-dashboard"
              sx={{ 
                display: 'flex',
                alignItems: 'center',
                px: 1.5,
                py: 1,
                width: '100%',
                cursor: 'pointer',
                color: '#f0f0f1',
                textDecoration: 'none',
                '&:hover': { bgcolor: '#2c3338', color: '#72aee6' }
              }}
            >
              <IconifyIcon icon="material-symbols:monitor-heart-outline" fontSize={20} sx={{ mr: collapsed ? 0 : 1.5 }} />
              {!collapsed && (
                <Typography sx={{ fontSize: '14px' }}>Live Dashboard</Typography>
              )}
            </Box>
          </Stack>

          <Box sx={{ mt: 'auto', p: 0.5, borderTop: '1px solid #1e1e1e' }}>
            <Tooltip title={collapsed ? "Expand menu" : ""} placement="right">
              <IconButton 
                onClick={() => setCollapsed(!collapsed)}
                sx={{ 
                  color: '#f0f0f1', 
                  width: '100%', 
                  borderRadius: 0,
                  justifyContent: collapsed ? 'center' : 'flex-start',
                  px: collapsed ? 0 : 1.5,
                  '&:hover': { color: '#72aee6' }
                }}
              >
                <IconifyIcon 
                  icon={collapsed ? "material-symbols:arrow-forward-ios-rounded" : "material-symbols:arrow-back-ios-new-rounded"} 
                  fontSize={16} 
                />
                {!collapsed && (
                  <Typography sx={{ fontSize: '13px', ml: 1.5, textTransform: 'none' }}>
                    Collapse menu
                  </Typography>
                )}
              </IconButton>
            </Tooltip>
          </Box>
        </Box>

        {/* Main Content Area */}
        <Box sx={{ 
          flex: 1, 
          ml: { md: collapsed ? '36px' : '160px' }, 
          p: 2.5,
          transition: 'margin-left 0.2s'
        }}>
          {children}
        </Box>
      </Box>
    </Box>
  );
};

export default ClassicWpLayout;
