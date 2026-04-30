'use client';
import { documentationPath } from 'lib/constants';

export const rootPaths = {
  root: '/',
  authRoot: 'auth',
};

const paths = {
  root: rootPaths.root,
  starter: `/starter`,
  users: `/users`,
  account: `/account`,
  login: `/${rootPaths.authRoot}/login`,
  signup: `/${rootPaths.authRoot}/sign-up`,
  notifications: `/notifications`,
  documentation: documentationPath,
  settings: '/settings',
  realTime: '/real-time',
  auditLogs: '/audit-logs',

  cms: {
    posts: '/cms/posts',
    categories: '/cms/categories',
    addPost: '/cms/posts/add',
    editPost: (id: string) => `/cms/posts/edit/${id}`,
    pages: '/cms/pages',
    addPage: '/cms/pages/add',
    editPage: (id: string) => `/cms/pages/edit/${id}`,
  },

  interactions: {
    messages: '/interactions/messages',
    subscribers: '/interactions/subscribers',
  },

  404: `/404`,
};

export default paths;
