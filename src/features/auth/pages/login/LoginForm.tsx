import { zodResolver } from '@hookform/resolvers/zod';
import { Paper, TextInput, PasswordInput, Button } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { FirebaseError } from 'firebase/app';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';

import { useLoginMutation } from 'features/auth/authApi';
import { LoginSchema } from 'features/auth/pages/config';
import { navigate } from 'router/utility/navigate';

interface ILoginForm {
  email: string;
  password: string;
}

export const LoginForm = () => {
  const [login] = useLoginMutation();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ILoginForm>({
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: zodResolver(LoginSchema),
  });

  const onSubmit: SubmitHandler<ILoginForm> = async ({ email, password }) => {
    try {
      notifications.clean();
      await login({ email, password }).unwrap();
      navigate('/');
    } catch (error) {
      handleErrors(error);
    }
  };

  const handleErrors = (error: unknown) => {
    console.error('authService.login error...', error);
    let err =
      'It seems something went wrong on our end. Please try again later';
    if (error instanceof FirebaseError) {
      if (
        error.code === 'auth/user-not-found' ||
        error.code === 'auth/wrong-password'
      ) {
        err =
          "User not found. Please check your credentials or sign up if you're new";
      }
    }
    notifications.show({
      title: 'Oops!',
      message: err,
      color: 'red',
      withBorder: true,
      withCloseButton: false,
    });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      style={{
        width: '520px',
        maxWidth: '100%',
        margin: '50px auto 0 auto',
      }}
    >
      <Paper withBorder shadow="md" p="xl" radius="md">
        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <TextInput
              {...field}
              label="Email"
              withAsterisk
              error={errors.email?.message}
            />
          )}
        />

        <Controller
          name="password"
          control={control}
          render={({ field }) => (
            <PasswordInput
              {...field}
              label="Password"
              mt="lg"
              withAsterisk
              error={errors.password?.message}
            />
          )}
        />

        <Button type="submit" fullWidth mt="xl">
          Login
        </Button>
      </Paper>
    </form>
  );
};
