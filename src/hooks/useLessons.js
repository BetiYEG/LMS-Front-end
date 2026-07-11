import { useDispatch, useSelector } from 'react-redux'
import {
  setLessons,
  setCurrentLesson,
  setModuleLessons,
  setCompletedLessons,
  setLoading,
  setError,
  setCurrentModule,
  markLessonComplete,
  setQuizResults,
  clearLessonState,
} from '@/store/slices/lessonSlice'
import {
  useGetLessonContentsQuery,
  useGetLessonByIdQuery,
  useSaveLessonProgressMutation,
  useCompleteLessonMutation,
} from '@/api/lessonApi'
import { toast } from 'sonner'

export const useLessons = () => {
  const dispatch = useDispatch()
  const { lessons, currentLesson, moduleLessons, completedLessons, loading, error, currentModule, quizResults } =
    useSelector((state) => state.lessons)

  // RTK Query hooks
  const [saveProgressMutation] = useSaveLessonProgressMutation()
  const [completeLessonMutation] = useCompleteLessonMutation()

  const getLessonContent = async (lessonId) => {
    try {
      dispatch(setLoading(true))
      const result = await useGetLessonContentsQuery(lessonId).refetch()
      if (result.data) {
        dispatch(setCurrentLesson(result.data))
        return result.data
      }
    } catch (error) {
      dispatch(setError(error?.message || 'Failed to fetch lesson content'))
      throw error
    } finally {
      dispatch(setLoading(false))
    }
  }

  const getLessonById = async (lessonId) => {
    try {
      dispatch(setLoading(true))
      const result = await useGetLessonByIdQuery(lessonId).refetch()
      if (result.data) {
        dispatch(setCurrentLesson(result.data))
        return result.data
      }
    } catch (error) {
      dispatch(setError(error?.message || 'Failed to fetch lesson'))
      throw error
    } finally {
      dispatch(setLoading(false))
    }
  }

  const getModuleLessons = async (moduleId) => {
    try {
      dispatch(setLoading(true))
      // Fetch lessons for module
      const result = await fetch(`/api/modules/${moduleId}/lessons`).then(res => res.json())
      dispatch(setModuleLessons(result))
      dispatch(setCurrentModule(moduleId))
      return result
    } catch (error) {
      dispatch(setError(error?.message || 'Failed to fetch module lessons'))
      throw error
    } finally {
      dispatch(setLoading(false))
    }
  }

  const saveLessonProgress = async (data) => {
    try {
      const result = await saveProgressMutation(data).unwrap()
      return result
    } catch (error) {
      console.error('Failed to save progress:', error)
      throw error
    }
  }

  const completeLesson = async (lessonId) => {
    try {
      dispatch(setLoading(true))
      const result = await completeLessonMutation(lessonId).unwrap()
      dispatch(markLessonComplete(lessonId))
      toast.success('Lesson completed!', {
        description: 'Great job! Keep up the momentum.',
      })
      return result
    } catch (error) {
      const errorMessage = error?.data?.message || 'Failed to complete lesson'
      toast.error('Completion failed', {
        description: errorMessage,
      })
      throw error
    } finally {
      dispatch(setLoading(false))
    }
  }

  const saveVideoProgress = async (data) => {
    try {
      // Save video analytics
      const result = await fetch('/api/save-video-analytics', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      }).then(res => res.json())
      return result
    } catch (error) {
      console.error('Failed to save video analytics:', error)
      throw error
    }
  }

  const submitQuiz = (results) => {
    dispatch(setQuizResults(results))
  }

  const clearLessonState = () => {
    dispatch(clearLessonState())
  }

  const getCompletedLessons = () => {
    return completedLessons
  }

  const isLessonCompleted = (lessonId) => {
    return completedLessons.includes(lessonId)
  }

  return {
    lessons,
    currentLesson,
    moduleLessons,
    completedLessons,
    loading,
    error,
    currentModule,
    quizResults,
    getLessonContent,
    getLessonById,
    getModuleLessons,
    saveLessonProgress,
    completeLesson,
    saveVideoProgress,
    submitQuiz,
    clearLessonState,
    getCompletedLessons,
    isLessonCompleted,
  }
}

export default useLessons