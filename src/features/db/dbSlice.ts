import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react';

type Collection = {
  id: string;
  name: string;
};

export const firestoreApi = createApi({
  reducerPath: 'firestoreApi',
  baseQuery: fakeBaseQuery(),
  endpoints: (builder) => ({
    getCollection: builder.query<Collection[], string>({
      query: (collection) => `firestore/${collection}`,
    }),
  }),
});

export const { useGetCollectionQuery } = firestoreApi;
