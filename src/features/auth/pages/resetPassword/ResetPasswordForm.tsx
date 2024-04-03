import { zodResolver } from '@hookform/resolvers/zod';
import { Paper, Button } from '@mantine/core';
import { useForm } from 'react-hook-form';

import { FormDevTools } from 'components/FormDevTools';
import { FormTextInput } from 'components/FormTextInput';
import { useResetPasswordMutation } from 'features/auth/authApi';
import { ResetPasswordSchema } from 'features/auth/pages/validation';
import { routes } from 'router/routes';
import { navigate } from 'router/utility/navigate';
import {
  errorNotification,
  successNotification,
} from 'utility/notificationUtils';

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
        successNotification({
          title: 'Reset Password',
          message: 'Please check your email to reset your password.',
        });
        navigate(routes.login);
      })
      .catch((error) => {
        const message =
          error?.code === 'auth/user-not-found'
            ? 'No user found with this email address. Please check and try again.'
            : 'An error occurred, please try again.';

        errorNotification({ title: 'Reset Password Error', message });
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
      <FormDevTools control={control} />
    </Paper>
  );
};
