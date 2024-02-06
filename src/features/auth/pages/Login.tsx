import { Button } from '@mantine/core';
import { useEffect } from 'react';

import { TestButton } from 'components/LoginButton';
import { useLoginMutation } from 'features/auth/authApi';

const LOGIN_DATA = {
  email: 'ivan.brajkovic1@icloud.com',
  password: '123456',
};

export const Login = () => {
  const [
    login,
    {
      isLoading, //
      isError,
      isSuccess,
      isUninitialized,
      data,
    },
  ] = useLoginMutation();

  useEffect(() => {
    console.log({
      isLoading,
      isError,
      isSuccess,
      isUninitialized,
      data,
    });
  });

  return (
    <div>
      Login Page
      <TestButton />
      <br />
      <Button
        loading={isLoading}
        onClick={() =>
          login({
            email: LOGIN_DATA.email,
            password: LOGIN_DATA.password,
          })
        }
      >
        Login
      </Button>
    </div>
  );
};
