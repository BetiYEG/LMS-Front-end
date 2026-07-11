// src/api/lessonApi.js
import apiSlice from './baseApi'

export const lessonApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getLessonContents: builder.query({
      query: (id) => `/lesson-contents/${id}`,
      providesTags: ['Lesson'],
    }),
    getLessonById: builder.query({
      query: (id) => `/lessons/${id}`,
      providesTags: ['Lesson'],
    }),
    saveLessonProgress: builder.mutation({
      query: (data) => ({
        url: '/lesson-progress',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Lesson', 'Progress'],
    }),
    saveVideoAnalytics: builder.mutation({
      query: (data) => ({
        url: '/save-video-analytics',
        method: 'POST',
        body: data,
      }),
    }),
    completeLesson: builder.mutation({
      query: (id) => ({
        url: `/lessons/${id}/complete`,
        method: 'POST',
      }),
      invalidatesTags: ['Lesson', 'Progress'],
    }),
  }),
})

export const {
  useGetLessonContentsQuery,
  useGetLessonByIdQuery,
  useSaveLessonProgressMutation,
  useSaveVideoAnalyticsMutation,
  useCompleteLessonMutation,
} = lessonApi

export default lessonApi