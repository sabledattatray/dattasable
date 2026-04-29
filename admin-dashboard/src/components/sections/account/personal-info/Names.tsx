'use client';
import { useState } from 'react';
import { Stack, TextField } from '@mui/material';
import { useAccounts } from 'providers/AccountsProvider';
import IconifyIcon from 'components/base/IconifyIcon';
import AccountDialog from '../common/AccountDialog';
import InfoCard from '../common/InfoCard';
import InfoCardAttribute from '../common/InfoCardAttribute';

const Names = () => {
  const { personalInfo, updatePersonalInfo } = useAccounts();
  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState({ firstName: '', lastName: '' });

  const handleOpen = () => {
    setDraft({ firstName: personalInfo.firstName, lastName: personalInfo.lastName });
    setOpen(true);
  };

  const handleDiscard = () => setOpen(false);

  const handleConfirm = () => {
    updatePersonalInfo({ firstName: draft.firstName.trim(), lastName: draft.lastName.trim() });
    setOpen(false);
  };

  return (
    <>
      <InfoCard setOpen={handleOpen}>
        <Stack direction="column" spacing={{ xs: 2, sm: 1 }}>
          <InfoCardAttribute label="First Name" value={personalInfo.firstName} />
          <InfoCardAttribute label="Last Name" value={personalInfo.lastName} />
        </Stack>
        <IconifyIcon
          icon="material-symbols-light:edit-outline"
          sx={{ fontSize: 20, color: 'neutral.dark', visibility: 'hidden' }}
        />
      </InfoCard>

      <AccountDialog
        title="Name"
        subtitle="Enter your updated first and last name below. Your name will be reflected across all your account settings."
        open={open}
        handleConfirm={handleConfirm}
        handleDialogClose={handleDiscard}
        handleDiscard={handleDiscard}
        sx={{ maxWidth: 463 }}
      >
        <Stack direction="column" spacing={1} sx={{ p: 0.125 }}>
          <TextField
            label="First Name"
            placeholder="First Name"
            value={draft.firstName}
            onChange={(e) => setDraft((d) => ({ ...d, firstName: e.target.value }))}
            fullWidth
          />
          <TextField
            label="Last Name"
            placeholder="Last Name"
            value={draft.lastName}
            onChange={(e) => setDraft((d) => ({ ...d, lastName: e.target.value }))}
            fullWidth
          />
        </Stack>
      </AccountDialog>
    </>
  );
};

export default Names;
