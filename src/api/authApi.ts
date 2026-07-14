import baseApi from './baseApi'

export interface User {
  id: string
  name: string
  email: string
  role?: 'student' | 'parent' | 'admin' | 'instructor'
  avatar?: string
  phone?: string
}

export interface LoginCredentials {
  user_name: string
  password: string
}

export interface RegisterData {
  name: string
  email: string
  password: string
  password_confirmation?: string
}

export interface AuthResponse {
  success: boolean
  user: User
  token: string
  message?: string
}

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<AuthResponse, LoginCredentials>({
      query: (credentials) => ({
        url: '/login',
        method: 'POST',
        body: credentials,
      }),
      // ✅ Transform response to extract token properly
      transformResponse: (response: any): AuthResponse => {
        console.log('📦 Raw login response:', response)
        
        // ✅ Handle nested token structure
        let token = ''
        if (response.token) {
          if (typeof response.token === 'object') {
            // If token is an object, try to extract access_token
            token = response.token.access_token || response.token.token || JSON.stringify(response.token)
          } else if (typeof response.token === 'string') {
            token = response.token
          }
        }
        
        // ✅ Handle user data
        let user = response.user
        if (!user && response.data?.user) {
          user = response.data.user
        }
        
        return {
          success: response.success || true,
          user: user,
          token: token,
          message: response.message,
        }
      },
      onQueryStarted: async (_, { queryFulfilled }) => {
        try {
          const { data } = await queryFulfilled
          console.log('✅ Login successful, storing token:', data.token)
          if (data.token) {
            localStorage.setItem('token', data.token)
          }
          if (data.user) {
            localStorage.setItem('user', JSON.stringify(data.user))
          }
        } catch (error) {
          console.error('Login failed:', error)
        }
      },
    }),

    register: builder.mutation<AuthResponse, RegisterData>({
      query: (userData) => ({
        url: '/register',
        method: 'POST',
        body: userData,
      }),
    }),

    logout: builder.mutation<void, void>({
      query: () => ({
        url: '/logout',
        method: 'POST',
      }),
      onQueryStarted: async (_, { queryFulfilled }) => {
        try {
          await queryFulfilled
        } catch (error) {
          console.error('Logout failed:', error)
        } finally {
          localStorage.removeItem('token')
          localStorage.removeItem('user')
        }
      },
    }),

    getProfile: builder.query<User, void>({
      query: () => ({
        url: '/profile',
        method: 'GET',
      }),
      providesTags: ['User'],
    }),
  }),
})

export const {
  useLoginMutation,
  useRegisterMutation,
  useLogoutMutation,
  useGetProfileQuery,
  useLazyGetProfileQuery,
} = authApi

export default authApi