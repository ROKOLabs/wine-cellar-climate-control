import { Box, Button, Group, Stack, Text } from '@mantine/core';

import {
  useLoginMutation,
  useLogoutMutation,
  useRegisterMutation,
} from 'features/auth/authApi';
import { useAddSensorDataMutation } from 'features/db/dbApi';
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

const randomNum = (n: number) => Math.floor(Math.random() * n);

const DevTools = () => {
  const [register, { isLoading: isRegisterLoading }] = useRegisterMutation();
  const [logout, { isLoading: isLogoutLoading }] = useLogoutMutation();
  const [login, { isLoading: isLoginLoading }] = useLoginMutation();
  const [addDataMutation, { isLoading: isAddDataLoading }] =
    useAddSensorDataMutation();

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

  const addData = () =>
    addDataMutation({
      arduino: 0,
      co2: randomNum(20),
      date: new Date(),
      humidity: randomNum(100),
      temperature: randomNum(50),
    }).catch(tapX('add data error'));

  return (
    <Box
      style={{
        zIndex: 9999,
        position: 'fixed',
        padding: 16,
        right: 32,
        bottom: 32,
        border: 'solid 1px red',
        borderRadius: 8,
        background: 'rgba(0, 0, 0, 0.6)',
      }}
    >
      <Stack align="flex-start">
        <Text>Developer Tools</Text>
        <Group>
          <Button
            size="compact-sm"
            loading={isRegisterLoading}
            onClick={handleRegister}
          >
            Register
          </Button>
          <Button
            size="compact-sm"
            loading={isLoginLoading}
            onClick={handleLogin}
          >
            Login
          </Button>
          <Button
            size="compact-sm"
            loading={isLogoutLoading}
            onClick={handleLogout}
          >
            Logout
          </Button>
        </Group>
        <Button size="compact-sm" loading={isAddDataLoading} onClick={addData}>
          Add Sensor Data
        </Button>
      </Stack>
    </Box>
  );
};

// eslint-disable-next-line import/no-default-export
export default DevTools;
