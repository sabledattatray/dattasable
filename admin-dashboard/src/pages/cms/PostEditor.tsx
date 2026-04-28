'use client';
import { useState, useEffect } from 'react';
import {
  Button,
  Paper,
  Stack,
  TextField,
  Typography,
  MenuItem,
  Grid,
  Box,
  Divider,
  Chip,
  IconButton,
} from '@mui/material';
import { useNavigate, useParams } from 'react-router';
import paths from 'routes/paths';
import IconifyIcon from 'components/base/IconifyIcon';
import PageHeader from 'components/sections/user-table/PageHeader';
import { posts as staticPosts } from '../../../../app/blog/data';

interface Post {
  slug: string;
  title: string;
  content: string;
  category: string;
  tags?: string[];
  status?: string;
  date: string;
  excerpt: string;
  readTime: number;
  image: string;
  icon: string;
  color: string;
  author?: string;
}

const PostEditor = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [status, setStatus] = useState('Published');
  const [category, setCategory] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState('');

  const isEditing = Boolean(id);

  useEffect(() => {
    if (isEditing) {
      const saved = localStorage.getItem('admin_posts');
      let postToEdit: Post | undefined;
      
      if (saved) {
        const parsed = JSON.parse(saved);
        postToEdit = parsed.find((p: Post) => p.slug === id);
      }
      
      if (!postToEdit) {
        postToEdit = staticPosts.find((p: any) => p.slug === id);
      }

      if (postToEdit) {
        setTitle(postToEdit.title || '');
        setCategory(postToEdit.category || '');
        setStatus('Published');
        setContent(postToEdit.content || '');
        setTags(postToEdit.tags || []);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, isEditing]);

  const handleAddTag = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && tagInput.trim()) {
      if (!tags.includes(tagInput.trim())) {
        setTags([...tags, tagInput.trim()]);
      }
      setTagInput('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  const handleSave = () => {
    if (!title) {
      alert('Title is required');
      return;
    }

    const slug = title.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');
    const newPost = {
      slug,
      title,
      content,
      category,
      tags,
      status,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      excerpt: content.substring(0, 150) + '...',
      readTime: Math.ceil(content.split(' ').length / 200) || 5,
      image: '/images/blog/default.png',
      icon: '📝',
      color: 'var(--accent)'
    };

    const saved = localStorage.getItem('admin_posts');
    let allPosts: Post[] = saved ? JSON.parse(saved) : [];

    if (isEditing) {
      allPosts = allPosts.map((p: Post) => p.slug === id ? newPost : p);
      // If it wasn't in custom posts yet (editing a static post), add it
      if (!allPosts.find((p: Post) => p.slug === slug && p.slug === id)) {
         allPosts.push(newPost);
      }
    } else {
      allPosts.push(newPost);
    }

    localStorage.setItem('admin_posts', JSON.stringify(allPosts));
    alert('Post saved successfully!');
    navigate(paths.cms.posts);
  };

  return (
    <Stack direction="column" spacing={3} sx={{ height: 1 }}>
      <PageHeader
        title={isEditing ? 'Edit Post' : 'Create New Post'}
        breadcrumb={[
          { label: 'Home', url: paths.root },
          { label: 'CMS', url: paths.cms.posts },
          { label: isEditing ? 'Edit Post' : 'Add Post', active: true },
        ]}
        actionComponent={
          <Stack direction="row" spacing={1}>
            <Button variant="outlined" color="neutral" onClick={() => navigate(paths.cms.posts)}>
              Cancel
            </Button>
            <Button variant="contained" color="primary" onClick={handleSave}>
              {isEditing ? 'Update Post' : 'Publish Post'}
            </Button>
          </Stack>
        }
      />

      <Grid container spacing={3} sx={{ width: 1 }}>
        {/* Main Editor Area */}
        <Grid size={{ xs: 12, md: 8 }}>
          <Stack spacing={3}>
            <Paper sx={{ p: 3, borderRadius: 3, border: '1px solid', borderColor: 'divider', boxShadow: 'none' }}>
              <TextField
                placeholder="Post Title"
                variant="standard"
                fullWidth
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                slotProps={{
                  input: {
                    sx: {
                      fontSize: '1.75rem',
                      fontWeight: 700,
                      '&:before, &:after': { display: 'none' },
                    },
                  },
                }}
              />
              <Divider sx={{ my: 3 }} />
              <TextField
                multiline
                rows={20}
                placeholder="Start writing your story..."
                variant="standard"
                fullWidth
                value={content}
                onChange={(e) => setContent(e.target.value)}
                slotProps={{
                  input: {
                    sx: {
                      fontSize: '1.125rem',
                      lineHeight: 1.6,
                      '&:before, &:after': { display: 'none' },
                    },
                  },
                }}
              />
            </Paper>
          </Stack>
        </Grid>

        {/* Sidebar Settings */}
        <Grid size={{ xs: 12, md: 4 }}>
          <Stack direction="column" spacing={3} sx={{ width: 1 }}>
            <Paper sx={{ p: 3, borderRadius: 3, border: '1px solid', borderColor: 'divider', boxShadow: 'none' }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 2 }}>
                Publish Settings
              </Typography>
              
              <Stack direction="column" spacing={3} sx={{ width: 1 }}>
                <TextField
                  select
                  label="Status"
                  fullWidth
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                >
                  <MenuItem value="Draft">Draft</MenuItem>
                  <MenuItem value="Published">Published</MenuItem>
                  <MenuItem value="Scheduled">Scheduled</MenuItem>
                </TextField>

                <TextField
                  select
                  label="Category"
                  fullWidth
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <MenuItem value="Business Intelligence">Business Intelligence</MenuItem>
                  <MenuItem value="Tableau">Tableau</MenuItem>
                  <MenuItem value="Power BI">Power BI</MenuItem>
                  <MenuItem value="SQL">SQL</MenuItem>
                  <MenuItem value="Python">Python</MenuItem>
                </TextField>

                <Box>
                  <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 700, display: 'block', mb: 1 }}>
                    Tags
                  </Typography>
                  <TextField
                    placeholder="Type and press Enter"
                    fullWidth
                    size="small"
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    onKeyDown={handleAddTag}
                  />
                  <Box sx={{ mt: 1, display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                    {tags.map((tag) => (
                      <Chip
                        key={tag}
                        label={tag}
                        size="small"
                        onDelete={() => handleRemoveTag(tag)}
                        sx={{ borderRadius: 1 }}
                      />
                    ))}
                  </Box>
                </Box>

                <Box sx={{ p: 2, bgcolor: 'background.neutral', borderRadius: 2 }}>
                  <Stack direction="row" spacing={1} sx={{ alignItems: 'center', mb: 1 }}>
                    <IconifyIcon icon="material-symbols:info-outline" sx={{ color: 'info.main' }} />
                    <Typography variant="caption" sx={{ fontWeight: 700 }}>
                      Pro Tip
                    </Typography>
                  </Stack>
                  <Typography variant="caption" color="text.secondary">
                    Good titles and categories help with SEO and make your content discoverable.
                  </Typography>
                </Box>
              </Stack>
            </Paper>

            <Paper sx={{ p: 3, borderRadius: 3, border: '1px solid', borderColor: 'divider', boxShadow: 'none' }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 2 }}>
                Featured Image
              </Typography>
              <Box
                sx={{
                  height: 160,
                  borderRadius: 2,
                  border: '2px dashed',
                  borderColor: 'divider',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  bgcolor: 'background.neutral',
                  cursor: 'pointer',
                  '&:hover': { bgcolor: 'background.elevation1' },
                }}
              >
                <IconifyIcon icon="material-symbols:add-photo-alternate-outline" sx={{ fontSize: 32, color: 'text.disabled', mb: 1 }} />
                <Typography variant="caption" color="text.secondary">
                  Click to upload image
                </Typography>
              </Box>
            </Paper>
          </Stack>
        </Grid>
      </Grid>
    </Stack>
  );
};

export default PostEditor;
