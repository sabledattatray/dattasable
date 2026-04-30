'use client';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import { useSettingsContext } from 'providers/SettingsProvider';
import Image from 'components/base/Image';

const SocialAuth = () => {
  const {
    config: { assetsDir },
  } = useSettingsContext();

  return (
    <Grid container spacing={2}>
      <Grid size={{ xs: 12, sm: 6 }}>
        <Button
          fullWidth
          variant="outlined"
          size="large"
          sx={{ 
            borderRadius: 2,
            border: '1px solid',
            borderColor: 'divider',
            color: 'text.primary',
            textTransform: 'none',
            fontWeight: 600,
            py: 1.2,
            backgroundColor: (theme) => theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.03)' : 'transparent',
            '&:hover': {
              backgroundColor: (theme) => theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.02)',
              borderColor: 'primary.main'
            }
          }}
          startIcon={<Image src={`${assetsDir}/images/logo/1.svg`} height={20} width={20} alt="Google" />}
        >
          Google
        </Button>
      </Grid>
      <Grid size={{ xs: 12, sm: 6 }}>
        <Button
          fullWidth
          variant="outlined"
          size="large"
          sx={{ 
            borderRadius: 2,
            border: '1px solid',
            borderColor: 'divider',
            color: 'text.primary',
            textTransform: 'none',
            fontWeight: 600,
            py: 1.2,
            backgroundColor: (theme) => theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.03)' : 'transparent',
            '&:hover': {
              backgroundColor: (theme) => theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.02)',
              borderColor: 'primary.main'
            }
          }}
          startIcon={<Image src={`${assetsDir}/images/logo/2.svg`} height={20} width={20} alt="Microsoft" />}
        >
          Microsoft
        </Button>
      </Grid>
    </Grid>
  );
};

export default SocialAuth;
