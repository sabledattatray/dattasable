'use client';
import { useState } from 'react';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import MenuItem from '@mui/material/MenuItem';
import Grid from '@mui/material/Grid';
import { useParams, useNavigate } from 'react-router';
import paths from 'routes/paths';
import PageHeader from 'components/sections/user-table/PageHeader';
import IconifyIcon from 'components/base/IconifyIcon';

const PageEditor = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: id ? 'Home' : '',
    slug: id ? '/' : '',
    status: 'Published',
    content: id ? 'Welcome to Datta Sable Portfolio...' : '',
    metaDescription: id ? 'Professional BI and Analytics Portfolio' : '',
  });

  const handleSave = () => {
    // Simulate save
    console.log('Saving page data:', formData);
    navigate(paths.cms.pages);
  };

  return (
    <Stack direction="column" sx={{ height: 1 }}>
      <PageHeader
        title={id ? `Edit Page: ${formData.title}` : 'Add New Page'}
        breadcrumb={[
          { label: 'Home', url: paths.root },
          { label: 'Pages', url: paths.cms.pages },
          { label: id ? 'Edit' : 'Add', active: true },
        ]}
      />
      <Paper sx={{ p: { xs: 3, md: 5 }, mt: 3, flex: 1 }}>
        <Stack spacing={4} sx={{ maxWidth: '1200px', margin: '0 auto' }}>
          <Typography variant="h5" sx={{ fontWeight: 600 }}>Page Configuration</Typography>
          
          <Grid container spacing={3}>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                label="Page Title"
                fullWidth
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                variant="outlined"
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                label="URL Slug"
                fullWidth
                value={formData.slug}
                onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                placeholder="/example-page"
                variant="outlined"
              />
            </Grid>
            
            <Grid size={{ xs: 12 }}>
              <TextField
                select
                label="Publication Status"
                fullWidth
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
              >
                <MenuItem value="Published">Published</MenuItem>
                <MenuItem value="Draft">Draft</MenuItem>
              </TextField>
            </Grid>

            <Grid size={{ xs: 12 }}>
              <TextField
                label="SEO Meta Description"
                fullWidth
                multiline
                rows={2}
                value={formData.metaDescription}
                onChange={(e) => setFormData({ ...formData, metaDescription: e.target.value })}
                helperText="Recommended length: 150-160 characters"
              />
            </Grid>

            <Grid size={{ xs: 12 }}>
              <TextField
                label="Page Content"
                fullWidth
                multiline
                rows={12}
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                placeholder="Enter HTML or Markdown content here..."
                sx={{ 
                  '& .MuiInputBase-root': {
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: '14px'
                  }
                }}
              />
            </Grid>
          </Grid>

          <Stack direction="row" spacing={2} sx={{ pt: 2, borderTop: '1px solid', borderColor: 'divider', justifyContent: 'flex-end' }}>
            <Button 
              variant="soft" 
              color="neutral"
              onClick={() => navigate(paths.cms.pages)}
              sx={{ minWidth: 120 }}
            >
              Cancel
            </Button>
            <Button 
              variant="contained" 
              color="primary"
              onClick={handleSave}
              startIcon={<IconifyIcon icon="material-symbols:save-outline" />}
              sx={{ minWidth: 150 }}
            >
              Save Changes
            </Button>
          </Stack>
        </Stack>
      </Paper>
    </Stack>
  );
};

export default PageEditor;
