import { zodResolver } from '@hookform/resolvers/zod';
import { Paper, TextInput, PasswordInput, Button } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';

import { useRegisterMutation } from 'features/auth/authApi';
import { RegisterSchema } from 'features/auth/pages/config';
import { useSetUserDetailsMutation } from 'features/db/dbApi';
import { navigate } from 'router/utility/navigate';

interface IRegisterForm {
  name: string;
  lastname: string;
  email: string;
  username: string;
  password: string;
  confirmPassword: string;
}

export const RegisterForm = () => {
  const [register, { isLoading }] = useRegisterMutation();
  const [setUserDetails] = useSetUserDetailsMutation();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IRegisterForm>({
    defaultValues: {
      name: '',
      lastname: '',
      email: '',
      username: '',
      password: '',
      confirmPassword: '',
    },
    resolver: zodResolver(RegisterSchema),
  });

  const onSubmit: SubmitHandler<IRegisterForm> = async ({
    name,
    lastname,
    email,
    username,
    password,
  }) => {
    try {
      notifications.clean();
      const { user } = await register({ email, password }).unwrap();
      await setUserDetails({
        uid: user.uid,
        name,
        lastname,
        username,
      }).unwrap();
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
          name="name"
          control={control}
          render={({ field }) => (
            <TextInput
              {...field}
              label="First name"
              mt="lg"
              withAsterisk
              error={errors.name?.message}
            />
          )}
        />

        <Controller
          name="lastname"
          control={control}
          render={({ field }) => (
            <TextInput
              {...field}
              label="Last name"
              mt="lg"
              withAsterisk
              error={errors.lastname?.message}
            />
          )}
        />

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
          name="username"
          control={control}
          render={({ field }) => (
            <TextInput
              {...field}
              label="Username"
              mt="lg"
              withAsterisk
              error={errors.username?.message}
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

        <Button type="submit" fullWidth mt="xl" loading={isLoading}>
          Register
        </Button>
      </Paper>
    </form>
  );
};
