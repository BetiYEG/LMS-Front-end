import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  courses: [],
  currentCourse: null,
  enrolledCourses: [],
  loading: false,
  error: null,
  filters: {
    search: '',
    level: 'all',
    category: 'all',
    sortBy: 'newest',
  },
  pagination: {
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0,
  },
}

const courseSlice = createSlice({
  name: 'courses',
  initialState,
  reducers: {
    setCourses: (state, action) => {
      state.courses = action.payload
      state.loading = false
      state.error = null
    },
    setCurrentCourse: (state, action) => {
      state.currentCourse = action.payload
      state.loading = false
      state.error = null
    },
    setEnrolledCourses: (state, action) => {
      state.enrolledCourses = action.payload
      state.loading = false
    },
    setLoading: (state, action) => {
      state.loading = action.payload
    },
    setError: (state, action) => {
      state.error = action.payload
      state.loading = false
    },
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload }
    },
    setPagination: (state, action) => {
      state.pagination = { ...state.pagination, ...action.payload }
    },
    updateCourseProgress: (state, action) => {
      const { courseId, progress } = action.payload
      const course = state.courses.find(c => c.id === courseId)
      if (course) {
        course.progress = progress
      }
      if (state.currentCourse?.id === courseId) {
        state.currentCourse.progress = progress
      }
    },
    clearCourses: (state) => {
      state.courses = []
      state.currentCourse = null
      state.loading = false
      state.error = null
    },
  },
})

export const {
  setCourses,
  setCurrentCourse,
  setEnrolledCourses,
  setLoading,
  setError,
  setFilters,
  setPagination,
  updateCourseProgress,
  clearCourses,
} = courseSlice.actions

export default courseSlice.reducer