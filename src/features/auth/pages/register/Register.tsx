import { Flex, Title, Anchor, Text } from '@mantine/core';

import { RegisterForm } from 'features/auth/pages/register/RegisterForm';

export const Register = () => {
  return (
    <Flex
      mih="100vh"
      direction="column"
      justify="center"
      maw="90%"
      mx="auto"
      py="lg"
    >
      <Title ta="center">Wine Cellar Climate Control</Title>

      <Text ta="center" size="sm" c="dimmed" mt="xs">
        Already have an account?{' '}
        <Anchor component="button" size="sm">
          Log in
        </Anchor>
      </Text>

      <RegisterForm />
    </Flex>
  );
};
