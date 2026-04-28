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
} from '@mui/material';
import { useNavigate } from 'react-router';
import paths from 'routes/paths';
import IconifyIcon from 'components/base/IconifyIcon';
import PageHeader from 'components/sections/user-table/PageHeader';
import { posts as staticPosts } from '../../../../app/blog/data';

const BlogPosts = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState<any[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('admin_posts');
    if (saved) {
      const parsed = JSON.parse(saved);
      // Merge static posts with saved posts, avoiding duplicates by slug
      const merged = [...parsed];
      staticPosts.forEach((p: any) => {
        if (!merged.find((mp) => mp.slug === p.slug)) {
          merged.push({
            ...p,
            id: p.slug, // Use slug as ID for the table
            status: 'Published', // Static posts are all published
          });
        }
      });
      setPosts(merged);
    } else {
      setPosts(staticPosts.map(p => ({ ...p, id: p.slug, status: 'Published' })));
    }
  }, []);

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      const updatedPosts = posts.filter((post) => post.id !== id);
      setPosts(updatedPosts);
      // Also update localStorage
      const customPosts = updatedPosts.filter(p => !staticPosts.find(sp => sp.slug === p.id));
      localStorage.setItem('admin_posts', JSON.stringify(customPosts));
    }
  };

  const handleEdit = (id: string) => {
    navigate(`/cms/posts/edit/${id}`);
  };

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

      <TableContainer component={Paper} sx={{ borderRadius: 3, boxShadow: 'none', border: '1px solid', borderColor: 'divider' }}>
        <Table>
          <TableHead>
            <TableRow sx={{ bgcolor: 'background.neutral' }}>
              <TableCell sx={{ fontWeight: 'bold' }}>Title</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Category</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Status</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Date</TableCell>
              <TableCell align="right" sx={{ fontWeight: 'bold' }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {posts.map((post) => (
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
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Stack>
  );
};

export default BlogPosts;
