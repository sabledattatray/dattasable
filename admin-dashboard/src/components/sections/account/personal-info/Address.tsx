'use client';
import { useState } from 'react';
import {
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { countries } from 'data/countries';
import { useAccounts } from 'providers/AccountsProvider';
import { useBreakpoints } from 'providers/BreakpointsProvider';
import IconifyIcon from 'components/base/IconifyIcon';
import CountrySelect from 'components/common/CountrySelect';
import AccountDialog from '../common/AccountDialog';
import InfoCard from '../common/InfoCard';
import InfoCardAttribute from '../common/InfoCardAttribute';

type AddressDraft = {
  country: string;
  state: string;
  city: string;
  street: string;
  zip: string;
};

const Address = () => {
  const [open, setOpen] = useState(false);
  const { personalInfo, updatePersonalInfo } = useAccounts();
  const { up } = useBreakpoints();
  const upSm = up('sm');

  const [draft, setDraft] = useState<AddressDraft>({
    country: '',
    state: '',
    city: '',
    street: '',
    zip: '',
  });

  const handleOpen = () => {
    setDraft({
      country: personalInfo.country,
      state: personalInfo.state,
      city: personalInfo.city,
      street: personalInfo.street,
      zip: personalInfo.zip,
    });
    setOpen(true);
  };

  const handleDiscard = () => setOpen(false);

  const handleConfirm = () => {
    updatePersonalInfo({
      country: draft.country,
      state: draft.state.trim(),
      city: draft.city.trim(),
      street: draft.street.trim(),
      zip: draft.zip.trim(),
    });
    setOpen(false);
  };

  return (
    <>
      <InfoCard setOpen={handleOpen} sx={{ mb: 3 }}>
        <Stack direction="column" spacing={{ xs: 2, sm: 1 }}>
          <InfoCardAttribute label="Country" value={personalInfo.country} />
          <InfoCardAttribute label="State" value={personalInfo.state} />
          <InfoCardAttribute label="City" value={personalInfo.city} />
          <InfoCardAttribute label="Street" value={personalInfo.street} />
          <InfoCardAttribute label="ZIP" value={personalInfo.zip} />
        </Stack>
        <IconifyIcon
          icon="material-symbols-light:edit-outline"
          sx={{ fontSize: 20, color: 'neutral.dark', visibility: 'hidden' }}
        />
      </InfoCard>

      <AccountDialog
        title="Address"
        subtitle="Enter your updated address to ensure we have your most recent and accurate location information."
        open={open}
        handleConfirm={handleConfirm}
        handleDialogClose={handleDiscard}
        handleDiscard={handleDiscard}
        sx={{ maxWidth: 463 }}
      >
        <Stack direction="column" spacing={1} sx={{ p: 0.125 }}>
          <CountrySelect
            sx={{ mb: 1 }}
            fullWidth
            value={countries.find((c) => c.label === draft.country) ?? null}
            onChange={(_e, val) => setDraft((d) => ({ ...d, country: val?.label ?? d.country }))}
            renderInput={(params) => <TextField label="Country" {...params} />}
          />
          <TextField
            label="State"
            placeholder="State"
            value={draft.state}
            onChange={(e) => setDraft((d) => ({ ...d, state: e.target.value }))}
            fullWidth
          />
          <TextField
            label="City"
            placeholder="City"
            value={draft.city}
            onChange={(e) => setDraft((d) => ({ ...d, city: e.target.value }))}
            fullWidth
          />
          <TextField
            label="Street"
            placeholder="Street"
            value={draft.street}
            onChange={(e) => setDraft((d) => ({ ...d, street: e.target.value }))}
            fullWidth
          />
          <TextField
            label="ZIP"
            placeholder="ZIP"
            value={draft.zip}
            onChange={(e) => setDraft((d) => ({ ...d, zip: e.target.value }))}
            fullWidth
          />
        </Stack>
      </AccountDialog>

      <FormControl sx={{ gap: 2 }}>
        <Typography variant="subtitle2" sx={{ fontWeight: 400 }}>
          Who can see your address?
        </Typography>
        <RadioGroup
          row={upSm}
          defaultValue="followers_only"
          aria-labelledby="address-visibility-radio-buttons"
        >
          <FormControlLabel value="only_me" control={<Radio />} label="Only me" />
          <FormControlLabel value="followers_only" control={<Radio />} label="Followers only" />
          <FormControlLabel value="everyone" control={<Radio />} label="Everyone" />
        </RadioGroup>
      </FormControl>
    </>
  );
};

export default Address;
