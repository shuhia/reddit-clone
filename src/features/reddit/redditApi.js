import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const BASE_URI = "https://www.reddit.com/r/";

// Define a service using a base URL and expected endpoints
export const redditApi = createApi({
  reducerPath: "redditApi",
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URI }),
  endpoints: (builder) => ({
    getPost: builder.query({
      query: (name) => `${name}.json`,
    }),
    getSubbReddits: builder.query({
      query: () => `subreddits.json`,
    }),
    getPostComments: builder.query({
      query: (permalink) => `${permalink}/.json`,
    }),
    search: builder.query({
      query: (term, limit, sortBy) =>
        `/search.json?q=${term}&sort=${sortBy}&limit=${limit}&sort=${sortBy}`,
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useGetPostQuery,
  useGetSubbRedditsQuery,
  useGetPostCommentsQuery,
  useSearchQuery,
} = redditApi;
