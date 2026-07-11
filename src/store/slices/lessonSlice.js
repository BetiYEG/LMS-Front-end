import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  lessons: [],
  currentLesson: null,
  completedLessons: [],
  loading: false,
  error: null,
  currentModule: null,
  moduleLessons: [],
  quizResults: null,
}

const lessonSlice = createSlice({
  name: 'lessons',
  initialState,
  reducers: {
    setLessons: (state, action) => {
      state.lessons = action.payload
      state.loading = false
      state.error = null
    },
    setCurrentLesson: (state, action) => {
      state.currentLesson = action.payload
      state.loading = false
      state.error = null
    },
    setModuleLessons: (state, action) => {
      state.moduleLessons = action.payload
      state.loading = false
    },
    setCompletedLessons: (state, action) => {
      state.completedLessons = action.payload
    },
    setLoading: (state, action) => {
      state.loading = action.payload
    },
    setError: (state, action) => {
      state.error = action.payload
      state.loading = false
    },
    setCurrentModule: (state, action) => {
      state.currentModule = action.payload
    },
    markLessonComplete: (state, action) => {
      const lessonId = action.payload
      if (!state.completedLessons.includes(lessonId)) {
        state.completedLessons.push(lessonId)
      }
      if (state.currentLesson?.id === lessonId) {
        state.currentLesson.completed = true
      }
      const lesson = state.lessons.find(l => l.id === lessonId)
      if (lesson) {
        lesson.completed = true
      }
    },
    setQuizResults: (state, action) => {
      state.quizResults = action.payload
    },
    clearLessonState: (state) => {
      state.currentLesson = null
      state.moduleLessons = []
      state.quizResults = null
      state.loading = false
      state.error = null
    },
  },
})

export const {
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
} = lessonSlice.actions

export default lessonSlice.reducer