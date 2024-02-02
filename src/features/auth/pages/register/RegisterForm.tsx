import { Paper, TextInput, PasswordInput, Button } from '@mantine/core';
import { useForm, Controller } from 'react-hook-form';

interface IRegisterForm {
  email: string;
  password: string;
  confirmPassword: string;
}

export const RegisterForm = () => {
  const { control } = useForm<IRegisterForm>({
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  return (
    <form
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
            <TextInput {...field} label="Email" mt="lg" withAsterisk />
          )}
        />

        <Controller
          name="password"
          control={control}
          render={({ field }) => (
            <PasswordInput {...field} label="Password" mt="lg" withAsterisk />
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
