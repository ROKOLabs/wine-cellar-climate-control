import { Button, Group } from '@mantine/core';

import { useAuthService } from 'features/auth/hooks/useAuthService';
import { tapX } from 'utility/fp/tapX';

const REGISTRATION_DATA = {
  username: 'ivbrajkovic1',
  email: 'ivan.brajkovic1@icloud.com',
  password: '123456',
  name: 'Ivan',
  lastname: 'Brajkovic',
};

const LOGIN_DATA = {
  email: 'ivan.brajkovic1@icloud.com',
  password: '123456',
};

export const TestButton = () => {
  const authService = useAuthService();

  const handleRegister = () =>
    authService
      .register(REGISTRATION_DATA)
      .then(tapX('registration success'))
      .catch(tapX('registration error'));

  const handleLogin = () =>
    authService
      .login(LOGIN_DATA.email, LOGIN_DATA.password)
      .then(tapX('login success'))
      .catch(tapX('login error'));

  const handleLogout = () =>
    authService
      .logout()
      .then(tapX('logout success'))
      .catch(tapX('logout error'));

  return (
    <Group>
      <Button onClick={handleRegister}>Register</Button>
      <Button onClick={handleLogin}>Login</Button>
      <Button onClick={handleLogout}>Logout</Button>
    </Group>
  );
};
