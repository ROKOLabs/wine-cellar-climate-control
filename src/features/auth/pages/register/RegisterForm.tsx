import { Paper, TextInput, PasswordInput, Button } from '@mantine/core';

export const RegisterForm = () => {
  return (
    <form
      style={{
        width: '520px',
        maxWidth: '100%',
        margin: '50px auto 0 auto',
      }}
    >
      <Paper withBorder shadow="md" p="xl" radius="md">
        <TextInput type="email" label="Email" required />

        <PasswordInput label="Password" mt="lg" required />

        <PasswordInput label="Confirm Password" mt="lg" required />

        <Button type="submit" fullWidth mt="xl">
          Register
        </Button>
      </Paper>
    </form>
  );
};
