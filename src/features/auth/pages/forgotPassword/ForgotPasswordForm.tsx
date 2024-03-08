import { Paper, TextInput, Button } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';

import { AuthService } from 'features/auth/AuthService';

type ForgotPasswordFormData = {
  email: string;
};

export const ForgotPasswordForm = () => {
  const { control, handleSubmit } = useForm<ForgotPasswordFormData>({
    defaultValues: {
      email: '',
    },
  });
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (data: ForgotPasswordFormData) => {
    setIsLoading(true);
    const authService = AuthService.getInstance();
    authService
      .sendPasswordResetEmail({ email: data.email })
      .then(() => {
        notifications.show({
          title: 'Success',
          message: 'Please check your email to reset your password.',
          color: 'green',
        });
      })
      .catch((error) => {
        notifications.show({
          title: 'Error',
          message: error.message,
          color: 'red',
        });
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <Paper withBorder shadow="md" p="xl" radius="md" maw={520} w="100%">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <TextInput {...field} label="Email" withAsterisk />
          )}
        />
        <Button type="submit" fullWidth mt="xl" loading={isLoading}>
          Send reset link
        </Button>
      </form>
    </Paper>
  );
};
