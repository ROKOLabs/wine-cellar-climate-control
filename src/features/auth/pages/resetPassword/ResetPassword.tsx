import { Stack, Title, Text, Anchor } from '@mantine/core';
import { Link } from 'react-router-dom';

import { ResetPasswordForm } from './ResetPasswordForm';

import { routes } from 'router/routes';

export const ResetPassword = () => {
  return (
    <Stack h="100%" justify="center" align="center">
      <Title ta="center">Wine Cellar Climate Control</Title>

      <Text ta="center" size="sm" c="dimmed" mt="xs">
        Remember password?{' '}
        <Anchor component={Link} to={routes.login} size="sm">
          Log in
        </Anchor>
      </Text>

      <ResetPasswordForm />
    </Stack>
  );
};
