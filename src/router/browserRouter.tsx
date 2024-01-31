import { createBrowserRouter } from 'react-router-dom';

import { TestButton } from 'components/LoginButton';
import AppLayout from 'features/AppLayout';

export const browserRouter = createBrowserRouter([
  {
    path: '/',
    Component: AppLayout,
    children: [
      {
        index: true,
        Component: () => (
          <div>
            <h1>Home</h1>
            <p>Welcome to the home page!</p>
            <TestButton />
          </div>
        ),
      },
      {
        path: 'login',
        Component: () => <h1>Login</h1>,
      },
      {
        path: 'register',
        Component: () => <h1>Register</h1>,
      },
    ],
  },
]);
