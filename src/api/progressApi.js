// src/api/progressApi.js
import apiSlice from './baseApi'

export const progressApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getMyProgress: builder.query({
      query: () => '/my-progress',
      providesTags: ['Progress'],
    }),
    getAchievements: builder.query({
      query: () => '/achievements',
      providesTags: ['Progress'],
    }),
    getCourseProgress: builder.query({
      query: (id) => `/courses/${id}/progress`,
      providesTags: ['Progress'],
    }),
    updateProgress: builder.mutation({
      query: (data) => ({
        url: '/progress',
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['Progress'],
    }),
  }),
})

export const {
  useGetMyProgressQuery,
  useGetAchievementsQuery,
  useGetCourseProgressQuery,
  useUpdateProgressMutation,
} = progressApi

export default progressApi