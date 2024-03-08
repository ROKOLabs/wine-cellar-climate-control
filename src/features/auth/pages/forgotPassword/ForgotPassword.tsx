import { Stack, Title, Anchor, Text } from '@mantine/core';
import { useNavigate } from 'react-router-dom';

import { ForgotPasswordForm } from './ForgotPasswordForm';

import { routes } from 'router/routes';

export const ForgotPassword = () => {
  const navigate = useNavigate();

  const navigateToLogin = () => {
    navigate(routes.login);
  };

  return (
    <Stack h="100%" justify="center" align="center">
      <Title ta="center">Wine Cellar Climate Control</Title>

      <Text ta="center" size="sm" c="dimmed" mt="xs">
        Remember password?{' '}
        <Anchor component="button" size="sm" onClick={navigateToLogin}>
          Log in
        </Anchor>
      </Text>

      <ForgotPasswordForm />
    </Stack>
  );
};
