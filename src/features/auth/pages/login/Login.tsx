import { Flex, Title, Anchor, Text, Notification } from '@mantine/core';

import { useNotification } from 'features/auth/hooks/useNotification';
import { LoginForm } from 'features/auth/pages/login/LoginForm';
import { navigate } from 'router/utility/navigate';

export const Login = () => {
  const { notification, createErrorNotification, resetNotification } =
    useNotification();

  const navigateToRegister = () => {
    navigate('/register');
  };

  return (
    <Flex
      mih="100vh"
      direction="column"
      justify="center"
      align="center"
      maw="90%"
      mx="auto"
      py="lg"
    >
      <Title ta="center">Wine Cellar Climate Control</Title>

      <Text ta="center" size="sm" c="dimmed" mt="xs">
        Don&apos;t have an account?{' '}
        <Anchor component="button" size="sm" onClick={navigateToRegister}>
          Register
        </Anchor>
      </Text>

      <LoginForm
        createErrorNotification={createErrorNotification}
        resetNotification={resetNotification}
      />

      {notification.type && (
        <Notification
          title={notification.title}
          color={notification.color}
          withBorder
          withCloseButton={false}
          mt="xl"
        >
          {notification.msg}
        </Notification>
      )}
    </Flex>
  );
};
