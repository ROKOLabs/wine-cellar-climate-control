import { Settings } from 'features/Settings/Settings';
import { Login } from 'features/auth/pages/Login';
import { Register } from 'features/auth/pages/Register';
import { Home } from 'features/home/Home';
import { createBrowserRouter } from 'react-router-dom';

export const browserRouter = createBrowserRouter([
  {
    path: '/',
    loader: () => null,
    Component: Home,
  },
  {
    path: '/settings',
    loader: () => null,
    Component: Settings,
  },
  {
    path: '/login',
    loader: () => null,
    Component: Login,
  },
  {
    path: '/register',
    loader: () => null,
    Component: Register,
  },
]);
