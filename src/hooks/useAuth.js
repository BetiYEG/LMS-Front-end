import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { 
  setCredentials, 
  setLoading, 
  setError, 
  logout,
  updateProfile,
  clearError 
} from '@/store/slices/authSlice'
import { useLoginMutation, useRegisterMutation, useLogoutMutation } from '@/api/authApi'
import { toast } from 'sonner'

export const useAuth = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { user, token, isAuthenticated, isLoading, error } = useSelector(
    (state) => state.auth
  )
  
  const [loginMutation] = useLoginMutation()
  const [registerMutation] = useRegisterMutation()
  const [logoutMutation] = useLogoutMutation()

  const login = async (credentials) => {
    try {
      dispatch(setLoading(true))
      const result = await loginMutation(credentials).unwrap()
      dispatch(setCredentials(result))
      toast.success('Login successful!', {
        description: `Welcome back, ${result.user?.name || 'User'}!`,
      })
      return result
    } catch (error) {
      const errorMessage = error?.data?.message || 'Login failed. Please try again.'
      dispatch(setError(errorMessage))
      toast.error('Login failed', {
        description: errorMessage,
      })
      throw error
    } finally {
      dispatch(setLoading(false))
    }
  }

  const register = async (userData) => {
    try {
      dispatch(setLoading(true))
      const result = await registerMutation(userData).unwrap()
      toast.success('Registration successful!', {
        description: 'You can now login with your credentials.',
      })
      navigate('/login')
      return result
    } catch (error) {
      const errorMessage = error?.data?.message || 'Registration failed. Please try again.'
      dispatch(setError(errorMessage))
      toast.error('Registration failed', {
        description: errorMessage,
      })
      throw error
    } finally {
      dispatch(setLoading(false))
    }
  }

  const logout = async () => {
    try {
      await logoutMutation().unwrap()
    } catch (error) {
      console.error('Logout error:', error)
    } finally {
      dispatch(logout())
      toast.info('Logged out successfully')
      navigate('/login')
    }
  }

  const updateUserProfile = async (data) => {
    try {
      dispatch(setLoading(true))
      // Call API to update profile
      // const result = await updateProfileMutation(data).unwrap()
      dispatch(updateProfile(data))
      toast.success('Profile updated successfully!')
      return data
    } catch (error) {
      const errorMessage = error?.data?.message || 'Failed to update profile.'
      toast.error('Update failed', {
        description: errorMessage,
      })
      throw error
    } finally {
      dispatch(setLoading(false))
    }
  }

  const clearAuthError = () => {
    dispatch(clearError())
  }

  return {
    user,
    token,
    isAuthenticated,
    isLoading,
    error,
    login,
    register,
    logout,
    updateUserProfile,
    clearAuthError,
  }
}

export default useAuth