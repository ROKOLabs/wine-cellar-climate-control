import { Button, Group } from '@mantine/core';

import { useAuthService } from 'features/auth/hooks/useAuthService';

export const TestButton = () => {
  const authService = useAuthService();

  const handleRegister = () =>
    authService
      .register('test@gmail.com', 'password1234')
      .then(console.log)
      .catch(console.error);

  const handleLogin = () =>
    authService
      .login('test@gmail.com', 'password1234')
      .then(console.log)
      .catch(console.error);

  const handleLogout = () =>
    authService.logout().then(console.log).catch(console.error);

  return (
    <Group>
      <Button onClick={handleRegister}>Register</Button>
      <Button onClick={handleLogin}>Login</Button>
      <Button onClick={handleLogout}>Logout</Button>
    </Group>
  );
};
