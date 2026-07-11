import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  progress: {
    overall: 0,
    courses: [],
    totalLessons: 0,
    completedLessons: 0,
    totalHours: 0,
    completedHours: 0,
    streak: 0,
    lastActivity: null,
  },
  achievements: [],
  statistics: {
    totalCourses: 0,
    completedCourses: 0,
    averageScore: 0,
    passingRate: 0,
    totalTimeSpent: '0h',
  },
  leaderboard: [],
  loading: false,
  error: null,
}

const progressSlice = createSlice({
  name: 'progress',
  initialState,
  reducers: {
    setProgress: (state, action) => {
      state.progress = { ...state.progress, ...action.payload }
      state.loading = false
      state.error = null
    },
    setAchievements: (state, action) => {
      state.achievements = action.payload
      state.loading = false
    },
    setStatistics: (state, action) => {
      state.statistics = { ...state.statistics, ...action.payload }
    },
    setLeaderboard: (state, action) => {
      state.leaderboard = action.payload
    },
    setLoading: (state, action) => {
      state.loading = action.payload
    },
    setError: (state, action) => {
      state.error = action.payload
      state.loading = false
    },
    updateCourseProgress: (state, action) => {
      const { courseId, progress } = action.payload
      const course = state.progress.courses.find(c => c.id === courseId)
      if (course) {
        course.progress = progress
      }
      // Recalculate overall progress
      const total = state.progress.courses.reduce((acc, c) => acc + c.progress, 0)
      state.progress.overall = Math.round(total / state.progress.courses.length)
    },
    addAchievement: (state, action) => {
      state.achievements.push(action.payload)
    },
    unlockAchievement: (state, action) => {
      const achievement = state.achievements.find(a => a.id === action.payload)
      if (achievement) {
        achievement.unlocked = true
        achievement.unlockedAt = new Date().toISOString()
      }
    },
    resetProgress: (state) => {
      state.progress = initialState.progress
      state.achievements = []
      state.loading = false
      state.error = null
    },
  },
})

export const {
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
} = progressSlice.actions

export default progressSlice.reducer