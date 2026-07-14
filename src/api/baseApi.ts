import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// ✅ Set baseUrl to '/api' for proxy
const BASE_URL = '/api'

export const baseApi = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem('token')
      if (token) {
        headers.set('Authorization', `Bearer ${token}`)
      }
      headers.set('Content-Type', 'application/json')
      return headers
    },
  }),
  tagTypes: ['User', 'Courses', 'Booklets', 'Progress', 'Notifications'],
  endpoints: () => ({}),
})

export default baseApi