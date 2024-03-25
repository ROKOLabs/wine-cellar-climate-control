import { Stack, Title, Anchor, Text } from '@mantine/core';
import { Link } from 'react-router-dom';

import { LoginForm } from 'features/auth/pages/login/LoginForm';
import { routes } from 'router/routes';

export const Login = () => {
  return (
    <Stack h="100%" justify="center" align="center">
      <Title ta="center">Wine Cellar Climate Control</Title>

      <Text ta="center" size="sm" c="dimmed" mt="xs">
        Don&apos;t have an account?{' '}
        <Anchor component={Link} to={routes.register} size="sm">
          Register
        </Anchor>
      </Text>

      <LoginForm />
      <Text ta="center" size="sm" c="dimmed" mt="xs">
        Forgot your password?{' '}
        <Anchor component={Link} to={routes.resetPassword} size="sm">
          Reset it
        </Anchor>
      </Text>
    </Stack>
  );
};
