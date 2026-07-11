// src/api/bookletApi.js
import apiSlice from './baseApi'

export const bookletApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getBooklets: builder.query({
      query: (params) => ({
        url: '/booklets',
        params: params,
      }),
      providesTags: ['Booklet'],
    }),
    getBookletById: builder.query({
      query: (id) => `/student/booklets/${id}`,
      providesTags: ['Booklet'],
    }),
    getBookletQuestions: builder.query({
      query: (id) => `/booklet-questions/${id}`,
      providesTags: ['Booklet'],
    }),
    getMockBooklets: builder.query({
      query: () => '/mock-booklets',
      providesTags: ['Booklet'],
    }),
    getMySchedules: builder.query({
      query: () => '/my-schedules',
      providesTags: ['Booklet'],
    }),
  }),
})

export const {
  useGetBookletsQuery,
  useGetBookletByIdQuery,
  useGetBookletQuestionsQuery,
  useGetMockBookletsQuery,
  useGetMySchedulesQuery,
} = bookletApi

export default bookletApi