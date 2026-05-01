'use client';
import React, { useState } from 'react';
import { 
  Box, Typography, Stack, TextField, Divider, 
  FormControlLabel, Checkbox, Select, MenuItem, 
  RadioGroup, Radio, Button 
} from '@mui/material';

const WpSettings = () => {
  return (
    <Box sx={{ p: 3, bgcolor: '#f0f0f1', minHeight: '100%' }}>
      <Typography variant="h5" sx={{ fontSize: '23px', fontWeight: 400, color: '#1d2327', mb: 3 }}>
        General Settings
      </Typography>

      <Box sx={{ bgcolor: '#fff', border: '1px solid #c3c4c7', p: 4, maxWidth: '800px' }}>
        <Stack spacing={4}>
          {/* Site Title */}
          <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} sx={{ alignItems: { md: 'center' } }}>
            <Typography sx={{ width: { md: '200px' }, fontSize: '14px', fontWeight: 600 }}>Site Title</Typography>
            <TextField 
              fullWidth 
              size="small" 
              defaultValue="Datta Sable | BI Expert" 
              sx={{ 
                '& .MuiInputBase-root': { height: 40, fontSize: '14px' },
                '& .MuiOutlinedInput-notchedOutline': { borderColor: '#8c8f94' }
              }} 
            />
          </Stack>

          {/* Tagline */}
          <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} sx={{ alignItems: { md: 'flex-start' } }}>
            <Typography sx={{ width: { md: '200px' }, mt: 1, fontSize: '14px', fontWeight: 600 }}>Tagline</Typography>
            <Box sx={{ flex: 1 }}>
              <TextField 
                fullWidth 
                size="small" 
                defaultValue="Just another WordPress site" 
                sx={{ 
                  '& .MuiInputBase-root': { height: 40, fontSize: '14px' },
                  '& .MuiOutlinedInput-notchedOutline': { borderColor: '#8c8f94' }
                }} 
              />
              <Typography sx={{ mt: 1, fontSize: '12px', color: '#646970' }}>In a few words, explain what this site is about.</Typography>
            </Box>
          </Stack>

          {/* WordPress Address */}
          <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} sx={{ alignItems: { md: 'center' } }}>
            <Typography sx={{ width: { md: '200px' }, fontSize: '14px', fontWeight: 600 }}>WordPress Address (URL)</Typography>
            <TextField 
              fullWidth 
              size="small" 
              defaultValue="https://dattasable.com" 
              sx={{ 
                '& .MuiInputBase-root': { height: 40, fontSize: '14px' },
                '& .MuiOutlinedInput-notchedOutline': { borderColor: '#8c8f94' }
              }} 
            />
          </Stack>

          {/* Site Address */}
          <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} sx={{ alignItems: { md: 'center' } }}>
            <Typography sx={{ width: { md: '200px' }, fontSize: '14px', fontWeight: 600 }}>Site Address (URL)</Typography>
            <TextField 
              fullWidth 
              size="small" 
              defaultValue="https://dattasable.com" 
              sx={{ 
                '& .MuiInputBase-root': { height: 40, fontSize: '14px' },
                '& .MuiOutlinedInput-notchedOutline': { borderColor: '#8c8f94' }
              }} 
            />
          </Stack>

          {/* Admin Email */}
          <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} sx={{ alignItems: { md: 'flex-start' } }}>
            <Typography sx={{ width: { md: '200px' }, mt: 1, fontSize: '14px', fontWeight: 600 }}>Administration Email Address</Typography>
            <Box sx={{ flex: 1 }}>
              <TextField 
                fullWidth 
                size="small" 
                defaultValue="admin@dattasable.com" 
                sx={{ 
                  '& .MuiInputBase-root': { height: 40, fontSize: '14px' },
                  '& .MuiOutlinedInput-notchedOutline': { borderColor: '#8c8f94' }
                }} 
              />
              <Typography sx={{ mt: 1, fontSize: '12px', color: '#646970' }}>
                This address is used for admin purposes. If you change this, we will send you an email at your new address to confirm it. <strong>The new address will not become active until confirmed.</strong>
              </Typography>
            </Box>
          </Stack>

          <Divider />

          {/* Membership */}
          <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} sx={{ alignItems: { md: 'center' } }}>
            <Typography sx={{ width: { md: '200px' }, fontSize: '14px', fontWeight: 600 }}>Membership</Typography>
            <FormControlLabel 
              control={<Checkbox size="small" sx={{ color: '#8c8f94', '&.Mui-checked': { color: '#2271b1' } }} />} 
              label={<Typography sx={{ fontSize: '14px' }}>Anyone can register</Typography>}
            />
          </Stack>

          {/* Default Role */}
          <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} sx={{ alignItems: { md: 'center' } }}>
            <Typography sx={{ width: { md: '200px' }, fontSize: '14px', fontWeight: 600 }}>New User Default Role</Typography>
            <Select 
              size="small" 
              defaultValue="subscriber"
              sx={{ 
                minWidth: 200, 
                fontSize: '14px', 
                height: 40,
                '& .MuiOutlinedInput-notchedOutline': { borderColor: '#8c8f94' }
              }}
            >
              <MenuItem value="subscriber">Subscriber</MenuItem>
              <MenuItem value="contributor">Contributor</MenuItem>
              <MenuItem value="author">Author</MenuItem>
              <MenuItem value="editor">Editor</MenuItem>
              <MenuItem value="administrator">Administrator</MenuItem>
            </Select>
          </Stack>

          <Divider />

          {/* Timezone */}
          <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} sx={{ alignItems: { md: 'flex-start' } }}>
            <Typography sx={{ width: { md: '200px' }, mt: 1, fontSize: '14px', fontWeight: 600 }}>Timezone</Typography>
            <Box sx={{ flex: 1 }}>
              <Select 
                size="small" 
                defaultValue="UTC+5.5"
                sx={{ 
                  minWidth: 300, 
                  fontSize: '14px', 
                  height: 40,
                  '& .MuiOutlinedInput-notchedOutline': { borderColor: '#8c8f94' }
                }}
              >
                <MenuItem value="UTC+0">UTC+0</MenuItem>
                <MenuItem value="UTC+5.5">UTC+5:30 (Mumbai, Kolkata)</MenuItem>
              </Select>
              <Typography sx={{ mt: 1, fontSize: '12px', color: '#646970' }}>Choose either a city in the same timezone as you or a UTC timezone offset.</Typography>
            </Box>
          </Stack>

          {/* Date Format */}
          <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} sx={{ alignItems: { md: 'flex-start' } }}>
            <Typography sx={{ width: { md: '200px' }, mt: 0.5, fontSize: '14px', fontWeight: 600 }}>Date Format</Typography>
            <RadioGroup defaultValue="F j, Y">
              <Stack spacing={1}>
                <FormControlLabel value="F j, Y" control={<Radio size="small" />} label={<Typography sx={{ fontSize: '14px' }}>October 27, 2023 <span style={{ color: '#646970', marginLeft: '8px' }}><code>F j, Y</code></span></Typography>} />
                <FormControlLabel value="Y-m-d" control={<Radio size="small" />} label={<Typography sx={{ fontSize: '14px' }}>2023-10-27 <span style={{ color: '#646970', marginLeft: '8px' }}><code>Y-m-d</code></span></Typography>} />
                <FormControlLabel value="m/d/Y" control={<Radio size="small" />} label={<Typography sx={{ fontSize: '14px' }}>10/27/2023 <span style={{ color: '#646970', marginLeft: '8px' }}><code>m/d/Y</code></span></Typography>} />
                <FormControlLabel value="custom" control={<Radio size="small" />} label={<Typography sx={{ fontSize: '14px' }}>Custom: <TextField size="small" sx={{ ml: 1, width: 100, '& .MuiInputBase-root': { height: 30, fontSize: '13px' } }} defaultValue="F j, Y" /></Typography>} />
              </Stack>
            </RadioGroup>
          </Stack>

          {/* Save Button */}
          <Stack direction="row" sx={{ mt: 4 }}>
            <Box sx={{ width: { md: '216px' } }} />
            <Button 
              variant="contained" 
              sx={{ 
                bgcolor: '#2271b1', 
                textTransform: 'none', 
                fontSize: '13px', 
                fontWeight: 600,
                px: 2,
                height: 32,
                '&:hover': { bgcolor: '#135e96' }
              }}
            >
              Save Changes
            </Button>
          </Stack>
        </Stack>
      </Box>
    </Box>
  );
};

export default WpSettings;
