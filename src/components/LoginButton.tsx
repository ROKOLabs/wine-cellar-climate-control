import { Button, Group } from '@mantine/core';

import {
  useLoginMutation,
  useLogoutMutation,
  useRegisterMutation,
} from 'features/auth/authApi';
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
  const [register, { isLoading: isRegisterLoading }] = useRegisterMutation();
  const [logout, { isLoading: isLogoutLoading }] = useLogoutMutation();
  const [login, { isLoading: isLoginLoading }] = useLoginMutation();

  const handleRegister = () =>
    register(REGISTRATION_DATA)
      // .then(goToHome)
      .catch(tapX('registration error'));

  const handleLogin = () =>
    login(LOGIN_DATA) //
      // .then(goToHome)
      .catch(tapX('login error'));

  const handleLogout = () =>
    logout() //
      // .then(goToLogin)
      .catch(tapX('logout error'));

  return (
    <Group>
      <Button loading={isRegisterLoading} onClick={handleRegister}>
        Register
      </Button>
      <Button loading={isLoginLoading} onClick={handleLogin}>
        Login
      </Button>
      <Button loading={isLogoutLoading} onClick={handleLogout}>
        Logout
      </Button>
    </Group>
  );
};
