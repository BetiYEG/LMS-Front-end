// src/store/slices/authSlice.js
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  user: null,
  token: localStorage.getItem('token') || null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      console.log('🟢 authSlice setCredentials called with:', action.payload)
      const { user, token } = action.payload
      state.user = user
      state.token = token
      state.isAuthenticated = true
      state.isLoading = false
      state.error = null
      if (token) {
        localStorage.setItem('token', token)
        console.log('🟢 Token saved to localStorage')
      }
      console.log('🟢 Auth state updated:', state)
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload
    },
    setError: (state, action) => {
      state.error = action.payload
      state.isLoading = false
    },
    logout: (state) => {
      state.user = null
      state.token = null
      state.isAuthenticated = false
      state.isLoading = false
      state.error = null
      localStorage.removeItem('token')
      console.log('🔴 User logged out')
    },
    updateProfile: (state, action) => {
      state.user = { ...state.user, ...action.payload }
    },
    clearError: (state) => {
      state.error = null
    },
  },
})

export const {
  setCredentials,
  setLoading,
  setError,
  logout,
  updateProfile,
  clearError,
} = authSlice.actions

export default authSlice.reducer