'use client';
import IconifyIcon from 'components/base/IconifyIcon';
import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router';
import paths from 'routes/paths';
import { 
  Box, Typography, Stack, Button, Select, MenuItem, 
  Checkbox, Table, TableBody, TableCell, TableContainer, 
  TableHead, TableRow, Paper, TextField, IconButton 
} from '@mui/material';

const WpMessages = () => {
  const [selected, setSelected] = useState<number[]>([]);

  const messagesData = [
    { id: 1, sender: 'John Doe', email: 'john@example.com', content: 'Inquiry about project services...', date: '2023/10/25' },
    { id: 2, sender: 'Jane Smith', email: 'jane@example.com', content: 'Hello, I would like to collaborate...', date: '2023/10/24' },
  ];

  const handleSelectAll = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      setSelected(messagesData.map((m) => m.id));
    } else {
      setSelected([]);
    }
  };

  const handleSelectOne = (id: number) => {
    if (selected.includes(id)) {
      setSelected(selected.filter((item) => item !== id));
    } else {
      setSelected([...selected, id]);
    }
  };

  const handleApplyAction = () => {
    if (selected.length === 0) {
      alert('Please select messages first.');
      return;
    }
    alert(`Bulk action applied to ${selected.length} messages.`);
  };

  return (
    <Box sx={{ p: 2, bgcolor: '#f0f0f1', minHeight: '100%' }}>
      {/* Page Header */}
      <Stack direction="row" spacing={2} sx={{ mb: 2, alignItems: 'center' }}>
        <Typography variant="h5" sx={{ fontSize: '23px', fontWeight: 400, color: '#1d2327' }}>
          Messages
        </Typography>
        <Button 
          variant="outlined" 
          size="small" 
          component={RouterLink}
          to={paths.cms.addPost} // Placeholder
          sx={{ 
            height: 30, 
            color: '#2271b1', 
            borderColor: '#2271b1', 
            textTransform: 'none', 
            fontSize: '13px', 
            bgcolor: '#fff',
            '&:hover': { bgcolor: '#f6f7f7', borderColor: '#72aee6' }
          }}
        >
          Add New
        </Button>
      </Stack>

      {/* Controls Row */}
      <Stack direction="row" sx={{ mb: 1, justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 1 }}>
        <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
          <Select 
            size="small" 
            defaultValue="-1"
            sx={{ fontSize: '13px', height: 30, bgcolor: '#fff', borderRadius: '3px', '& .MuiSelect-select': { py: 0 } }}
          >
            <MenuItem value="-1">Bulk actions</MenuItem>
            <MenuItem value="delete">Delete Permanently</MenuItem>
            <MenuItem value="trash">Move to Trash</MenuItem>
          </Select>
          <Button 
            variant="outlined" 
            size="small" 
            onClick={handleApplyAction}
            sx={{ height: 30, color: '#2271b1', borderColor: '#c3c4c7', textTransform: 'none', fontSize: '13px', bgcolor: '#fff' }}
          >
            Apply
          </Button>
        </Stack>

        <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
          <TextField 
            size="small" 
            placeholder="Search messages" 
            sx={{ bgcolor: '#fff', '& .MuiInputBase-root': { height: 30, fontSize: '13px' } }} 
          />
          <Button 
            variant="outlined" 
            size="small" 
            sx={{ height: 30, color: '#2271b1', borderColor: '#c3c4c7', textTransform: 'none', fontSize: '13px', bgcolor: '#fff' }}
          >
            Search
          </Button>
        </Stack>
      </Stack>

      <TableContainer component={Paper} sx={{ borderRadius: 0, border: '1px solid #c3c4c7', boxShadow: 'none' }}>
        <Table size="small">
          <TableHead sx={{ bgcolor: '#fff' }}>
            <TableRow>
              <TableCell padding="checkbox">
                <Checkbox 
                  size="small" 
                  checked={selected.length === messagesData.length}
                  onChange={handleSelectAll}
                  sx={{ color: '#8c8f94' }} 
                />
              </TableCell>
              <TableCell sx={{ fontSize: '14px', fontWeight: 600, color: '#1d2327' }}>Sender</TableCell>
              <TableCell sx={{ fontSize: '14px', fontWeight: 600, color: '#1d2327' }}>Message Snippet</TableCell>
              <TableCell sx={{ fontSize: '14px', fontWeight: 600, color: '#1d2327' }}>Date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {messagesData.map((message) => (
              <TableRow key={message.id} sx={{ '&:hover': { bgcolor: '#f6f7f7' } }}>
                <TableCell padding="checkbox">
                  <Checkbox 
                    size="small" 
                    checked={selected.includes(message.id)}
                    onChange={() => handleSelectOne(message.id)}
                    sx={{ color: '#8c8f94' }} 
                  />
                </TableCell>
                <TableCell sx={{ py: 1.5 }}>
                  <Typography sx={{ fontSize: '14px', fontWeight: 600, color: '#2271b1' }}>{message.sender}</Typography>
                  <Typography sx={{ fontSize: '12px', color: '#646970' }}>{message.email}</Typography>
                </TableCell>
                <TableCell sx={{ py: 1.5 }}>
                  <Typography sx={{ fontSize: '13px', color: '#1d2327' }}>{message.content}</Typography>
                </TableCell>
                <TableCell sx={{ py: 1.5 }}>
                  <Typography sx={{ fontSize: '13px', color: '#646970' }}>{message.date}</Typography>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default WpMessages;
