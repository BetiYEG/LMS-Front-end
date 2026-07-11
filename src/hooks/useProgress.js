import { useDispatch, useSelector } from 'react-redux'
import {
  setProgress,
  setAchievements,
  setStatistics,
  setLeaderboard,
  setLoading,
  setError,
  updateCourseProgress,
  addAchievement,
  unlockAchievement,
  resetProgress,
} from '@/store/slices/progressSlice'
import {
  useGetMyProgressQuery,
  useGetAchievementsQuery,
  useGetCourseProgressQuery,
  useUpdateProgressMutation,
} from '@/api/progressApi'
import { toast } from 'sonner'

export const useProgress = () => {
  const dispatch = useDispatch()
  const { progress, achievements, statistics, leaderboard, loading, error } =
    useSelector((state) => state.progress)

  // RTK Query hooks
  const { refetch: refetchProgress } = useGetMyProgressQuery()
  const { refetch: refetchAchievements } = useGetAchievementsQuery()
  const [updateProgressMutation] = useUpdateProgressMutation()

  const getMyProgress = async () => {
    try {
      dispatch(setLoading(true))
      const result = await refetchProgress()
      if (result.data) {
        dispatch(setProgress(result.data))
        return result.data
      }
    } catch (error) {
      dispatch(setError(error?.message || 'Failed to fetch progress'))
      throw error
    } finally {
      dispatch(setLoading(false))
    }
  }

  const getAchievements = async () => {
    try {
      dispatch(setLoading(true))
      const result = await refetchAchievements()
      if (result.data) {
        dispatch(setAchievements(result.data))
        return result.data
      }
    } catch (error) {
      dispatch(setError(error?.message || 'Failed to fetch achievements'))
      throw error
    } finally {
      dispatch(setLoading(false))
    }
  }

  const getCourseProgress = async (courseId) => {
    try {
      dispatch(setLoading(true))
      const result = await useGetCourseProgressQuery(courseId).refetch()
      return result.data
    } catch (error) {
      dispatch(setError(error?.message || 'Failed to fetch course progress'))
      throw error
    } finally {
      dispatch(setLoading(false))
    }
  }

  const updateProgress = async (data) => {
    try {
      dispatch(setLoading(true))
      const result = await updateProgressMutation(data).unwrap()
      if (data.courseId) {
        dispatch(updateCourseProgress({ courseId: data.courseId, progress: data.progress }))
      }
      toast.success('Progress updated!')
      return result
    } catch (error) {
      const errorMessage = error?.data?.message || 'Failed to update progress'
      toast.error('Update failed', {
        description: errorMessage,
      })
      throw error
    } finally {
      dispatch(setLoading(false))
    }
  }

  const unlockAchievement = (achievementId) => {
    dispatch(unlockAchievement(achievementId))
    const achievement = achievements.find(a => a.id === achievementId)
    if (achievement) {
      toast.success(`Achievement Unlocked! 🎉`, {
        description: `You earned: ${achievement.title}`,
      })
    }
  }

  const getOverallProgress = () => {
    return progress.overall || 0
  }

  const getCompletionRate = () => {
    if (progress.totalLessons === 0) return 0
    return Math.round((progress.completedLessons / progress.totalLessons) * 100)
  }

  const resetAllProgress = () => {
    dispatch(resetProgress())
  }

  return {
    progress,
    achievements,
    statistics,
    leaderboard,
    loading,
    error,
    getMyProgress,
    getAchievements,
    getCourseProgress,
    updateProgress,
    unlockAchievement,
    getOverallProgress,
    getCompletionRate,
    resetAllProgress,
    refetchProgress,
    refetchAchievements,
  }
}

export default useProgress