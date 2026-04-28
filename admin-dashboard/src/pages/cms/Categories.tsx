'use client';
import { useState } from 'react';
import {
  Button,
  IconButton,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Tooltip,
} from '@mui/material';
import paths from 'routes/paths';
import IconifyIcon from 'components/base/IconifyIcon';
import PageHeader from 'components/sections/user-table/PageHeader';

const initialCategories = [
  { id: '1', name: 'Business Intelligence', count: 12 },
  { id: '2', name: 'Tableau', count: 8 },
  { id: '3', name: 'Power BI', count: 5 },
  { id: '4', name: 'SQL', count: 15 },
  { id: '5', name: 'Python', count: 7 },
];

const Categories = () => {
  const [categories, setCategories] = useState(initialCategories);
  const [open, setOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<{ id: string; name: string } | null>(null);
  const [categoryName, setCategoryName] = useState('');

  const handleOpen = (category?: typeof initialCategories[0]) => {
    if (category) {
      setEditingCategory({ id: category.id, name: category.name });
      setCategoryName(category.name);
    } else {
      setEditingCategory(null);
      setCategoryName('');
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setCategoryName('');
    setEditingCategory(null);
  };

  const handleSave = () => {
    if (!categoryName) return;

    if (editingCategory) {
      setCategories(categories.map(cat => cat.id === editingCategory.id ? { ...cat, name: categoryName } : cat));
    } else {
      setCategories([...categories, { id: Math.random().toString(), name: categoryName, count: 0 }]);
    }
    handleClose();
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this category?')) {
      setCategories(categories.filter((cat) => cat.id !== id));
    }
  };

  return (
    <Stack direction="column" spacing={3} sx={{ height: 1 }}>
      <PageHeader
        title="Categories"
        breadcrumb={[
          { label: 'Home', url: paths.root },
          { label: 'CMS', url: '#' },
          { label: 'Categories', active: true },
        ]}
        actionComponent={
          <Button
            variant="contained"
            color="primary"
            startIcon={<IconifyIcon icon="material-symbols:add-rounded" />}
            onClick={() => handleOpen()}
          >
            Add Category
          </Button>
        }
      />

      <TableContainer component={Paper} sx={{ borderRadius: 3, boxShadow: 'none', border: '1px solid', borderColor: 'divider' }}>
        <Table>
          <TableHead>
            <TableRow sx={{ bgcolor: 'background.neutral' }}>
              <TableCell sx={{ fontWeight: 'bold' }}>Category Name</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Post Count</TableCell>
              <TableCell align="right" sx={{ fontWeight: 'bold' }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {categories.map((category) => (
              <TableRow key={category.id} hover>
                <TableCell>
                  <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                    {category.name}
                  </Typography>
                </TableCell>
                <TableCell>{category.count} posts</TableCell>
                <TableCell align="right">
                  <Stack direction="row" spacing={1} sx={{ justifyContent: 'flex-end' }}>
                    <Tooltip title="Edit">
                      <IconButton color="primary" onClick={() => handleOpen(category)} size="small">
                        <IconifyIcon icon="material-symbols:edit-outline-rounded" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete">
                      <IconButton color="error" onClick={() => handleDelete(category.id)} size="small">
                        <IconifyIcon icon="material-symbols:delete-outline-rounded" />
                      </IconButton>
                    </Tooltip>
                  </Stack>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="xs">
        <DialogTitle>{editingCategory ? 'Edit Category' : 'Add New Category'}</DialogTitle>
        <DialogContent sx={{ pt: 1 }}>
          <TextField
            autoFocus
            label="Category Name"
            fullWidth
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
            sx={{ mt: 1 }}
          />
        </DialogContent>
        <DialogActions sx={{ p: 2, pt: 0 }}>
          <Button onClick={handleClose} color="neutral">Cancel</Button>
          <Button onClick={handleSave} variant="contained" color="primary">
            {editingCategory ? 'Update' : 'Add'}
          </Button>
        </DialogActions>
      </Dialog>
    </Stack>
  );
};

export default Categories;
