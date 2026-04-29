'use client';
import { useState } from 'react';
import { Shield, Globe, Database, Key, Loader2, Save } from 'lucide-react';
import { 
  Box, 
  Paper, 
  Typography, 
  TextField, 
  Button, 
  Grid, 
  LinearProgress,
  useTheme,
  alpha
} from '@mui/material';
import { updateAdminPassword } from '@/app/admin/settings/actions';

const Settings = () => {
  const theme = useTheme();
  const [passwords, setPasswords] = useState({ current: '', next: '', confirm: '' });
  const [msg, setMsg] = useState({ text: '', type: '' });
  const [isUpdating, setIsUpdating] = useState(false);

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsUpdating(true);
    setMsg({ text: '', type: '' });

    try {
      const result = await updateAdminPassword({
        currentPassword: passwords.current,
        newPassword: passwords.next,
        confirmPassword: passwords.confirm
      });

      if (result.error) {
        setMsg({ text: result.error, type: 'error' });
      } else {
        setMsg({ text: result.success || 'Success!', type: 'success' });
        setPasswords({ current: '', next: '', confirm: '' });
      }
    } catch (error) {
      setMsg({ text: 'An unexpected error occurred.', type: 'error' });
    } finally {
      setIsUpdating(false);
      setTimeout(() => setMsg({ text: '', type: '' }), 5000);
    }
  };

  const cardStyle = {
    p: 4,
    borderRadius: '32px',
    bgcolor: 'background.paper',
    backgroundImage: 'none',
    border: '1px solid',
    borderColor: 'divider',
    boxShadow: (theme: any) => theme.palette.mode === 'dark' ? '0 4px 24px rgba(0,0,0,0.4)' : '0 4px 24px rgba(0,0,0,0.02)',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    position: 'relative'
  };

  const labelStyle = {
    display: 'block',
    fontSize: '11px',
    fontWeight: 800,
    color: 'text.secondary',
    textTransform: 'uppercase',
    mb: 1,
    letterSpacing: '0.05em'
  };

  return (
    <Box sx={{ p: { xs: 2, md: 4, lg: 6 } }}>
      <Grid container spacing={4}>
        <Grid size={{ xs: 12, md: 6 }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4, height: '100%' }}>
            {/* General Settings */}
            <Paper sx={cardStyle} elevation={0}>
              <Typography variant="h6" sx={{ fontWeight: 800, mb: 4, display: 'flex', alignItems: 'center', gap: 1.5, fontFamily: 'Syne, sans-serif' }}>
                <Globe size={20} style={{ color: theme.palette.primary.main }} /> Portal Configuration
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                <Box>
                  <Typography sx={labelStyle}>Portal Display Name</Typography>
                  <TextField 
                    fullWidth 
                    variant="outlined" 
                    defaultValue="Datta Sable | BI Expert" 
                    size="small"
                  />
                </Box>
                <Box>
                  <Typography sx={labelStyle}>Primary Contact Email</Typography>
                  <TextField 
                    fullWidth 
                    variant="outlined" 
                    defaultValue="datta@dattasable.com" 
                    size="small"
                  />
                </Box>
                <Button 
                  variant="contained" 
                  fullWidth 
                  startIcon={<Save size={18} />}
                  sx={{ 
                    mt: 2, 
                    borderRadius: '12px', 
                    py: 1.5, 
                    fontWeight: 800,
                    bgcolor: 'text.primary',
                    color: 'background.paper',
                    '&:hover': {
                      bgcolor: 'text.secondary'
                    }
                  }}
                >
                  Update Configuration
                </Button>
              </Box>
            </Paper>

            {/* Security / Password Change */}
            <Paper sx={cardStyle} elevation={0}>
              <Typography variant="h6" sx={{ fontWeight: 800, mb: 4, display: 'flex', alignItems: 'center', gap: 1.5, fontFamily: 'Syne, sans-serif' }}>
                <Shield size={20} style={{ color: '#00C9F2' }} /> Security Protocol
              </Typography>
              
              <form onSubmit={handlePasswordChange}>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                  {msg.text && (
                    <Box sx={{ 
                      p: 2, 
                      borderRadius: '12px', 
                      fontSize: '0.85rem', 
                      fontWeight: 600, 
                      bgcolor: msg.type === 'success' ? alpha(theme.palette.success.main, 0.1) : alpha(theme.palette.error.main, 0.1),
                      color: msg.type === 'success' ? 'success.main' : 'error.main',
                      border: '1px solid',
                      borderColor: msg.type === 'success' ? alpha(theme.palette.success.main, 0.2) : alpha(theme.palette.error.main, 0.2)
                    }}>
                      {msg.text}
                    </Box>
                  )}
                  <Box>
                    <Typography sx={labelStyle}>Current Password</Typography>
                    <TextField 
                      fullWidth 
                      type="password" 
                      value={passwords.current}
                      onChange={e => setPasswords({ ...passwords, current: e.target.value })}
                      size="small"
                    />
                  </Box>
                  <Box>
                    <Typography sx={labelStyle}>New Security Key</Typography>
                    <TextField 
                      fullWidth 
                      type="password" 
                      value={passwords.next}
                      onChange={e => setPasswords({ ...passwords, next: e.target.value })}
                      required
                      slotProps={{ htmlInput: { minLength: 8 } }}
                      size="small"
                    />
                  </Box>
                  <Box>
                    <Typography sx={labelStyle}>Confirm Security Key</Typography>
                    <TextField 
                      fullWidth 
                      type="password" 
                      value={passwords.confirm}
                      onChange={e => setPasswords({ ...passwords, confirm: e.target.value })}
                      required
                      size="small"
                    />
                  </Box>
                  <Button 
                    type="submit" 
                    disabled={isUpdating}
                    variant="outlined"
                    fullWidth
                    sx={{ 
                      mt: 1,
                      py: 1.5,
                      borderRadius: '12px',
                      fontWeight: 800,
                      borderColor: 'divider',
                      color: '#00C9F2',
                      background: alpha('#00C9F2', 0.05),
                      '&:hover': {
                        background: alpha('#00C9F2', 0.1),
                        borderColor: '#00C9F2'
                      }
                    }}
                  >
                    {isUpdating ? <Loader2 className="animate-spin" size={18} style={{ marginRight: 8 }} /> : <Shield size={18} style={{ marginRight: 8 }} />}
                    {isUpdating ? 'Updating...' : 'Update Access Credentials'}
                  </Button>
                </Box>
              </form>
            </Paper>
          </Box>
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4, height: '100%' }}>
            {/* System Health */}
            <Paper sx={cardStyle} elevation={0}>
              <Typography variant="h6" sx={{ fontWeight: 800, mb: 4, display: 'flex', alignItems: 'center', gap: 1.5, fontFamily: 'Syne, sans-serif' }}>
                <Database size={20} style={{ color: theme.palette.success.main }} /> Database Integrity
              </Typography>
              <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <Box sx={{ mb: 4 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1.5 }}>
                    <Typography variant="body2" sx={{ color: 'text.secondary', fontWeight: 600 }}>Storage Allocation</Typography>
                    <Typography variant="body2" sx={{ color: 'text.primary', fontWeight: 800 }}>24.2 / 50 GB</Typography>
                  </Box>
                  <LinearProgress 
                    variant="determinate" 
                    value={48} 
                    sx={{ 
                      height: 10, 
                      borderRadius: 5,
                      bgcolor: 'action.hover',
                      '& .MuiLinearProgress-bar': {
                        bgcolor: 'success.main',
                        borderRadius: 5
                      }
                    }} 
                  />
                </Box>
                <Grid container spacing={3}>
                  <Grid size={6}>
                    <Box sx={{ p: 2.5, bgcolor: 'background.elevation2', borderRadius: '16px', textAlign: 'center', border: '1px solid', borderColor: 'divider' }}>
                      <Typography sx={{ fontSize: '1.5rem', fontWeight: 900, color: 'text.primary', fontFamily: 'Syne, sans-serif' }}>99.9%</Typography>
                      <Typography sx={{ fontSize: '10px', color: 'text.secondary', textTransform: 'uppercase', fontWeight: 800, mt: 0.5, letterSpacing: '0.05em' }}>System Uptime</Typography>
                    </Box>
                  </Grid>
                  <Grid size={6}>
                    <Box sx={{ p: 2.5, bgcolor: 'background.elevation2', borderRadius: '16px', textAlign: 'center', border: '1px solid', borderColor: 'divider' }}>
                      <Typography sx={{ fontSize: '1.5rem', fontWeight: 900, color: 'text.primary', fontFamily: 'Syne, sans-serif' }}>12ms</Typography>
                      <Typography sx={{ fontSize: '10px', color: 'text.secondary', textTransform: 'uppercase', fontWeight: 800, mt: 0.5, letterSpacing: '0.05em' }}>Sync Latency</Typography>
                    </Box>
                  </Grid>
                </Grid>
              </Box>
            </Paper>

            {/* API Credentials */}
            <Paper sx={cardStyle} elevation={0}>
              <Typography variant="h6" sx={{ fontWeight: 800, mb: 4, display: 'flex', alignItems: 'center', gap: 1.5, fontFamily: 'Syne, sans-serif' }}>
                <Key size={20} style={{ color: theme.palette.info.main }} /> API Intelligence
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                <Box>
                  <Typography sx={labelStyle}>Google Analytics ID</Typography>
                  <TextField 
                    fullWidth 
                    defaultValue="G-XXXXXXXXXX" 
                    slotProps={{ input: { readOnly: true } }}
                    size="small"
                    sx={{ 
                      '& .MuiOutlinedInput-root': {
                        bgcolor: 'background.elevation2',
                        fontFamily: 'monospace'
                      }
                    }}
                  />
                </Box>
                <Box>
                  <Typography sx={labelStyle}>LinkedIn Integration Key</Typography>
                  <TextField 
                    fullWidth 
                    type="password"
                    defaultValue="••••••••••••••••" 
                    slotProps={{ input: { readOnly: true } }}
                    size="small"
                    sx={{ 
                      '& .MuiOutlinedInput-root': {
                        bgcolor: 'background.elevation2'
                      }
                    }}
                  />
                </Box>
              </Box>
            </Paper>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Settings;
