'use client';
import { Suspense, lazy } from 'react';
import { Outlet, RouteObject, createBrowserRouter, useLocation } from 'react-router';
import App from 'App';
import AuthLayout from 'layouts/auth-layout';
import MainLayout from 'layouts/main-layout';
import Page404 from 'pages/errors/Page404';
import PageLoader from 'components/loading/PageLoader';
import paths, { rootPaths } from './paths';

const Analytics = lazy(() => import('pages/dashboard/Analytics'));
const UserList = lazy(() => import('pages/users/UserList'));
const Starter = lazy(() => import('pages/others/Starter'));
const Account = lazy(() => import('pages/others/Account'));

const Login = lazy(() => import('pages/authentication/Login'));
const Signup = lazy(() => import('pages/authentication/Signup'));

const BlogPosts = lazy(() => import('pages/cms/BlogPosts'));
const Categories = lazy(() => import('pages/cms/Categories'));
const PostEditor = lazy(() => import('pages/cms/PostEditor'));
const Pages = lazy(() => import('pages/cms/Pages'));
const PageEditor = lazy(() => import('pages/cms/PageEditor'));

const Messages = lazy(() => import('pages/interactions/Messages'));
const Subscribers = lazy(() => import('pages/interactions/Subscribers'));

export const SuspenseOutlet = () => {
  const location = useLocation();

  return (
    <Suspense key={location.pathname} fallback={<PageLoader />}>
      <Outlet />
    </Suspense>
  );
};

export const routes: RouteObject[] = [
  {
    element: <App />,
    children: [
      {
        path: '/',
        element: (
          <MainLayout>
            <SuspenseOutlet />
          </MainLayout>
        ),
        children: [
          {
            index: true,
            element: <Analytics />,
          },
          {
            path: paths.users,
            element: <UserList />,
          },
          {
            path: paths.account,
            element: <Account />,
          },
          {
            path: paths.starter,
            element: <Starter />,
          },
          {
            path: paths.cms.posts,
            element: <BlogPosts />,
          },
          {
            path: paths.cms.categories,
            element: <Categories />,
          },
          {
            path: paths.cms.addPost,
            element: <PostEditor />,
          },
          {
            path: '/cms/posts/edit/:id',
            element: <PostEditor />,
          },
          {
            path: paths.interactions.messages,
            element: <Messages />,
          },
          {
            path: paths.interactions.subscribers,
            element: <Subscribers />,
          },
          {
            path: paths.cms.pages,
            element: <Pages />,
          },
          {
            path: paths.cms.addPage,
            element: <PageEditor />,
          },
          {
            path: '/cms/pages/edit/:id',
            element: <PageEditor />,
          },
        ],
      },
      {
        path: rootPaths.authRoot,
        element: (
          <AuthLayout>
            <SuspenseOutlet />
          </AuthLayout>
        ),
        children: [
          {
            path: paths.login,
            element: <Login />,
          },
          {
            path: paths.signup,
            element: <Signup />,
          },
        ],
      },

      {
        path: paths['404'],
        element: <Page404 />,
      },
      {
        path: '*',
        element: <Page404 />,
      },
    ],
  },
];

const router = createBrowserRouter(routes, {
  basename: ({ MODE: process.env.NODE_ENV, VITE_BASENAME: "/admin", VITE_APP_VERSION: "1.0.0", VITE_ASSET_BASE_URL: "" } as any).MODE === 'production' ? ({ MODE: process.env.NODE_ENV, VITE_BASENAME: "/admin", VITE_APP_VERSION: "1.0.0", VITE_ASSET_BASE_URL: "" } as any).VITE_BASENAME : '/',
});

export default router;
