import { Stack, Title, Anchor, Text } from '@mantine/core';
import { useNavigate } from 'react-router-dom';

import { LoginForm } from 'features/auth/pages/login/LoginForm';
import { routes } from 'router/routes';

export const Login = () => {
  const navigate = useNavigate();

  const navigateToRegister = () => {
    navigate(routes.register);
  };

  const navigateToForgotPassword = () => {
    navigate(routes.forgotPassword);
  };

  return (
    <Stack h="100%" justify="center" align="center">
      <Title ta="center">Wine Cellar Climate Control</Title>

      <Text ta="center" size="sm" c="dimmed" mt="xs">
        Don&apos;t have an account?{' '}
        <Anchor component="button" size="sm" onClick={navigateToRegister}>
          Register
        </Anchor>
      </Text>

      <LoginForm />
      <Text ta="center" size="sm" c="dimmed" mt="xs">
        Forgot your password?{' '}
        <Anchor component="button" size="sm" onClick={navigateToForgotPassword}>
          Reset it
        </Anchor>
      </Text>
    </Stack>
  );
};
