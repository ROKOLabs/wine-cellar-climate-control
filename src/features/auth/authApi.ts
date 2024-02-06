import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react';

import { AuthService } from 'features/auth/service/AuthService';
import { ExtractPromise } from 'types';

type RegisterResponserResponse = ReturnType<AuthService['register']>;
type RegisterResponseArg = Parameters<AuthService['register']>[0];

type LoginResponse = ExtractPromise<ReturnType<AuthService['login']>>;
type LoginResponseArg = Parameters<AuthService['login']>[0];

const formatData = <T>(data: T) => ({ data });
const formatError = (error: Error) => ({ error });

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fakeBaseQuery(),
  endpoints: (builder) => ({
    register: builder.query<RegisterResponserResponse, RegisterResponseArg>({
      query: (queryArg) =>
        AuthService.getInstance()
          .register(queryArg)
          .then(formatData)
          .catch(formatError),
    }),

    login: builder.query<LoginResponse, LoginResponseArg>({
      queryFn: (queryArg) =>
        AuthService.getInstance()
          .login(queryArg)
          .then(formatData)
          .catch(formatError),
    }),

    logout: builder.query<void, void>({
      queryFn: () =>
        AuthService.getInstance().logout().then(formatData).catch(formatError),
    }),
  }),
});

export const { useLazyRegisterQuery, useLazyLoginQuery, useLazyLogoutQuery } =
  authApi;
