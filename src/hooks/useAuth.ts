import { useAppSelector, useAppDispatch } from '../store/hooks'
import { logout, setCredentials } from '../store/slices/authSlice'
import { useLoginMutation, useLogoutMutation } from '../api/authApi'

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

interface AuthReturnType {
  user: User | null
  token: string | null
  isAuthenticated: boolean
  isLoading: boolean
  login: (credentials: LoginCredentials) => Promise<any>
  logout: () => Promise<void>
}

export const useAuth = (): AuthReturnType => {
  const dispatch = useAppDispatch()
  const { user, token, isAuthenticated, isLoading } = useAppSelector((state) => state.auth)

  const [loginMutation] = useLoginMutation()
  const [logoutMutation] = useLogoutMutation()

  const login = async (credentials: LoginCredentials) => {
    try {
      console.log('🔑 Calling login mutation with:', credentials)

      const result = await loginMutation(credentials).unwrap()

      console.log('📦 Login result:', result)
      console.log('📦 Token extracted:', result.token)

      if (result.token) {
        // ✅ Store in Redux
        dispatch(setCredentials({
          user: result.user,
          token: result.token,
        }))
        
        // ✅ Store in localStorage (already done in onQueryStarted)
        return result
      } else {
        throw new Error('No token received from server')
      }
    } catch (error: any) {
      console.error('❌ Login mutation error:', error)

      if (error?.data?.errors) {
        const errorMessages = Object.values(error.data.errors).flat().join(', ')
        throw new Error(errorMessages || 'Validation error')
      }

      if (error?.status === 404) {
        throw new Error('Login endpoint not found. Please check the API URL.')
      }

      if (error?.status === 401) {
        throw new Error('Invalid credentials. Please try again.')
      }

      if (error?.status === 'FETCH_ERROR' || error?.error?.includes('NetworkError')) {
        throw new Error('Network error. Please check your connection and try again.')
      }

      throw error
    }
  }

  const logoutUser = async (): Promise<void> => {
    try {
      await logoutMutation().unwrap()
    } catch (error) {
      console.error('Logout error:', error)
    } finally {
      dispatch(logout())
    }
  }

  return {
    user,
    token,
    isAuthenticated,
    isLoading,
    login,
    logout: logoutUser,
  }
}

export default useAuth