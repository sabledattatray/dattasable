'use client';
import { Box, Typography } from '@mui/material';
import { AccountTab } from 'types/accounts';
import PersonalInfoTabPanel from 'components/sections/account/personal-info/PersonalInfoTabPanel';
import IconifyIcon from 'components/base/IconifyIcon';

/** Generic placeholder shown when a tab has no real content yet */
const ComingSoonPanel = ({ title, icon }: { title: string; icon: string }) => (
  <Box
    sx={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      py: 10,
      gap: 2,
      color: 'text.disabled',
    }}
  >
    <IconifyIcon icon={icon} sx={{ fontSize: 64, opacity: 0.4 }} />
    <Typography variant="h6" sx={{ opacity: 0.5 }}>
      {title}
    </Typography>
    <Typography variant="body2" sx={{ opacity: 0.35 }}>
      This section is coming soon.
    </Typography>
  </Box>
);

export const accountTabs: AccountTab[] = [
  {
    id: 1,
    label: 'Personal Information',
    title: 'Personal Info',
    value: 'personal_information',
    icon: 'material-symbols:person-outline',
    panelIcon: 'material-symbols:person-outline',
    tabPanel: <PersonalInfoTabPanel />,
  },
  {
    id: 2,
    label: 'Work & Education',
    title: 'Work & Education',
    value: 'work_education',
    icon: 'material-symbols:school-outline',
    panelIcon: 'material-symbols:school-outline',
    tabPanel: (
      <ComingSoonPanel title="Work & Education" icon="material-symbols:school-outline" />
    ),
  },
  {
    id: 3,
    label: 'Privacy & Protection',
    title: 'Privacy & Protection',
    value: 'privacy_protection',
    icon: 'material-symbols:shield-outline',
    panelIcon: 'material-symbols:shield-outline',
    tabPanel: (
      <ComingSoonPanel title="Privacy & Protection" icon="material-symbols:shield-outline" />
    ),
  },
  {
    id: 4,
    label: 'Language & Region',
    title: 'Language & Region',
    value: 'language_region',
    icon: 'material-symbols:language',
    panelIcon: 'material-symbols:language',
    tabPanel: (
      <ComingSoonPanel title="Language & Region" icon="material-symbols:language" />
    ),
  },
  {
    id: 5,
    label: 'Notification & Alerts',
    title: 'Notification & Alerts',
    value: 'notification_alerts',
    icon: 'material-symbols:notifications-outline-rounded',
    panelIcon: 'material-symbols:notifications-outline-rounded',
    tabPanel: (
      <ComingSoonPanel
        title="Notifications & Alerts"
        icon="material-symbols:notifications-outline-rounded"
      />
    ),
  },
];
