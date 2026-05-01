'use client';
import IconifyIcon from 'components/base/IconifyIcon';
import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router';
import paths from 'routes/paths';
import { 
  Link, Box, Typography, Stack, Button, Select, MenuItem, 
  Checkbox, Table, TableBody, TableCell, TableContainer, 
  TableHead, TableRow, Paper, TextField, IconButton 
} from '@mui/material';

const postsData = [
  {
    id: 1,
    title: 'Optimizing React Performance with useMemo',
    author: 'admin',
    categories: ['Development', 'React'],
    tags: ['performance', 'hooks'],
    comments: 5,
    status: 'Published',
    date: '2023/10/24'
  },
  {
    id: 2,
    title: 'The Future of Design Systems in Enterprise',
    author: 'jane_doe',
    categories: ['Design', 'Enterprise'],
    tags: [],
    comments: 0,
    status: 'Draft',
    date: '2023/10/22'
  },
  {
    id: 3,
    title: 'Understanding Tailwind CSS Container Queries',
    author: 'admin',
    categories: ['Development', 'CSS'],
    tags: ['tailwind', 'responsive'],
    comments: 12,
    status: 'Published',
    date: '2023/10/20'
  },
  {
    id: 4,
    title: 'Modern SEO Strategies for 2024',
    author: 'seo_pro',
    categories: ['Marketing', 'SEO'],
    tags: ['google', 'ranking'],
    comments: 8,
    status: 'Published',
    date: '2023/10/18'
  },
  {
    id: 5,
    title: 'Micro-interactions in UI Design',
    author: 'designer_x',
    categories: ['Design', 'UX'],
    tags: ['animation', 'figma'],
    comments: 2,
    status: 'Published',
    date: '2023/10/15'
  },
  {
    id: 6,
    title: 'Getting Started with Next.js 14 App Router',
    author: 'admin',
    categories: ['Development', 'Next.js'],
    tags: ['server-components', 'react'],
    comments: 15,
    status: 'Draft',
    date: '2023/10/12'
  },
  {
    id: 7,
    title: 'The Importance of Accessible Web Components',
    author: 'a11y_expert',
    categories: ['Development', 'Accessibility'],
    tags: ['aria', 'html'],
    comments: 4,
    status: 'Published',
    date: '2023/10/10'
  },
  {
    id: 8,
    title: 'Deploying Scalable Node.js Applications',
    author: 'devops_guru',
    categories: ['Development', 'DevOps'],
    tags: ['docker', 'kubernetes'],
    comments: 21,
    status: 'Published',
    date: '2023/10/08'
  },
  {
    id: 9,
    title: 'Typography Trends in Modern Web',
    author: 'designer_x',
    categories: ['Design', 'UI'],
    tags: ['fonts', 'layout'],
    comments: 0,
    status: 'Published',
    date: '2023/10/05'
  },
  {
    id: 10,
    title: 'Automated Testing with Jest and Vitest',
    author: 'admin',
    categories: ['Development', 'Testing'],
    tags: ['qa', 'javascript'],
    comments: 6,
    status: 'Published',
    date: '2023/10/02'
  },
  {
    id: 11,
    title: 'Building a SaaS with Stripe Integration',
    author: 'saas_builder',
    categories: ['Development', 'Business'],
    tags: ['payments', 'api'],
    comments: 32,
    status: 'Published',
    date: '2023/09/28'
  }
];

