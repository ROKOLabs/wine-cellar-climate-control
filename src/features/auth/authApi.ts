import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react';

import { AuthService } from 'features/auth/AuthService';
import { ExtractPromise } from 'types';
import { jsonSafeParse } from 'utility/jsonSafeParse';

type RegisterArg = Parameters<AuthService['register']>[0];
type RegisterResponse = ExtractPromise<ReturnType<AuthService['register']>>;

type LoginArg = Parameters<AuthService['login']>[0];
type LoginResponse = Pick<
  ExtractPromise<ReturnType<AuthService['login']>>['user'],
  'uid' | 'email' | 'displayName' | 'photoURL'
>;

const formatData = <T>(data: T) => ({ data: jsonSafeParse(data) });
const formatError = <T>(data: T) => ({ error: jsonSafeParse(data) });

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
