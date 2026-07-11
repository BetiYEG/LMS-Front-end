// src/api/courseApi.js
import apiSlice from './baseApi'

export const courseApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCourses: builder.query({
      query: (params) => ({
        url: '/courses',
        params: params,
      }),
      providesTags: ['Course'],
    }),
    getCourseById: builder.query({
      query: (id) => `/courses/${id}`,
      providesTags: (result, error, id) => [{ type: 'Course', id }],
    }),
    getMyCourses: builder.query({
      query: () => '/my-courses',
      providesTags: ['Course'],
    }),
    getCourseAssessment: builder.query({
      query: (id) => `/course-assessment/${id}`,
    }),
    getTopicContent: builder.query({
      query: (id) => `/topic-content/${id}`,
      providesTags: ['Course'],
    }),
    enrollCourse: builder.mutation({
      query: (id) => ({
        url: `/courses/${id}/enroll`,
        method: 'POST',
      }),
      invalidatesTags: ['Course'],
    }),
  }),
})

export const {
  useGetCoursesQuery,
  useGetCourseByIdQuery,
  useGetMyCoursesQuery,
  useGetCourseAssessmentQuery,
  useGetTopicContentQuery,
  useEnrollCourseMutation,
} = courseApi

export default courseApi