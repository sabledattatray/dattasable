'use client';
import { useEffect, useState } from 'react';
import { Link, SvgIcon, SvgIconProps, Typography, typographyClasses } from '@mui/material';
import { rootPaths } from 'routes/paths';

interface LogoProps extends SvgIconProps {
  showName?: boolean;
}

const Logo = ({ sx, viewBox = '0 0 26 40', showName = true, ...rest }: LogoProps) => {
  const [id, setId] = useState('logo');

  useEffect(() => {
    setId(`logo-${Math.floor(Math.random() * 1000) + 1}`);
  }, []);

  return (
    <Link
      href={rootPaths.root}
      underline="none"
      sx={{
        display: 'flex',
        alignItems: 'center',
        '&:hover': {
          [`& .${typographyClasses.root}`]: {
            backgroundPosition: ({ direction }) => (direction === 'rtl' ? 'right' : 'left'),
          },
        },
      }}
    >
      <SvgIcon
        viewBox="-2 -2 28 28"
        sx={{
          height: 32,
          width: 32,
          color: 'text.primary',
          ...sx,
        }}
        {...rest}
      >
        <path
          d="M3 4h1v14l5.58-9.67l6.01 3.47l3.62-6.26l.86.5l-4.11 7.13L9.95 9.7L4 20h16v1H3z"
          fill="currentColor"
        />
      </SvgIcon>
      {showName && (
        <Typography
          sx={{
            color: 'text.primary',
            fontWeight: 600,
            fontSize: 18,
            lineHeight: 1,
            margin: 1,
            marginLeft: 1,
            letterSpacing: '-0.5px',
            fontFamily: "'Syne', sans-serif",
            transition: 'color .3s ease',
          }}
        >
          Datta Sable
        </Typography>
      )}
    </Link>
  );
};

export default Logo;
