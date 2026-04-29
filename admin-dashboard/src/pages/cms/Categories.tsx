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
  Snackbar,
  Alert,
} from '@mui/material';
import paths from 'routes/paths';
import IconifyIcon from 'components/base/IconifyIcon';
import PageHeader from 'components/sections/user-table/PageHeader';
import ConfirmDialog from 'components/common/ConfirmDialog';

// ── Types ─────────────────────────────────────────────────────────────────────
interface Category {
  id: string;
  name: string;
  count: number;
}

// ── Seed data (only used when localStorage is empty) ─────────────────────────
const SEED_CATEGORIES: Category[] = [
  { id: '1', name: 'Business Intelligence', count: 12 },
  { id: '2', name: 'Tableau', count: 8 },
  { id: '3', name: 'Power BI', count: 5 },
  { id: '4', name: 'SQL', count: 15 },
  { id: '5', name: 'Python', count: 7 },
];

const STORAGE_KEY = 'dattasable-cms-categories';

// ── Persistence helpers ───────────────────────────────────────────────────────
const loadCategories = (): Category[] => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) return JSON.parse(stored) as Category[];
  } catch {
    /* ignore */
  }
  return SEED_CATEGORIES;
};

const saveCategories = (cats: Category[]) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cats));
  } catch {
    /* ignore */
  }
};

// ── Component ─────────────────────────────────────────────────────────────────
const Categories = () => {
  // Lazy initializer reads from localStorage only on first render
  const [categories, setCategories] = useState<Category[]>(loadCategories);
  const [open, setOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [categoryName, setCategoryName] = useState('');
  const [snack, setSnack] = useState<{ open: boolean; message: string; severity: 'success' | 'error' }>({
    open: false,
    message: '',
    severity: 'success',
  });
  const [pendingDeleteId, setPendingDeleteId] = useState<string | null>(null);

  // ── Helpers ────────────────────────────────────────────────────────────────
  const persist = (updated: Category[]) => {
    setCategories(updated);
    saveCategories(updated);
  };

  const showSnack = (message: string, severity: 'success' | 'error' = 'success') =>
    setSnack({ open: true, message, severity });

  // ── Handlers ───────────────────────────────────────────────────────────────
  const handleOpen = (category?: Category) => {
    setEditingCategory(category ?? null);
    setCategoryName(category?.name ?? '');
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setCategoryName('');
    setEditingCategory(null);
  };

  const handleSave = () => {
    const trimmed = categoryName.trim();
    if (!trimmed) return;

    if (editingCategory) {
      const updated = categories.map((cat) =>
        cat.id === editingCategory.id ? { ...cat, name: trimmed } : cat,
      );
      persist(updated);
      showSnack(`"${trimmed}" updated successfully.`);
    } else {
      // Prevent duplicate names
      if (categories.some((c) => c.name.toLowerCase() === trimmed.toLowerCase())) {
        showSnack('A category with that name already exists.', 'error');
        return;
      }
      const newCat: Category = {
        id: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
        name: trimmed,
        count: 0,
      };
      persist([...categories, newCat]);
      showSnack(`"${trimmed}" added successfully.`);
    }
    handleClose();
  };

  const handleDelete = (id: string) => {
    setPendingDeleteId(id);
  };

  const handleDeleteConfirm = () => {
    if (!pendingDeleteId) return;
    const target = categories.find((c) => c.id === pendingDeleteId);
    if (!target) { setPendingDeleteId(null); return; }
    persist(categories.filter((cat) => cat.id !== pendingDeleteId));
    showSnack(`"${target.name}" deleted.`);
    setPendingDeleteId(null);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleSave();
  };

  // ── Render ─────────────────────────────────────────────────────────────────
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

      <TableContainer
        component={Paper}
        sx={{ borderRadius: 3, boxShadow: 'none', border: '1px solid', borderColor: 'divider' }}
      >
        <Table>
          <TableHead>
            <TableRow sx={{ bgcolor: 'background.neutral' }}>
              <TableCell sx={{ fontWeight: 600 }}>Category Name</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Post Count</TableCell>
              <TableCell align="right" sx={{ fontWeight: 600 }}>
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {categories.length === 0 ? (
              <TableRow>
                <TableCell colSpan={3} align="center" sx={{ py: 6, color: 'text.disabled' }}>
                  No categories yet — click <strong>Add Category</strong> to create one.
                </TableCell>
              </TableRow>
            ) : (
              categories.map((category) => (
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
                        <IconButton
                          color="primary"
                          onClick={() => handleOpen(category)}
                          size="small"
                        >
                          <IconifyIcon icon="material-symbols:edit-outline-rounded" />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Delete">
                        <IconButton
                          color="error"
                          onClick={() => handleDelete(category.id)}
                          size="small"
                        >
                          <IconifyIcon icon="material-symbols:delete-outline-rounded" />
                        </IconButton>
                      </Tooltip>
                    </Stack>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Add / Edit dialog */}
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="xs">
        <DialogTitle>{editingCategory ? 'Edit Category' : 'Add New Category'}</DialogTitle>
        <DialogContent sx={{ pt: 1 }}>
          <TextField
            autoFocus
            label="Category Name"
            fullWidth
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
            onKeyDown={handleKeyDown}
            sx={{ mt: 1 }}
          />
        </DialogContent>
        <DialogActions sx={{ p: 2, pt: 0 }}>
          <Button onClick={handleClose} color="neutral">
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            variant="contained"
            color="primary"
            disabled={!categoryName.trim()}
          >
            {editingCategory ? 'Update' : 'Add'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete confirmation dialog */}
      <ConfirmDialog
        open={pendingDeleteId !== null}
        title="Delete Category"
        message={`Are you sure you want to delete "${categories.find((c) => c.id === pendingDeleteId)?.name ?? ''}"? This action cannot be undone.`}
        onConfirm={handleDeleteConfirm}
        onCancel={() => setPendingDeleteId(null)}
      />

      {/* Feedback snackbar */}
      <Snackbar
        open={snack.open}
        autoHideDuration={3000}
        onClose={() => setSnack((s) => ({ ...s, open: false }))}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert severity={snack.severity} variant="filled" sx={{ width: '100%' }}>
          {snack.message}
        </Alert>
      </Snackbar>
    </Stack>
  );
};

export default Categories;
