'use client';
import { useState } from 'react';
import { Stack, TextField, Typography } from '@mui/material';
import { useAccounts } from 'providers/AccountsProvider';
import IconifyIcon from 'components/base/IconifyIcon';
import AccountDialog from '../common/AccountDialog';
import InfoCard from '../common/InfoCard';
import InfoCardAttribute from '../common/InfoCardAttribute';

const Email = () => {
  const [open, setOpen] = useState(false);
  const { personalInfo, updatePersonalInfo } = useAccounts();
  const [draft, setDraft] = useState({ primaryEmail: '', secondaryEmail: '' });

  const handleOpen = () => {
    setDraft({
      primaryEmail: personalInfo.primaryEmail,
      secondaryEmail: personalInfo.secondaryEmail,
    });
    setOpen(true);
  };

  const handleDiscard = () => setOpen(false);

  const handleConfirm = () => {
    updatePersonalInfo({
      primaryEmail: draft.primaryEmail.trim(),
      secondaryEmail: draft.secondaryEmail.trim(),
    });
    setOpen(false);
  };

  return (
    <>
      <InfoCard setOpen={handleOpen} sx={{ mb: 2 }}>
        <Stack direction="column" spacing={{ xs: 2, sm: 1 }}>
          <InfoCardAttribute label="Primary Email" value={personalInfo.primaryEmail} />
          <InfoCardAttribute label="Secondary Email" value={personalInfo.secondaryEmail} />
        </Stack>
        <IconifyIcon
          icon="material-symbols-light:edit-outline"
          sx={{ fontSize: 20, color: 'neutral.dark', visibility: 'hidden' }}
        />
      </InfoCard>

      <AccountDialog
        title="Email Address"
        subtitle="Update your primary email address. You can also set an alternate email address for extra security and backup."
        open={open}
        handleConfirm={handleConfirm}
        handleDialogClose={handleDiscard}
        handleDiscard={handleDiscard}
        sx={{ maxWidth: 463 }}
      >
        <Stack direction="column" spacing={1} sx={{ p: 0.125 }}>
          <TextField
            label="Primary Email"
            placeholder="Primary Email"
            type="email"
            value={draft.primaryEmail}
            onChange={(e) => setDraft((d) => ({ ...d, primaryEmail: e.target.value }))}
            fullWidth
          />
          <TextField
            label="Secondary Email"
            placeholder="Secondary Email"
            type="email"
            value={draft.secondaryEmail}
            onChange={(e) => setDraft((d) => ({ ...d, secondaryEmail: e.target.value }))}
            fullWidth
          />
        </Stack>
      </AccountDialog>

      <Stack spacing={1} sx={{ color: 'info.main' }}>
        <IconifyIcon icon="material-symbols:info" sx={{ fontSize: 24 }} />
        <Typography variant="body2">
          Your alternate email will be used to gain access to your account if you ever have issues
          with logging in with your primary email.
        </Typography>
      </Stack>
    </>
  );
};

export default Email;
