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
import { jsonSafeParse } from 'utility/jsonSafeParse';

const formatData = <T>(data: T) => ({ data: jsonSafeParse(data) });
const formatError = <T>(data: T) => ({ error: jsonSafeParse(data) });

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
      keepUnusedDataFor: 0,
      queryFn: () => ({ data: [] }),
      onCacheEntryAdded: async (
        _,
        { updateCachedData, cacheDataLoaded, cacheEntryRemoved },
      ) => {
        let unsubscribe: Unsubscribe | undefined;
        try {
          await cacheDataLoaded;

          unsubscribe = DbService.getInstance().getSensorData(
            (data: SensorData) => {
              updateCachedData((draft) => {
                draft.push(data);
              });
            },
          );

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
