// src/api/notificationsApi.js
import apiSlice from './baseApi'

export const notificationsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getMyNotifications: builder.query({
      query: () => '/my-notifications',
      providesTags: ['Notification'],
    }),
    markNotificationRead: builder.mutation({
      query: (id) => ({
        url: `/notifications/${id}/read`,
        method: 'PUT',
      }),
      invalidatesTags: ['Notification'],
    }),
    deleteNotification: builder.mutation({
      query: (id) => ({
        url: `/notifications/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Notification'],
    }),
  }),
})

export const {
  useGetMyNotificationsQuery,
  useMarkNotificationReadMutation,
  useDeleteNotificationMutation,
} = notificationsApi

export default notificationsApi