import { zodResolver } from '@hookform/resolvers/zod';
import { Paper, Button } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { useForm } from 'react-hook-form';

import { FormTextInput } from 'components/FormTextInput';
import { usePasswordResetEmailMutation } from 'features/auth/authApi';
import { ForgotPasswordSchema } from 'features/auth/pages/config';
import { routes } from 'router/routes';
import { navigate } from 'router/utility/navigate';

export type ForgotPasswordFormData = {
  email: string;
};

export const ForgotPasswordForm = () => {
  const [sendPasswordResetEmail, { isLoading }] =
    usePasswordResetEmailMutation();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(ForgotPasswordSchema),
    defaultValues: {
      email: '',
    },
  });

  const onSubmit = async (data: ForgotPasswordFormData) => {
    await sendPasswordResetEmail({ email: data.email })
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
        if (error.code === 'auth/user-not-found') {
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
          error={errors.email?.message}
        />
        <Button type="submit" fullWidth mt="xl" loading={isLoading}>
          Send reset link
        </Button>
      </form>
    </Paper>
  );
};
