'use client';
import { Box, Divider, Link, Stack, Typography } from '@mui/material';
import dayjs from 'dayjs';

const Footer = () => {
  return (
    <>
      <Divider />
      <Stack
        component="footer"
        direction={{ xs: 'column', sm: 'row' }}
        sx={[
          {
            columnGap: 2,
            rowGap: 0.5,
            bgcolor: 'background.default',
            justifyContent: { xs: 'center', sm: 'space-between' },
            alignItems: 'center',
            height: { xs: 72, sm: 56 },
            py: 1,
            px: { xs: 3, md: 5 },
            textAlign: { xs: 'center', sm: 'left' },
          },
        ]}
      >
        <Typography
          variant="caption"
          component="p"
          sx={{
            lineHeight: 1.6,
            fontWeight: 'light',
            color: 'text.secondary',
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
          }}
        >
          <Box component="span" sx={{ whiteSpace: 'nowrap' }}>
            Thank you for creating with
            <Box component="strong" sx={{ mx: 0.5 }}>
              Datta Sable{' '}
            </Box>
          </Box>

          <Box component="span" sx={{ whiteSpace: 'nowrap' }}>
            <Box component="span" sx={{ display: { xs: 'none', sm: 'inline' }  }}>
              |
            </Box>{' '}
            {dayjs().year()} ©
            <Link
              href="#!"
              target="_blank"
              sx={{ textDecoration: 'none', mx: 0.5 }}
            >
              Datta Sable
            </Link>
          </Box>
        </Typography>

        <Typography
          variant="caption"
          component="p"
          sx={{
            fontWeight: 'light',
            color: 'text.secondary',
          }}
        >
          v{({ MODE: process.env.NODE_ENV, VITE_BASENAME: "/admin", VITE_APP_VERSION: "1.0.0", VITE_ASSET_BASE_URL: "" } as any).VITE_APP_VERSION}
        </Typography>
      </Stack>
    </>
  );
};

export default Footer;
