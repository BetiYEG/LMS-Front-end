import { useDispatch, useSelector } from 'react-redux'
import {
  setCourses,
  setCurrentCourse,
  setEnrolledCourses,
  setLoading,
  setError,
  setFilters,
  setPagination,
  updateCourseProgress,
  clearCourses,
} from '@/store/slices/courseSlice'
import { 
  useGetCoursesQuery, 
  useGetCourseByIdQuery,
  useGetMyCoursesQuery,
  useEnrollCourseMutation 
} from '@/api/courseApi'
import { toast } from 'sonner'

export const useCourses = () => {
  const dispatch = useDispatch()
  const { courses, currentCourse, enrolledCourses, loading, error, filters, pagination } =
    useSelector((state) => state.courses)

  // RTK Query hooks
  const { refetch: refetchCourses } = useGetCoursesQuery(filters)
  const { refetch: refetchCourse } = useGetCourseByIdQuery(currentCourse?.id)
  const { refetch: refetchMyCourses } = useGetMyCoursesQuery()
  const [enrollCourseMutation] = useEnrollCourseMutation()

  const getAllCourses = async (params = {}) => {
    try {
      dispatch(setLoading(true))
      const result = await useGetCoursesQuery({ ...filters, ...params }).refetch()
      if (result.data) {
        dispatch(setCourses(result.data))
        return result.data
      }
    } catch (error) {
      dispatch(setError(error?.message || 'Failed to fetch courses'))
      throw error
    } finally {
      dispatch(setLoading(false))
    }
  }

  const getCourseById = async (id) => {
    try {
      dispatch(setLoading(true))
      const result = await useGetCourseByIdQuery(id).refetch()
      if (result.data) {
        dispatch(setCurrentCourse(result.data))
        return result.data
      }
    } catch (error) {
      dispatch(setError(error?.message || 'Failed to fetch course'))
      throw error
    } finally {
      dispatch(setLoading(false))
    }
  }

  const getMyCourses = async () => {
    try {
      dispatch(setLoading(true))
      const result = await refetchMyCourses()
      if (result.data) {
        dispatch(setEnrolledCourses(result.data))
        return result.data
      }
    } catch (error) {
      dispatch(setError(error?.message || 'Failed to fetch enrolled courses'))
      throw error
    } finally {
      dispatch(setLoading(false))
    }
  }

  const enrollInCourse = async (courseId) => {
    try {
      dispatch(setLoading(true))
      const result = await enrollCourseMutation(courseId).unwrap()
      toast.success('Successfully enrolled!', {
        description: 'You are now enrolled in this course.',
      })
      await getMyCourses()
      return result
    } catch (error) {
      const errorMessage = error?.data?.message || 'Failed to enroll in course'
      toast.error('Enrollment failed', {
        description: errorMessage,
      })
      throw error
    } finally {
      dispatch(setLoading(false))
    }
  }

  const updateProgress = (courseId, progress) => {
    dispatch(updateCourseProgress({ courseId, progress }))
  }

  const applyFilters = (newFilters) => {
    dispatch(setFilters(newFilters))
    getAllCourses(newFilters)
  }

  const updatePagination = (pageData) => {
    dispatch(setPagination(pageData))
  }

  const clearAllCourses = () => {
    dispatch(clearCourses())
  }

  return {
    courses,
    currentCourse,
    enrolledCourses,
    loading,
    error,
    filters,
    pagination,
    getAllCourses,
    getCourseById,
    getMyCourses,
    enrollInCourse,
    updateProgress,
    applyFilters,
    updatePagination,
    clearAllCourses,
    refetchCourses,
    refetchCourse,
    refetchMyCourses,
  }
}

export default useCourses