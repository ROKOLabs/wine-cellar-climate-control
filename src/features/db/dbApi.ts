import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react';
import type { Unsubscribe } from 'firebase/firestore';

import {
  DbService,
  GetSettingsArg,
  GetSettingsResponse,
  GetUserDetailsArg,
  GetUserDetailsResponse,
  SensorData,
  SensorDataWithDate,
  SetSettingsArg,
  SetSettingsResponse,
  SetUserDetailsArg,
  SetUserDetailsResponse,
} from 'features/db/DbService';
import { jsonSafeParse } from 'utility/jsonSafeParse';

const formatData = <T>(data: T) => ({ data: jsonSafeParse(data) });
const formatError = <T>(data: T) => ({ error: jsonSafeParse(data) });

const dbTags = {
  UserDetails: 'UserDetails',
  Settings: 'Settings',
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
        queryFn: (queryArg) =>
          DbService.getInstance()
            .setUserDetails(queryArg)
            .then(formatData)
            .catch(formatError),
      },
    ),

    addSensorData: builder.mutation<SensorData, SensorDataWithDate>({
      queryFn: (queryArg) =>
        DbService.getInstance()
          .addSensorData(queryArg)
          .then(formatData)
          .catch(formatError),
    }),

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

    getSettings: builder.query<GetSettingsResponse, GetSettingsArg>({
      providesTags: [dbTags.Settings],
      queryFn: (queryArg) =>
        DbService.getInstance()
          .getSettings(queryArg)
          .then(formatData)
          .catch(formatError),
    }),

    setSettings: builder.mutation<SetSettingsResponse, SetSettingsArg>({
      invalidatesTags: [dbTags.Settings],
      queryFn: (queryArg) =>
        DbService.getInstance()
          .setSettings(queryArg)
          .then(formatData)
          .catch(formatError),
    }),
  }),
});

export const {
  useGetUserDetailsQuery,
  useSetUserDetailsMutation,
  useAddSensorDataMutation,
  useGetSensorDataQuery,
  useGetSettingsQuery,
  useSetSettingsMutation,
} = dbApi;

export const useLazyGetUserDetailsQuerySubscription =
  dbApi.endpoints.getUserDetails.useLazyQuerySubscription;

export const resetDbApiState = dbApi.util.resetApiState;
