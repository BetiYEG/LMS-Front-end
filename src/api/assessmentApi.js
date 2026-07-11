// src/api/assessmentApi.js
import apiSlice from './baseApi'

export const assessmentApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAssessments: builder.query({
      query: (params) => ({
        url: '/assessments',
        params: params,
      }),
      providesTags: ['Assessment'],
    }),
    getAssessment: builder.query({
      query: (id) => `/assessments/${id}`,
      providesTags: ['Assessment'],
    }),
    getAssessmentQuestions: builder.query({
      query: (id) => `/assessment-questions/${id}`,
      providesTags: ['Assessment'],
    }),
    getAssessmentResult: builder.query({
      query: (id) => `/assessment-result/${id}`,
      providesTags: ['Assessment'],
    }),
    getAssessmentStatistics: builder.query({
      query: (id) => `/assessment-statistics/${id}`,
      providesTags: ['Assessment'],
    }),
    submitAssessment: builder.mutation({
      query: ({ id, answers }) => ({
        url: `/assessments/${id}/submit`,
        method: 'POST',
        body: { answers },
      }),
      invalidatesTags: ['Assessment', 'Progress'],
    }),
  }),
})

export const {
  useGetAssessmentsQuery,
  useGetAssessmentQuery,
  useGetAssessmentQuestionsQuery,
  useGetAssessmentResultQuery,
  useGetAssessmentStatisticsQuery,
  useSubmitAssessmentMutation,
} = assessmentApi

export default assessmentApi