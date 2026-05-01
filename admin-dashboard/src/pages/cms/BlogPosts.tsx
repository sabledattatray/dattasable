'use client';
import { useState, useEffect } from 'react';
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
  Chip,
  Tooltip,
  Snackbar,
  Alert,
} from '@mui/material';
import { useNavigate } from 'react-router';
import paths from 'routes/paths';
import IconifyIcon from 'components/base/IconifyIcon';
import PageHeader from 'components/sections/user-table/PageHeader';
import ConfirmDialog from 'components/common/ConfirmDialog';
import { posts as staticPosts } from '../../../../app/blog/data';
import WpBlogPosts from './WpBlogPosts';
import { useSettingsContext } from 'providers/SettingsProvider';

const STORAGE_KEY = 'admin_posts';

const BlogPosts = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState<any[]>([]);
  const [pendingDeleteId, setPendingDeleteId] = useState<string | null>(null);
  const [snack, setSnack] = useState<{ open: boolean; message: string; severity: 'success' | 'error' }>({
    open: false, message: '', severity: 'success',
  });

  // ── Load posts (custom + static) on mount ─────────────────────────────────
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    const customPosts: any[] = saved ? JSON.parse(saved) : [];

    // Merge: custom posts first, then any static posts not already saved
    const merged = [...customPosts];
    staticPosts.forEach((p: any) => {
      if (!merged.find((mp) => mp.slug === p.slug)) {
        merged.push({ ...p, id: p.slug, status: 'Published' });
      }
    });
    setPosts(merged);
  }, []);

  // ── Persist only the custom (non-static) posts to localStorage ────────────
  const persist = (updated: any[]) => {
    setPosts(updated);
    const customOnly = updated.filter(
      (p) => !staticPosts.find((sp: any) => sp.slug === p.id),
    );
    localStorage.setItem(STORAGE_KEY, JSON.stringify(customOnly));
  };

  const showSnack = (message: string, severity: 'success' | 'error' = 'success') =>
    setSnack({ open: true, message, severity });

  // ── Handlers ──────────────────────────────────────────────────────────────
  const handleDelete = (id: string) => setPendingDeleteId(id);

  const handleDeleteConfirm = () => {
    if (!pendingDeleteId) return;
    const target = posts.find((p) => p.id === pendingDeleteId);
    persist(posts.filter((post) => post.id !== pendingDeleteId));
    showSnack(`"${target?.title ?? 'Post'}" deleted.`);
    setPendingDeleteId(null);
  };

  const handleEdit = (id: string) => navigate(`/cms/posts/edit/${id}`);

  const { config } = useSettingsContext();

  if (config.layout === 'classic-wp') {
    return <WpBlogPosts />;
  }

  // ── Render ────────────────────────────────────────────────────────────────
  return (
    <Stack direction="column" spacing={3} sx={{ height: 1 }}>
      <PageHeader
        title="Blog Posts"
        breadcrumb={[
          { label: 'Home', url: paths.root },
          { label: 'CMS', url: '#' },
          { label: 'Blog Posts', active: true },
        ]}
        actionComponent={
          <Button
            variant="contained"
            color="primary"
            startIcon={<IconifyIcon icon="material-symbols:add-rounded" />}
            onClick={() => navigate(paths.cms.addPost)}
          >
            Add New Post
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
              <TableCell sx={{ fontWeight: 600 }}>Title</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Category</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Status</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Date</TableCell>
              <TableCell align="right" sx={{ fontWeight: 600 }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {posts.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} align="center" sx={{ py: 6, color: 'text.disabled' }}>
                  No posts yet — click <strong>Add New Post</strong> to create one.
                </TableCell>
              </TableRow>
            ) : (
              posts.map((post) => (
                <TableRow key={post.id} hover>
                  <TableCell>
                    <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                      {post.title}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      by {post.author}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Chip label={post.category} size="small" variant="soft" color="info" />
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={post.status}
                      size="small"
                      variant="soft"
                      color={post.status === 'Published' ? 'success' : 'warning'}
                    />
                  </TableCell>
                  <TableCell>{post.date}</TableCell>
                  <TableCell align="right">
                    <Stack direction="row" spacing={1} sx={{ justifyContent: 'flex-end' }}>
                      <Tooltip title="Edit">
                        <IconButton color="primary" onClick={() => handleEdit(post.id)} size="small">
                          <IconifyIcon icon="material-symbols:edit-outline-rounded" />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Delete">
                        <IconButton color="error" onClick={() => handleDelete(post.id)} size="small">
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

      {/* Delete confirmation dialog */}
      <ConfirmDialog
        open={pendingDeleteId !== null}
        title="Delete Post"
        message={`Are you sure you want to delete "${posts.find((p) => p.id === pendingDeleteId)?.title ?? 'this post'}"? This cannot be undone.`}
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

export default BlogPosts;
