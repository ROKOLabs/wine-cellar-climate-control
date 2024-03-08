import { createBrowserRouter, redirect } from 'react-router-dom';

import { RouteTransition } from 'components/RouteTransition/RouteTransition';
import { History } from 'features/History/History';
import { Settings } from 'features/Settings/Settings';
import { AuthGuard } from 'features/auth/components/AuthGuard';
import { ForgotPassword } from 'features/auth/pages/forgotPassword/ForgotPassword';
import { Login } from 'features/auth/pages/login/Login';
import { Register } from 'features/auth/pages/register/Register';
import { Dashboard } from 'features/dashboard/Dashboard';
import { Layout } from 'features/layout/Layout';
import { protectedLoader } from 'router/loaders/protectedLoader';
import { publicLoader } from 'router/loaders/publicLoader';

export const routes = {
  login: '/login',
  register: '/register',
  dashboard: '/dashboard',
  settings: '/settings',
  history: '/history',
  forgotPassword: '/forgot-password',
};

export const router = createBrowserRouter([
  {
    Component: AuthGuard,
    children: [
      {
        Component: Layout,
        children: [
          {
            Component: RouteTransition,
            children: [
              {
                loader: protectedLoader,
                children: [
                  // Protected routes
                  { index: true, loader: () => redirect(routes.login) },
                  { path: routes.dashboard, Component: Dashboard },
                  { path: routes.settings, Component: Settings },
                  { path: routes.history, Component: History },
                ],
              },
              {
                loader: publicLoader,
                children: [
                  // Public routes
                  { path: routes.login, Component: Login },
                  { path: routes.register, Component: Register },
                  {
                    path: routes.forgotPassword,
                    Component: ForgotPassword,
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
]);
