import { createBrowserRouter, redirect } from 'react-router-dom';

import { Settings } from 'features/Settings/Settings';
import { AuthStateChangeGuard } from 'features/auth/components/AuthStateChangeGuard';
import { Login } from 'features/auth/pages/Login';
import { Register } from 'features/auth/pages/Register';
import { Home } from 'features/home/Home';
import { Layout } from 'features/layout/Layout';
import { authorizationLoader } from 'router/loaders/authorizationLoader';
import { protectedLoader } from 'router/loaders/protectedLoader';

export const browserRouter = createBrowserRouter([
  {
    Component: AuthStateChangeGuard,
    children: [
      {
        Component: Layout,
        children: [
          {
            loader: protectedLoader,
            children: [
              // Protected routes
              { index: true, loader: () => redirect('/home') },
              { path: '/home', Component: Home },
              { path: '/settings', Component: Settings },
            ],
          },
          {
            loader: authorizationLoader,
            children: [
              // Public routes
              { path: '/login', Component: Login },
              { path: '/register', Component: Register },
            ],
          },
        ],
      },
    ],
  },
]);
