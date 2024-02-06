import { Button, Group } from '@mantine/core';
import { useNavigate } from 'react-router';

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
  const navigate = useNavigate();

  const goToHome = () => navigate('/home');
  const goToLogin = () => navigate('/login');

  const handleRegister = () =>
    authService
      .register(REGISTRATION_DATA)
      .then(goToHome)
      .catch(tapX('registration error'));

  const handleLogin = () =>
    authService
      .login({
        email: LOGIN_DATA.email,
        password: LOGIN_DATA.password,
      })
      .then(goToHome)
      .catch(tapX('login error'));

  const handleLogout = () =>
    authService.logout().then(goToLogin).catch(tapX('logout error'));

  return (
    <Group>
      <Button onClick={handleRegister}>Register</Button>
      <Button onClick={handleLogin}>Login</Button>
      <Button onClick={handleLogout}>Logout</Button>
    </Group>
  );
};
