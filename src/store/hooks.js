import { useDispatch, useSelector } from 'react-redux'

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch()
export const useAppSelector = useSelector

// Custom hooks for specific state slices
export const useAuth = () => {
  const { user, token, isAuthenticated, isLoading } = useAppSelector(
    (state) => state.auth
  )
  return { user, token, isAuthenticated, isLoading }
}

export const useCourses = () => {
  const { courses, currentCourse, loading, error } = useAppSelector(
    (state) => state.courses
  )
  return { courses, currentCourse, loading, error }
}

export const useLessons = () => {
  const { lessons, currentLesson, loading, error } = useAppSelector(
    (state) => state.lessons
  )
  return { lessons, currentLesson, loading, error }
}

export const useProgress = () => {
  const { progress, achievements, loading, error } = useAppSelector(
    (state) => state.progress
  )
  return { progress, achievements, loading, error }
}

export const useUI = () => {
  const { theme, sidebarOpen, notifications, loading, modals } = useAppSelector(
    (state) => state.ui
  )
  return { theme, sidebarOpen, notifications, loading, modals }
}