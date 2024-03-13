import { zodResolver } from '@hookform/resolvers/zod';
import { Paper, Button } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { useForm } from 'react-hook-form';

import { FormTextInput } from 'components/FormTextInput';
import { useResetPasswordMutation } from 'features/auth/authApi';
import { ResetPasswordSchema } from 'features/auth/pages/validation';
import { routes } from 'router/routes';
import { navigate } from 'router/utility/navigate';

export type ResetPasswordFormData = {
  email: string;
};

export const ResetPasswordForm = () => {
  const [resetPassword, { isLoading }] = useResetPasswordMutation();

  const { control, handleSubmit } = useForm<ResetPasswordFormData>({
    resolver: zodResolver(ResetPasswordSchema),
    defaultValues: {
      email: '',
    },
  });

  const onSubmit = (data: ResetPasswordFormData) => {
    resetPassword({ email: data.email })
      .unwrap()
      .then(() => {
        notifications.show({
          title: 'Success',
          message: 'Please check your email to reset your password.',
          color: 'green',
        });
        navigate(routes.login);
      })
      .catch((error) => {
        let errorMessage = 'An error occurred, please try again.';
        if (error?.code === 'auth/user-not-found') {
          errorMessage =
            'No user found with this email address. Please check and try again.';
        }
        notifications.show({
          title: 'Error',
          message: errorMessage,
          color: 'red',
        });
      });
  };

  return (
    <Paper withBorder shadow="md" p="xl" radius="md" maw={520} w="100%">
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormTextInput
          name="email"
          control={control}
          label="Email"
          withAsterisk
        />
        <Button type="submit" fullWidth mt="xl" loading={isLoading}>
          Send reset link
        </Button>
      </form>
    </Paper>
  );
};
