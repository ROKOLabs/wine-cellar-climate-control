import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react';

import { AuthService } from 'features/auth/service/AuthService';

type RegisterResponserResponse = ReturnType<AuthService['register']>;
type RegisterResponseArg = Parameters<AuthService['register']>[0];

type LoginResponse = {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
};
type LoginResponseArg = Parameters<AuthService['login']>[0];

const formatData = <T>(data: T) => ({ data });
const formatError = (error: Error) => ({ error });

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fakeBaseQuery(),
  endpoints: (builder) => ({
    register: builder.mutation<RegisterResponserResponse, RegisterResponseArg>({
      query: (queryArg) =>
        AuthService.getInstance()
          .register(queryArg)
          .then(formatData)
          .catch(formatError),
    }),

    login: builder.mutation<LoginResponse, LoginResponseArg>({
      queryFn: (queryArg) =>
        AuthService.getInstance()
          .login(queryArg)
          .then(({ user }) => ({
            data: {
              uid: user.uid,
              email: user.email,
              displayName: user.displayName,
              photoURL: user.photoURL,
            },
          }))
          .catch(formatError),
    }),

    logout: builder.mutation<void, void>({
      queryFn: () =>
        AuthService.getInstance() //
          .logout()
          .then(formatData)
          .catch(formatError),
    }),
  }),
});

export const { useRegisterMutation, useLoginMutation, useLogoutMutation } =
  authApi;
