import { Flex, Title, Anchor, Text, Notification } from '@mantine/core';

import { useNotification } from 'features/auth/hooks/useNotification';
import { RegisterForm } from 'features/auth/pages/register/RegisterForm';
import { navigate } from 'router/utility/navigate';

export const Register = () => {
  const {
    notification,
    createSuccessNotification,
    createErrorNotification,
    resetNotification,
  } = useNotification();

  const navigateToLogin = () => {
    navigate('/login');
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
        Already have an account?{' '}
        <Anchor component="button" size="sm" onClick={navigateToLogin}>
          Log in
        </Anchor>
      </Text>

      <RegisterForm
        createSuccessNotification={createSuccessNotification}
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