const WpBlogPosts = () => {
  const [selected, setSelected] = useState<number[]>([]);

  const handleSelectAll = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      setSelected(postsData.map((p) => p.id));
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
      alert('Please select items first.');
      return;
    }
    alert(`Bulk action applied to ${selected.length} posts.`);
  };

  return (
    <Box sx={{ p: 2, bgcolor: '#f0f0f1', minHeight: '100%' }}>
      {/* Page Header */}
      <Stack direction="row" spacing={2} sx={{ mb: 2, alignItems: 'center' }}>
        <Typography variant="h5" sx={{ fontSize: '23px', fontWeight: 400, color: '#1d2327' }}>
          Posts
        </Typography>
        <Button 
          variant="outlined" 
          size="small" 
          component={RouterLink}
          to={paths.cms.addPost}
          sx={{ 
            color: '#2271b1', 
            borderColor: '#2271b1', 
            textTransform: 'none', 
            fontSize: '13px',
            bgcolor: '#fff',
            py: 0.5,
            px: 1.5,
            minWidth: 'auto',
            '&:hover': { bgcolor: '#f6f7f7', borderColor: '#72aee6' }
          }}
        >
          Add New
        </Button>
      </Stack>

      {/* Filter Links */}
      <Stack direction="row" spacing={1} sx={{ mb: 2, alignItems: 'center', flexWrap: 'wrap' }}>
        <Link href="#" sx={{ fontSize: '13px', color: '#2271b1', fontWeight: 600, textDecoration: 'none' }}>
          All <span style={{ color: '#646970', fontWeight: 400 }}>(42)</span>
        </Link>
        <Typography sx={{ color: '#c3c4c7', fontSize: '13px' }}>|</Typography>
        <Link href="#" sx={{ fontSize: '13px', color: '#2271b1', textDecoration: 'none' }}>
          Published <span style={{ color: '#646970' }}>(38)</span>
        </Link>
        <Typography sx={{ color: '#c3c4c7', fontSize: '13px' }}>|</Typography>
        <Link href="#" sx={{ fontSize: '13px', color: '#2271b1', textDecoration: 'none' }}>
          Drafts <span style={{ color: '#646970' }}>(4)</span>
        </Link>
        <Typography sx={{ color: '#c3c4c7', fontSize: '13px' }}>|</Typography>
        <Link href="#" sx={{ fontSize: '13px', color: '#2271b1', textDecoration: 'none' }}>
          Trash <span style={{ color: '#646970' }}>(1)</span>
        </Link>
      </Stack>

      {/* Controls Row */}
      <Stack direction="row" sx={{ mb: 1, justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 1 }}>
        <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
          <Select 
            size="small" 
            defaultValue="-1"
            sx={{ 
              fontSize: '13px', 
              height: 30, 
              bgcolor: '#fff', 
              borderRadius: '3px',
              '& .MuiSelect-select': { py: 0 }
            }}
          >
            <MenuItem value="-1">Bulk actions</MenuItem>
            <MenuItem value="edit">Edit</MenuItem>
            <MenuItem value="trash">Move to Trash</MenuItem>
          </Select>
          <Button 
            variant="outlined" 
            size="small" 
            onClick={handleApplyAction}
            sx={{ 
              height: 30, 
              color: '#2271b1', 
              borderColor: '#c3c4c7', 
              textTransform: 'none', 
              fontSize: '13px',
              bgcolor: '#fff'
            }}
          >
            Apply
          </Button>

          <Box sx={{ width: 10 }} />

          <Select 
            size="small" 
            defaultValue="0"
            sx={{ fontSize: '13px', height: 30, bgcolor: '#fff', borderRadius: '3px', '& .MuiSelect-select': { py: 0 } }}
          >
            <MenuItem value="0">All dates</MenuItem>
            <MenuItem value="202310">October 2023</MenuItem>
          </Select>
          <Select 
            size="small" 
            defaultValue="0"
            sx={{ fontSize: '13px', height: 30, bgcolor: '#fff', borderRadius: '3px', '& .MuiSelect-select': { py: 0 } }}
          >
            <MenuItem value="0">All categories</MenuItem>
            <MenuItem value="dev">Development</MenuItem>
          </Select>
          <Button 
            variant="outlined" 
            size="small" 
            sx={{ height: 30, color: '#2271b1', borderColor: '#c3c4c7', textTransform: 'none', fontSize: '13px', bgcolor: '#fff' }}
          >
            Filter
          </Button>
        </Stack>

        <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
          <TextField 
            size="small" 
            placeholder="Search posts" 
            sx={{ 
              bgcolor: '#fff', 
              '& .MuiInputBase-root': { height: 30, fontSize: '13px' },
              '& .MuiOutlinedInput-notchedOutline': { borderRadius: '3px' }
            }} 
          />
          <Button 
            variant="outlined" 
            size="small" 
            sx={{ height: 30, color: '#2271b1', borderColor: '#c3c4c7', textTransform: 'none', fontSize: '13px', bgcolor: '#fff' }}
          >
            Search Posts
          </Button>
        </Stack>
      </Stack>

      {/* Pagination Top */}
      <Stack direction="row" sx={{ mb: 1, justifyContent: 'flex-end', alignItems: 'center' }}>
        <Typography sx={{ fontSize: '13px', color: '#1d2327', mr: 2 }}>42 items</Typography>
        <Stack direction="row" spacing={0.5}>
          <IconButton disabled size="small" sx={{ border: '1px solid #c3c4c7', borderRadius: '3px', width: 30, height: 30, bgcolor: '#f6f7f7', opacity: 0.5 }}>
            <IconifyIcon icon="material-symbols:keyboard-double-arrow-left" fontSize={18} />
          </IconButton>
          <IconButton disabled size="small" sx={{ border: '1px solid #c3c4c7', borderRadius: '3px', width: 30, height: 30, bgcolor: '#f6f7f7', opacity: 0.5 }}>
            <IconifyIcon icon="material-symbols:chevron-left" fontSize={18} />
          </IconButton>
          <Box sx={{ display: 'flex', alignItems: 'center', px: 1 }}>
            <TextField 
              size="small" 
              defaultValue="1" 
              sx={{ 
                width: 40, 
                '& .MuiInputBase-root': { height: 24, fontSize: '13px', textAlign: 'center' }
              }} 
            />
            <Typography sx={{ fontSize: '13px', ml: 1, color: '#1d2327' }}>of 3</Typography>
          </Box>
          <IconButton size="small" sx={{ border: '1px solid #c3c4c7', borderRadius: '3px', width: 30, height: 30, bgcolor: '#f6f7f7', color: '#2271b1' }}>
            <IconifyIcon icon="material-symbols:chevron-right" fontSize={18} />
          </IconButton>
          <IconButton size="small" sx={{ border: '1px solid #c3c4c7', borderRadius: '3px', width: 30, height: 30, bgcolor: '#f6f7f7', color: '#2271b1' }}>
            <IconifyIcon icon="material-symbols:keyboard-double-arrow-right" fontSize={18} />
          </IconButton>
        </Stack>
      </Stack>

      {/* Table */}
      <TableContainer sx={{ border: '1px solid #c3c4c7', bgcolor: '#fff', borderRadius: 0 }}>
        <Table size="small" sx={{ borderCollapse: 'collapse' }}>
          <TableHead sx={{ bgcolor: '#fff', borderBottom: '1px solid #c3c4c7' }}>
            <TableRow>
              <TableCell padding="checkbox" sx={{ width: '2.2em', textAlign: 'center' }}>
                <Checkbox 
                  size="small" 
                  checked={selected.length === postsData.length}
                  onChange={handleSelectAll}
                  sx={{ color: '#8c8f94' }} 
                />
              </TableCell>
              <TableCell sx={{ fontSize: '14px', fontWeight: 600, color: '#1d2327' }}>
                <Link href="#" sx={{ color: 'inherit', textDecoration: 'none', display: 'flex', alignItems: 'center', '&:hover': { color: '#2271b1' } }}>
                  Title <IconifyIcon icon="material-symbols:arrow-upward" fontSize={16} sx={{ ml: 0.5, opacity: 0.5 }} />
                </Link>
              </TableCell>
              <TableCell sx={{ fontSize: '14px', fontWeight: 600, color: '#1d2327', width: '15%' }}>Author</TableCell>
              <TableCell sx={{ fontSize: '14px', fontWeight: 600, color: '#1d2327', width: '15%' }}>Categories</TableCell>
              <TableCell sx={{ fontSize: '14px', fontWeight: 600, color: '#1d2327', width: '15%' }}>Tags</TableCell>
              <TableCell sx={{ width: '5.5em', textAlign: 'center' }}>
                <IconifyIcon icon="material-symbols:chat-bubble" fontSize={18} sx={{ color: '#646970' }} />
              </TableCell>
              <TableCell sx={{ fontSize: '14px', fontWeight: 600, color: '#1d2327', width: '10%' }}>
                <Link href="#" sx={{ color: 'inherit', textDecoration: 'none', display: 'flex', alignItems: 'center', '&:hover': { color: '#2271b1' } }}>
                  Date <IconifyIcon icon="material-symbols:arrow-downward" fontSize={16} sx={{ ml: 0.5 }} />
                </Link>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {postsData.map((post, index) => {
              const isSelected = selected.includes(post.id);
              return (
                <TableRow 
                  key={post.id} 
                  sx={{ 
                    bgcolor: index % 2 === 0 ? '#fff' : '#f9f9f9',
                    '&:hover': { bgcolor: '#f6f7f7' },
                    borderBottom: '1px solid #f0f0f1',
                    '& .hover-actions': { opacity: 0 },
                    '&:hover .hover-actions': { opacity: 1 }
                  }}
                >
                  <TableCell padding="checkbox" sx={{ textAlign: 'center', verticalAlign: 'top', pt: 1.5 }}>
                    <Checkbox 
                      size="small" 
                      checked={isSelected}
                      onChange={() => handleSelectOne(post.id)}
                      sx={{ color: '#8c8f94' }} 
                    />
                  </TableCell>
                  <TableCell sx={{ verticalAlign: 'top', py: 1.5 }}>
                    <Typography sx={{ fontSize: '14px', fontWeight: 600, color: '#1d2327' }}>
                      <Link href="#" sx={{ color: '#2271b1', textDecoration: 'none', '&:hover': { color: '#72aee6' } }}>
                        {post.title}
                      </Link>
                      {post.status === 'Draft' && (
                        <span style={{ color: '#646970', fontWeight: 400, marginLeft: '4px' }}>— Draft</span>
                      )}
                    </Typography>
                    
                    {/* Hover Actions */}
                    <Stack direction="row" spacing={0.5} className="hover-actions" sx={{ mt: 0.5, transition: 'opacity 0.2s' }}>
                      <Link href="#" sx={{ fontSize: '13px', color: '#2271b1', textDecoration: 'none', '&:hover': { color: '#72aee6' } }}>Edit</Link>
                      <Typography sx={{ color: '#c3c4c7', fontSize: '12px' }}>|</Typography>
                      <Link href="#" sx={{ fontSize: '13px', color: '#2271b1', textDecoration: 'none', '&:hover': { color: '#72aee6' } }}>Quick Edit</Link>
                      <Typography sx={{ color: '#c3c4c7', fontSize: '12px' }}>|</Typography>
                      <Link href="#" sx={{ fontSize: '13px', color: '#b32d2e', textDecoration: 'none', '&:hover': { color: '#ef4444' } }}>Trash</Link>
                      <Typography sx={{ color: '#c3c4c7', fontSize: '12px' }}>|</Typography>
                      <Link href="#" sx={{ fontSize: '13px', color: '#2271b1', textDecoration: 'none', '&:hover': { color: '#72aee6' } }}>{post.status === 'Draft' ? 'Preview' : 'View'}</Link>
                    </Stack>
                  </TableCell>
                  <TableCell sx={{ verticalAlign: 'top', py: 1.5 }}>
                    <Link href="#" sx={{ color: '#2271b1', fontSize: '13px', textDecoration: 'none' }}>{post.author}</Link>
                  </TableCell>
                  <TableCell sx={{ verticalAlign: 'top', py: 1.5 }}>
                    <Stack direction="row" spacing={0.5} sx={{ flexWrap: 'wrap' }}>
                      {post.categories.map((cat, i) => (
                        <React.Fragment key={cat}>
                          <Link href="#" sx={{ color: '#2271b1', fontSize: '13px', textDecoration: 'none' }}>{cat}</Link>
                          {i < post.categories.length - 1 && <Typography sx={{ fontSize: '13px', color: '#1d2327' }}>, </Typography>}
                        </React.Fragment>
                      ))}
                    </Stack>
                  </TableCell>
                  <TableCell sx={{ verticalAlign: 'top', py: 1.5 }}>
                    <Typography sx={{ fontSize: '13px', color: post.tags.length > 0 ? '#1d2327' : '#646970', fontStyle: post.tags.length > 0 ? 'normal' : 'italic' }}>
                      {post.tags.length > 0 ? post.tags.join(', ') : '—'}
                    </Typography>
                  </TableCell>
                  <TableCell sx={{ verticalAlign: 'top', py: 1.5, textAlign: 'center' }}>
                    {post.comments > 0 ? (
                      <Box sx={{ 
                        display: 'inline-flex', 
                        bgcolor: '#dcdcde', 
                        color: '#1d2327', 
                        px: 0.8, 
                        py: 0.2, 
                        borderRadius: '10px', 
                        fontSize: '11px', 
                        fontWeight: 700,
                        cursor: 'pointer',
                        '&:hover': { bgcolor: '#2271b1', color: '#fff' }
                      }}>
                        {post.comments}
                      </Box>
                    ) : (
                      <Typography sx={{ color: '#c3c4c7' }}>—</Typography>
                    )}
                  </TableCell>
                  <TableCell sx={{ verticalAlign: 'top', py: 1.5 }}>
                    <Typography sx={{ fontSize: '13px', color: '#1d2327' }}>
                      {post.status === 'Published' ? 'Published' : 'Last Modified'}<br />
                      <span style={{ color: '#646970' }}>{post.date}</span>
                    </Typography>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Bulk Actions Bottom */}
      <Stack direction="row" spacing={1} sx={{ mt: 1, alignItems: 'center' }}>
        <Select 
          size="small" 
          defaultValue="-1"
          sx={{ fontSize: '13px', height: 30, bgcolor: '#fff', borderRadius: '3px', '& .MuiSelect-select': { py: 0 } }}
        >
          <MenuItem value="-1">Bulk actions</MenuItem>
          <MenuItem value="edit">Edit</MenuItem>
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
    </Box>
  );
};

export default WpBlogPosts;
