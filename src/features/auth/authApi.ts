import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react';
import type { Unsubscribe, User } from 'firebase/auth';

import { AuthService } from 'features/auth/AuthService';
import { ExtractPromise } from 'types';
import { jsonSafeParse } from 'utility/jsonSafeParse';

export type SendPasswordResetEmailArgs = { email: string };

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

    getAuthState: builder.query<User | null, void>({
      keepUnusedDataFor: 0,
      queryFn: () => ({ data: null }),
      onCacheEntryAdded: async (
        _,
        { updateCachedData, cacheDataLoaded, cacheEntryRemoved },
      ) => {
        let unsubscribe: Unsubscribe | undefined;
        try {
          await cacheDataLoaded;

          unsubscribe = AuthService.getInstance().onAuthStateChanged((user) => {
            updateCachedData(() => jsonSafeParse(user));
          });

          // eslint-disable-next-line no-empty
        } catch {}
        await cacheEntryRemoved;
        unsubscribe?.();
      },
    }),

    passwordResetEmail: builder.mutation<void, SendPasswordResetEmailArgs>({
      queryFn: (queryArg) =>
        AuthService.getInstance()
          .sendPasswordResetEmail(queryArg)
          .then(() => ({ data: undefined }))
          .catch(formatError),
    }),
  }),
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useLogoutMutation,
  useGetAuthStateQuery,
  usePasswordResetEmailMutation,
} = authApi;
