'use client';
import { Box, Typography, TextField, Button, Paper, Stack } from '@mui/material';

const WpQuickDraft = () => {
  return (
    <Paper sx={{ 
      borderRadius: 0, 
      border: '1px solid #c3c4c7', 
      bgcolor: '#fff',
      boxShadow: 'none',
      overflow: 'hidden'
    }}>
      <Box sx={{ 
        p: 1.5, 
        borderBottom: '1px solid #f0f0f1', 
        bgcolor: '#fff'
      }}>
        <Typography sx={{ fontSize: '14px', fontWeight: 600, color: '#1d2327' }}>Quick Draft</Typography>
      </Box>
      <Box sx={{ p: 2 }}>
        <Stack spacing={1.5}>
          <TextField 
            fullWidth 
            placeholder="Title" 
            size="small"
            sx={{ 
              '& .MuiInputBase-root': { fontSize: '13px', bgcolor: '#f0f0f1', borderRadius: '2px' },
              '& .MuiOutlinedInput-notchedOutline': { borderColor: '#8c8f94' }
            }}
          />
          <TextField 
            fullWidth 
            multiline 
            rows={3} 
            placeholder="What's on your mind?" 
            size="small"
            sx={{ 
              '& .MuiInputBase-root': { fontSize: '13px', bgcolor: '#f0f0f1', borderRadius: '2px' },
              '& .MuiOutlinedInput-notchedOutline': { borderColor: '#8c8f94' }
            }}
          />
          <Button 
            variant="contained" 
            sx={{ 
              alignSelf: 'flex-start', 
              bgcolor: '#2271b1', 
              textTransform: 'none', 
              fontSize: '13px',
              fontWeight: 400,
              borderRadius: '2px',
              '&:hover': { bgcolor: '#135e96' }
            }}
          >
            Save Draft
          </Button>
        </Stack>
      </Box>
    </Paper>
  );
};

export default WpQuickDraft;
