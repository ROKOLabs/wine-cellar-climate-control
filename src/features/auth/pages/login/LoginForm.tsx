import { zodResolver } from '@hookform/resolvers/zod';
import { Paper, TextInput, PasswordInput, Button } from '@mantine/core';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { useLoginMutation } from 'features/auth/authApi';
import { LoginSchema } from 'features/auth/pages/validation';
import { routes } from 'router/routes';
import { errorNotification } from 'utility/notificationUtils';

interface ILoginForm {
  email: string;
  password: string;
}

export const LoginForm = () => {
  const navigate = useNavigate();

  const [login, { isLoading }] = useLoginMutation();

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

  const onSubmit: SubmitHandler<ILoginForm> = (props) => {
    login(props)
      .unwrap()
      .then(() => {
        navigate(routes.dashboard);
      })
      .catch((error) => {
        const message =
          error.code === 'auth/user-not-found'
            ? "User not found. Please check your credentials or sign up if you're a new user."
            : error.code === 'auth/wrong-password'
              ? 'Incorrect username or password. Please try again.'
              : 'It seems something went wrong on our end. Please try again later';

        errorNotification({ title: 'Login Error', message });
      });
  };

  return (
    <Paper withBorder shadow="md" p="xl" radius="md" maw={520} w="100%">
      <form onSubmit={handleSubmit(onSubmit)}>
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

        <Button type="submit" fullWidth mt="xl" loading={isLoading}>
          Login
        </Button>
      </form>
    </Paper>
  );
};
