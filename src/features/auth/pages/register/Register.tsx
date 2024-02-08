import { Stack, Title, Anchor, Text } from '@mantine/core';

import { RegisterForm } from 'features/auth/pages/register/RegisterForm';
import { navigate } from 'router/utility/navigate';

export const Register = () => {
  const navigateToLogin = () => {
    navigate('/login');
  };

  return (
    <Stack h="100%" justify="center">
      <Title ta="center">Wine Cellar Climate Control</Title>

      <Text ta="center" size="sm" c="dimmed" mt="xs">
        Already have an account?{' '}
        <Anchor component="button" size="sm" onClick={navigateToLogin}>
          Log in
        </Anchor>
      </Text>

      <RegisterForm />
    </Stack>
  );
};
