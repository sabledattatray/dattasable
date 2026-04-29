'use client';
import { useState } from 'react';
import { Stack, TextField } from '@mui/material';
import { useAccounts } from 'providers/AccountsProvider';
import IconifyIcon from 'components/base/IconifyIcon';
import AccountDialog from '../common/AccountDialog';
import InfoCard from '../common/InfoCard';
import InfoCardAttribute from '../common/InfoCardAttribute';

const UserName = () => {
  const { personalInfo, updatePersonalInfo } = useAccounts();
  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState('');

  const handleOpen = () => {
    setDraft(personalInfo.userName);
    setOpen(true);
  };

  const handleDiscard = () => setOpen(false);

  const handleConfirm = () => {
    if (draft.trim()) updatePersonalInfo({ userName: draft.trim() });
    setOpen(false);
  };

  return (
    <>
      <InfoCard setOpen={handleOpen}>
        <Stack direction="column" spacing={{ xs: 2, sm: 1 }} sx={{ justifyContent: 'center' }}>
          <InfoCardAttribute label="User Name" value={personalInfo.userName} />
        </Stack>
        <IconifyIcon
          icon="material-symbols-light:edit-outline"
          sx={{ fontSize: 20, color: 'neutral.dark', visibility: 'hidden' }}
        />
      </InfoCard>

      <AccountDialog
        title="User Name"
        subtitle="Update your username. This change will apply to your account and be visible to others in your interactions."
        open={open}
        handleConfirm={handleConfirm}
        handleDialogClose={handleDiscard}
        handleDiscard={handleDiscard}
        sx={{ maxWidth: 463 }}
      >
        <Stack direction="column" spacing={1} sx={{ p: 0.125 }}>
          <TextField
            label="User Name"
            placeholder="User Name"
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            fullWidth
          />
        </Stack>
      </AccountDialog>
    </>
  );
};

export default UserName;
