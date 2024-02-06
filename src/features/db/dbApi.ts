import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react';

import { DbService } from 'features/db/DbService';

type User = {
  email: string;
  lastname: string;
  name: string;
  username: string;
};

type GetUserDetailsResponse = User | undefined;
type GetUserDetailsArg = string;

const formatData = <T>(data: T) => ({ data });
const formatError = (error: Error) => ({ error });

export const dbApi = createApi({
  reducerPath: 'dbApi',
  tagTypes: ['UserDetails'],
  baseQuery: fakeBaseQuery(),
  endpoints: (builder) => ({
    getUserDetails: builder.query<GetUserDetailsResponse, GetUserDetailsArg>({
      providesTags: ['UserDetails'],
      queryFn: (queryArg) =>
        DbService.getInstance()
          .getUserDetails(queryArg)
          .then(formatData)
          .catch(formatError),
    }),
  }),
});

export const { useGetUserDetailsQuery } = dbApi;

export const useLazyGetUserDetailsQuerySubscription =
  dbApi.endpoints.getUserDetails.useLazyQuerySubscription;

export const resetDbApiState = dbApi.util.resetApiState;
