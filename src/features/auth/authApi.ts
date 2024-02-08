import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react';

import { isFirebaseError } from 'features/auth/guards/guards';
import { AuthService } from 'features/auth/service/AuthService';
import { ExtractPromise } from 'types';

type RegisterArg = Parameters<AuthService['register']>[0];
type RegisterResponse = ExtractPromise<ReturnType<AuthService['register']>>;

type LoginArg = Parameters<AuthService['login']>[0];
type LoginResponse = Pick<
  ExtractPromise<ReturnType<AuthService['login']>>['user'],
  'uid' | 'email' | 'displayName' | 'photoURL'
>;

type LogOutArg = Parameters<AuthService['logout']>;
type LogOutResponse = ExtractPromise<ReturnType<AuthService['logout']>>;

const formatData = <T>(data: T) => ({ data });
const formatError = (error: Error) => {
  if (isFirebaseError(error)) error = JSON.parse(JSON.stringify(error));
  return { error };
};

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fakeBaseQuery(),
  endpoints: (builder) => ({
    register: builder.mutation<RegisterResponse, RegisterArg>({
      queryFn: (queryArg) =>
        AuthService.getInstance()
          .register(queryArg)
          .then(formatData)
          .catch(formatError),
    }),

    login: builder.mutation<LoginResponse, LoginArg>({
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

    logout: builder.mutation<LogOutResponse, LogOutArg>({
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
