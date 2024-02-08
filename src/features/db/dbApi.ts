import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react';

import {
  DbService,
  GetUserDetailsArg,
  GetUserDetailsResponse,
  SetUserDetailsArg,
  SetUserDetailsResponse,
} from 'features/db/DbService';
import { isFirebaseError } from 'features/db/guards/guards';

const formatData = <T>(data: T) => ({ data });
const formatError = (error: Error) => {
  if (isFirebaseError(error)) error = JSON.parse(JSON.stringify(error));
  return { error };
};

const dbTags = {
  UserDetails: 'UserDetails',
};

export const dbApi = createApi({
  reducerPath: 'dbApi',
  tagTypes: Object.values(dbTags),
  baseQuery: fakeBaseQuery(),
  endpoints: (builder) => ({
    getUserDetails: builder.query<GetUserDetailsResponse, GetUserDetailsArg>({
      providesTags: [dbTags.UserDetails],
      queryFn: (queryArg) =>
        DbService.getInstance()
          .getUserDetails(queryArg)
          .then(formatData)
          .catch(formatError),
    }),

    setUserDetails: builder.mutation<SetUserDetailsResponse, SetUserDetailsArg>(
      {
        invalidatesTags: [dbTags.UserDetails],
        queryFn: (user) =>
          DbService.getInstance()
            .setUserDetails(user)
            .then(formatData)
            .catch(formatError),
      },
    ),
  }),
});

export const { useGetUserDetailsQuery, useSetUserDetailsMutation } = dbApi;

export const useLazyGetUserDetailsQuerySubscription =
  dbApi.endpoints.getUserDetails.useLazyQuerySubscription;

export const resetDbApiState = dbApi.util.resetApiState;
