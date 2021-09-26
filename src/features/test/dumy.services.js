import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// Define a service using a base URL and expected endpoints
export const pokemonApi = createApi({
  reducerPath: 'pokemonApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://ticket-scanner.herokuapp.com/api/v1/' }),
  endpoints: (builder) => ({
    getScanlogs: builder.query({
      query: () => `scanlogs/`,
    }),
  }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetScanlogsQuery } = pokemonApi