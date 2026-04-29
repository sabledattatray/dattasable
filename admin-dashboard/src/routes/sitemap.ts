'use client';
import { HTMLAttributeAnchorTarget } from 'react';
import { SxProps } from '@mui/material';
import paths, { rootPaths } from './paths';

export interface SubMenuItem {
  name: string;
  pathName: string;
  key?: string;
  selectionPrefix?: string;
  path?: string;
  target?: HTMLAttributeAnchorTarget;
  active?: boolean;
  icon?: string;
  iconSx?: SxProps;
  items?: SubMenuItem[];
}

export interface MenuItem {
  id: string;
  key?: string; // used for the locale
  subheader?: string;
  icon: string;
  target?: HTMLAttributeAnchorTarget;
  iconSx?: SxProps;
  items: SubMenuItem[];
}

const sitemap: MenuItem[] = [
  {
    id: 'pages',
    icon: 'material-symbols:view-quilt-outline',
    items: [
      {
        name: 'Dashboard',
        path: rootPaths.root,
        pathName: 'dashboard',
        icon: 'material-symbols:query-stats-rounded',
        active: true,
      },
      {
        name: 'Real-Time Tracking',
        path: paths.realTime,
        pathName: 'real-time',
        icon: 'material-symbols:analytics-outline-rounded',
        active: true,
        iconSx: { color: 'inherit' },
      },
      {
        name: 'Users',
        path: paths.users,
        pathName: 'users',
        icon: 'material-symbols:account-box-outline',
        active: true,
      },
      {
        name: 'Account',
        key: 'account',
        path: paths.account,
        pathName: 'account',
        active: true,
        icon: 'material-symbols:admin-panel-settings-outline-rounded',
      },
      {
        name: 'Starter',
        path: paths.starter,
        pathName: 'starter',
        icon: 'material-symbols:play-circle-outline-rounded',
        active: true,
      },
      {
        name: 'Error 404',
        pathName: 'error',
        active: true,
        icon: 'material-symbols:warning-outline-rounded',
        path: paths[404],
      },
      {
        name: 'Login',
        icon: 'material-symbols:login',
        path: paths.login,
        pathName: 'login',
        active: true,
      },
      {
        name: 'Sign up',
        icon: 'material-symbols:person-add-outline',
        path: paths.signup,
        pathName: 'sign-up',
        active: true,
      },
      {
        name: 'Settings',
        path: paths.settings,
        pathName: 'settings',
        icon: 'material-symbols:settings-outline-rounded',
        active: true,
      },
    ],
  },
  {
    id: 'cms',
    subheader: 'Content Management',
    icon: 'material-symbols:article-outline',
    items: [
      {
        name: 'Blog Posts',
        path: paths.cms.posts,
        pathName: 'blog-posts',
        icon: 'material-symbols:article-outline-rounded',
        active: true,
      },
      {
        name: 'Categories',
        path: paths.cms.categories,
        pathName: 'categories',
        icon: 'material-symbols:folder-outline',
        active: true,
      },
      {
        name: 'Add New Post',
        path: paths.cms.addPost,
        pathName: 'add-post',
        icon: 'material-symbols:add-circle-outline-rounded',
        active: true,
      },
      {
        name: 'Pages',
        path: paths.cms.pages,
        pathName: 'pages',
        icon: 'material-symbols:layers-outline-rounded',
        active: true,
      },
    ],
  },
  {
    id: 'interactions',
    subheader: 'Interactions',
    icon: 'material-symbols:connect-without-contact-outline',
    items: [
      {
        name: 'Messages',
        path: paths.interactions.messages,
        pathName: 'messages',
        icon: 'material-symbols:chat-outline-rounded',
        active: true,
      },
      {
        name: 'Subscribers',
        path: paths.interactions.subscribers,
        pathName: 'subscribers',
        icon: 'material-symbols:mail-outline-rounded',
        active: true,
      },
    ],
  },
];

export default sitemap;
