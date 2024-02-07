import { zodResolver } from '@hookform/resolvers/zod';
import { Paper, TextInput, PasswordInput, Button } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';

import { useRegisterMutation } from 'features/auth/authApi';
import { RegisterSchema } from 'features/auth/pages/config';
import { navigate } from 'router/utility/navigate';

interface IRegisterForm {
  email: string;
  password: string;
  confirmPassword: string;
}

export const RegisterForm = () => {
  const [register] = useRegisterMutation();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IRegisterForm>({
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },
    resolver: zodResolver(RegisterSchema),
  });

  const onSubmit: SubmitHandler<IRegisterForm> = async ({
    email,
    password,
  }) => {
    try {
      notifications.clean();
      await register({ email, password }).unwrap();
      notifications.show({
        title: 'Congratulations!',
        message:
          'Your account is all set up and you will now be redirected to the Login page',
        color: 'green',
        withBorder: true,
        withCloseButton: false,
      });
      setTimeout(() => {
        navigate('/login');
      }, 5000);
    } catch (error) {
      console.error('authService.register error...', error);
      notifications.show({
        title: 'Oops!',
        message:
          'It seems something went wrong on our end. Please try again later',
        color: 'red',
        withBorder: true,
        withCloseButton: false,
      });
    }
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
              mt="lg"
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

        <Controller
          name="confirmPassword"
          control={control}
          render={({ field }) => (
            <PasswordInput
              {...field}
              label="Confirm Password"
              mt="lg"
              withAsterisk
              error={errors.confirmPassword?.message}
            />
          )}
        />

        <Button type="submit" fullWidth mt="xl">
          Register
        </Button>
      </Paper>
    </form>
  );
};
