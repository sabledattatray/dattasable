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
import EditorJsComponent from 'components/editor/EditorJsComponent';

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
  const [content, setContent] = useState<any>('');
  const [status, setStatus] = useState('Published');
  const [category, setCategory] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState('');
  const isEditing = Boolean(id);
  const [isDataLoaded, setIsDataLoaded] = useState(!isEditing);

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
      setIsDataLoaded(true);
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

    let plainText = '';
    if (typeof content === 'string') {
      plainText = content;
    } else if (content.blocks) {
      plainText = content.blocks.map((b: any) => b.data?.text || b.data?.caption || '').join(' ').replace(/<[^>]+>/g, '');
    }

    const slug = title.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');
    const newPost = {
      slug,
      title,
      content: typeof content === 'string' ? content : JSON.stringify(content),
      category,
      tags,
      status,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      excerpt: plainText.substring(0, 150) + '...',
      readTime: Math.ceil(plainText.split(' ').length / 200) || 5,
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

      <Grid container spacing={4} sx={{ width: 1, alignItems: 'flex-start' }}>
        {/* Main Editor Area */}
        <Grid size={{ xs: 12, md: 8 }}>
          <Paper 
            sx={{ 
              p: { xs: 4, md: 6 }, 
              borderRadius: 4, 
              border: 'none', 
              bgcolor: 'background.paper',
              boxShadow: (theme) => theme.palette.mode === 'dark' ? '0 4px 24px rgba(0,0,0,0.4)' : '0 12px 40px rgba(0,0,0,0.03)',
              minHeight: '75vh',
              display: 'flex',
              flexDirection: 'column'
            }}
          >
            <TextField
              placeholder="Post Title"
              variant="standard"
              fullWidth
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              slotProps={{
                input: {
                  sx: {
                    fontSize: { xs: '1.25rem', md: '1.5rem' },
                    fontWeight: 600,
                    lineHeight: 1.2,
                    color: 'text.primary',
                    '&:before, &:after': { display: 'none' },
                  },
                },
              }}
            />
            <Divider sx={{ my: 4, opacity: 0.5, borderStyle: 'dashed' }} />
            
            <Box sx={{ flexGrow: 1, px: { xs: 0, md: 2 } }}>
              {isDataLoaded ? (
                <EditorJsComponent
                  data={content}
                  onChange={(data) => setContent(data)}
                />
              ) : (
                <Typography color="text.secondary">Loading editor...</Typography>
              )}
            </Box>
          </Paper>
        </Grid>

        {/* Sidebar Settings */}
        <Grid size={{ xs: 12, md: 4 }}>
          <Stack direction="column" spacing={4} sx={{ width: 1, position: 'sticky', top: 24 }}>
            <Paper sx={{ p: 4, borderRadius: 4, border: '1px solid', borderColor: 'divider', boxShadow: 'none' }}>
              <Typography variant="h6" sx={{ fontWeight: 700, mb: 3, display: 'flex', alignItems: 'center', gap: 1 }}>
                <IconifyIcon icon="material-symbols:settings-outline" fontSize={20} /> Publish Settings
              </Typography>
              
              <Stack direction="column" spacing={3} sx={{ width: 1 }}>
                <TextField
                  select
                  label="Status"
                  fullWidth
                  variant="outlined"
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
                  variant="outlined"
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
                  <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600, display: 'block', mb: 1, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    Tags
                  </Typography>
                  <TextField
                    placeholder="Type and press Enter"
                    fullWidth
                    variant="outlined"
                    size="small"
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    onKeyDown={handleAddTag}
                    sx={{ mb: 1.5 }}
                  />
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                    {tags.map((tag) => (
                      <Chip
                        key={tag}
                        label={tag}
                        size="small"
                        onDelete={() => handleRemoveTag(tag)}
                        sx={{ borderRadius: '8px', fontWeight: 600, bgcolor: 'primary.main', color: 'primary.contrastText', '& .MuiChip-deleteIcon': { color: 'primary.contrastText', opacity: 0.7, '&:hover': { opacity: 1 } } }}
                      />
                    ))}
                  </Box>
                </Box>

                <Box sx={{ p: 2.5, bgcolor: 'info.lighter', borderRadius: 3, border: '1px solid', borderColor: 'info.light' }}>
                  <Stack direction="row" spacing={1} sx={{ alignItems: 'center', mb: 1 }}>
                    <IconifyIcon icon="material-symbols:lightbulb-circle" sx={{ color: 'info.main', fontSize: 20 }} />
                    <Typography variant="subtitle2" sx={{ fontWeight: 700, color: 'info.dark' }}>
                      Pro Tip
                    </Typography>
                  </Stack>
                  <Typography variant="body2" sx={{ color: 'info.dark', opacity: 0.8, lineHeight: 1.6 }}>
                    Good titles and categories help with SEO and make your content more discoverable.
                  </Typography>
                </Box>
              </Stack>
            </Paper>

            <Paper sx={{ p: 4, borderRadius: 4, border: '1px solid', borderColor: 'divider', boxShadow: 'none' }}>
              <Typography variant="h6" sx={{ fontWeight: 700, mb: 3, display: 'flex', alignItems: 'center', gap: 1 }}>
                <IconifyIcon icon="material-symbols:image-outline" fontSize={20} /> Featured Image
              </Typography>
              <Box
                sx={{
                  height: 180,
                  borderRadius: 3,
                  border: '2px dashed',
                  borderColor: 'divider',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  bgcolor: 'background.default',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  '&:hover': { bgcolor: 'action.hover', borderColor: 'primary.main' },
                }}
              >
                <IconifyIcon icon="material-symbols:add-photo-alternate-outline" sx={{ fontSize: 40, color: 'text.secondary', mb: 1.5 }} />
                <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 600 }}>
                  Click to upload featured image
                </Typography>
                <Typography variant="caption" color="text.disabled" sx={{ mt: 0.5 }}>
                  1200 x 630px recommended
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
