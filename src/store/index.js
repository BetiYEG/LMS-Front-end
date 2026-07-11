// import { configureStore } from '@reduxjs/toolkit'
// import authReducer from './slices/authSlice'
// import courseReducer from './slices/courseSlice'
// import lessonReducer from './slices/lessonSlice'
// import progressReducer from './slices/progressSlice'
// import uiReducer from './slices/uiSlice'
// import { apiSlice } from '@/api/baseApi'

// export const store = configureStore({
//   reducer: {
//     auth: authReducer,
//     courses: courseReducer,
//     lessons: lessonReducer,
//     progress: progressReducer,
//     ui: uiReducer,
//     [apiSlice.reducerPath]: apiSlice.reducer,
//   },
//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware({
//       serializableCheck: false,
//     }).concat(apiSlice.middleware),
//   devTools: process.env.NODE_ENV !== 'production',
// })

// export default store
// src/store/index.js
import { configureStore } from '@reduxjs/toolkit'
import authReducer from './slices/authSlice'
import courseReducer from './slices/courseSlice'
import lessonReducer from './slices/lessonSlice'
import progressReducer from './slices/progressSlice'
import uiReducer from './slices/uiSlice'
import { apiSlice } from '@/api/baseApi'

console.log('🔵 Configuring store...')

export const store = configureStore({
  reducer: {
    auth: authReducer,
    courses: courseReducer,
    lessons: lessonReducer,
    progress: progressReducer,
    ui: uiReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(apiSlice.middleware),
  devTools: process.env.NODE_ENV !== 'production',
})

console.log('🔵 Store configured:', store)

export default store