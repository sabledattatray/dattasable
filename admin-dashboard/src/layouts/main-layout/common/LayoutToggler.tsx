'use client';
import { Button, Tooltip } from '@mui/material';
import { useSettingsContext } from 'providers/SettingsProvider';
import IconifyIcon from 'components/base/IconifyIcon';

const LayoutToggler = () => {
  const { config, setConfig } = useSettingsContext();

  const toggleLayout = () => {
    setConfig({
      layout: config.layout === 'classic-wp' ? 'default' : 'classic-wp',
    });
  };

  return (
    <Tooltip title={config.layout === 'classic-wp' ? "Switch to Modern Layout" : "Switch to WordPress Layout"}>
      <Button
        variant="soft"
        shape="circle"
        color="neutral"
        onClick={toggleLayout}
        sx={{
          color: config.layout === 'classic-wp' ? 'primary.main' : 'text.secondary',
        }}
      >
        <IconifyIcon 
          icon={config.layout === 'classic-wp' ? "fa6-brands:wordpress" : "material-symbols:grid-view-outline-rounded"} 
          sx={{ fontSize: 20 }} 
        />
      </Button>
    </Tooltip>
  );
};

export default LayoutToggler;
