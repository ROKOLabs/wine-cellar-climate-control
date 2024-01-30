import { TestButton } from 'components/LoginButton';
import { createBrowserRouter } from 'react-router-dom';

export const browserRouter = createBrowserRouter([
  {
    path: '/',
    Component: () => (
      <div>
        <h1>Home</h1>
        <p>Welcome to the home page!</p>
        <TestButton />
      </div>
    ),
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
