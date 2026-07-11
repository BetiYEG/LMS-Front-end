import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  theme: localStorage.getItem('theme') || 'light',
  sidebarOpen: true,
  notifications: [],
  loading: false,
  modals: {
    isOpen: false,
    type: null,
    data: null,
  },
  toast: {
    show: false,
    message: '',
    type: 'info',
  },
  searchQuery: '',
  filters: {},
  viewMode: 'grid',
}

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.theme = state.theme === 'light' ? 'dark' : 'light'
      localStorage.setItem('theme', state.theme)
    },
    setTheme: (state, action) => {
      state.theme = action.payload
      localStorage.setItem('theme', action.payload)
    },
    toggleSidebar: (state) => {
      state.sidebarOpen = !state.sidebarOpen
    },
    setSidebarOpen: (state, action) => {
      state.sidebarOpen = action.payload
    },
    addNotification: (state, action) => {
      state.notifications.unshift({
        id: Date.now(),
        read: false,
        ...action.payload,
      })
    },
    markNotificationRead: (state, action) => {
      const notification = state.notifications.find(n => n.id === action.payload)
      if (notification) {
        notification.read = true
      }
    },
    markAllNotificationsRead: (state) => {
      state.notifications.forEach(n => n.read = true)
    },
    clearNotifications: (state) => {
      state.notifications = []
    },
    removeNotification: (state, action) => {
      state.notifications = state.notifications.filter(n => n.id !== action.payload)
    },
    setLoading: (state, action) => {
      state.loading = action.payload
    },
    openModal: (state, action) => {
      state.modals.isOpen = true
      state.modals.type = action.payload.type
      state.modals.data = action.payload.data || null
    },
    closeModal: (state) => {
      state.modals.isOpen = false
      state.modals.type = null
      state.modals.data = null
    },
    showToast: (state, action) => {
      state.toast.show = true
      state.toast.message = action.payload.message
      state.toast.type = action.payload.type || 'info'
    },
    hideToast: (state) => {
      state.toast.show = false
      state.toast.message = ''
      state.toast.type = 'info'
    },
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload
    },
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload }
    },
    clearFilters: (state) => {
      state.filters = {}
    },
    setViewMode: (state, action) => {
      state.viewMode = action.payload
    },
    toggleViewMode: (state) => {
      state.viewMode = state.viewMode === 'grid' ? 'list' : 'grid'
    },
  },
})

export const {
  toggleTheme,
  setTheme,
  toggleSidebar,
  setSidebarOpen,
  addNotification,
  markNotificationRead,
  markAllNotificationsRead,
  clearNotifications,
  removeNotification,
  setLoading,
  openModal,
  closeModal,
  showToast,
  hideToast,
  setSearchQuery,
  setFilters,
  clearFilters,
  setViewMode,
  toggleViewMode,
} = uiSlice.actions

export default uiSlice.reducer