import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react';
import type { Unsubscribe } from 'firebase/firestore';

import {
  DbService,
  GetUserDetailsArg,
  GetUserDetailsResponse,
  SensorData,
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

    getSensorData: builder.query<SensorData[], void>({
      queryFn: () => ({ data: [] }),
      onCacheEntryAdded: async (
        _,
        { updateCachedData, cacheDataLoaded, cacheEntryRemoved },
      ) => {
        let unsubscribe: Unsubscribe | undefined;
        try {
          await cacheDataLoaded;
          const listener = (data: SensorData) => {
            updateCachedData((draft) => {
              draft.push(data);
            });
          };
          unsubscribe = DbService.getInstance().getSensorData(listener);
          // eslint-disable-next-line no-empty
        } catch {}
        await cacheEntryRemoved;
        unsubscribe?.();
      },
    }),
  }),
});

export const {
  useGetUserDetailsQuery,
  useSetUserDetailsMutation,
  useGetSensorDataQuery,
} = dbApi;

export const useLazyGetUserDetailsQuerySubscription =
  dbApi.endpoints.getUserDetails.useLazyQuerySubscription;

export const resetDbApiState = dbApi.util.resetApiState;
