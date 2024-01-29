import { createBrowserRouter } from 'react-router-dom';

export const browserRouter = createBrowserRouter([
  {
    path: '/',
    Component: () => <h1>Home</h1>,
  },
  {
    path: '/login',
    Component: () => <h1>Login</h1>,
  },
  {
    path: '/register',
    Component: () => <h1>Register</h1>,
  },
]);
