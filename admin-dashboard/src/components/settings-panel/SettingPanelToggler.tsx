'use client';
import { Button, buttonClasses, useTheme } from '@mui/material';
import { useSettingsPanelContext } from 'providers/SettingsPanelProvider';
import SettingsIcon from 'components/icons/SettingsIcon';

const SettingPanelToggler = () => {
  const { setSettingsPanelConfig } = useSettingsPanelContext();

  const theme = useTheme();
  return (
    <Button
      size="medium"
      color="neutral"
      variant="soft"
      sx={[
        {
          position: 'fixed',
          zIndex: 2000, // Higher than chatbot (999) and common drawers
          top: '50%',
          right: -47,
          border: 1,
          fontSize: 13,
          borderColor: 'divider',
          borderRadius: '8px 8px 0 0',
          borderBottomColor: 'transparent',
          transform: 'rotate(-90deg) translateX(50%)',
          textTransform: 'uppercase',
          px: 2, // Increased padding
          py: 1,
          [`& .${buttonClasses.icon}`]: {
            marginRight: 1,
          },
        },
        theme.direction === 'rtl' && {
          transform: 'rotate(90deg)  translateX(50%)',
        },
      ]}
      startIcon={
        <SettingsIcon
          sx={{
            color: 'primary.main',
            animation: `spin 5s linear infinite`,
          }}
        />
      }
      onClick={() =>
        setSettingsPanelConfig({
          openSettingPanel: true,
        })
      }
    >
      Customize
    </Button>
  );
};

export default SettingPanelToggler;
