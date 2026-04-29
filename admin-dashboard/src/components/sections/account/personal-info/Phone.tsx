'use client';
import { useState } from 'react';
import { Link, Stack, Typography } from '@mui/material';
import { useAccounts } from 'providers/AccountsProvider';
import IconifyIcon from 'components/base/IconifyIcon';
import PhoneTextfield from 'components/base/PhoneTextfield';
import AccountDialog from '../common/AccountDialog';
import InfoCard from '../common/InfoCard';
import InfoCardAttribute from '../common/InfoCardAttribute';

/** Parse "+91 8010803756" → { code: "91", number: "8010803756" } */
const parsePhone = (raw: string) => {
  // Try "+CC NNNN" format
  const m1 = raw.match(/^\+(\d+)\s+([\d\s]+)$/);
  if (m1) return { code: m1[1], number: m1[2].replace(/\s/g, '') };
  // Try "(+CC)NNNN" format (legacy)
  const m2 = raw.match(/^\(\+(\d+)\)([\d]+)$/);
  if (m2) return { code: m2[1], number: m2[2] };
  return { code: '91', number: raw.replace(/\D/g, '') };
};

const Phone = () => {
  const [open, setOpen] = useState(false);
  const { personalInfo, updatePersonalInfo } = useAccounts();
  const [draftPhone, setDraftPhone] = useState('');

  const parsed = parsePhone(personalInfo.phoneNumber);

  const handleOpen = () => {
    setDraftPhone(personalInfo.phoneNumber);
    setOpen(true);
  };

  const handleDiscard = () => setOpen(false);

  const handleConfirm = () => {
    if (draftPhone) updatePersonalInfo({ phoneNumber: draftPhone });
    setOpen(false);
  };

  return (
    <>
      <InfoCard setOpen={handleOpen} sx={{ mb: 2 }}>
        <Stack direction="column" spacing={{ xs: 2, sm: 1 }}>
          <InfoCardAttribute label="Number" value={personalInfo.phoneNumber} />
        </Stack>
        <IconifyIcon
          icon="material-symbols-light:edit-outline"
          sx={{ fontSize: 20, color: 'neutral.dark', visibility: 'hidden' }}
        />
      </InfoCard>

      <AccountDialog
        title="Phone"
        subtitle="Ensure your phone number to enable account recovery and receive important notifications."
        open={open}
        handleConfirm={handleConfirm}
        handleDialogClose={handleDiscard}
        handleDiscard={handleDiscard}
        sx={{ maxWidth: 463 }}
      >
        <PhoneTextfield
          defaultValue={{ code: parsed.code, number: parsed.number }}
          onChange={(value) => setDraftPhone(value)}
        />
      </AccountDialog>

      <Stack direction="column" spacing={1} sx={{ alignItems: 'flex-start' }}>
        <Typography variant="body2" sx={{ color: 'text.secondary', textWrap: 'pretty' }}>
          This phone number has to be confirmed to ensure its authenticity first before being
          connected with your profile.
        </Typography>
        <Link
          href="/account"
          sx={{ display: 'flex', alignItems: 'center', fontSize: 'body2.fontSize' }}
        >
          Confirm your number{' '}
          <IconifyIcon icon="material-symbols:chevron-right" sx={{ fontSize: 20 }} />
        </Link>
      </Stack>
    </>
  );
};

export default Phone;
