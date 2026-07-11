// src/api/index.js
export { default as apiSlice } from './baseApi'
export { default as authApi } from './authApi'
export { default as courseApi } from './courseApi'
export { default as lessonApi } from './lessonApi'
export { default as assessmentApi } from './assessmentApi'
export { default as bookletApi } from './bookletApi'
export { default as progressApi } from './progressApi'
export { default as notificationsApi } from './notificationsApi'

// Export all hooks from each API
export * from './authApi'
export * from './courseApi'
export * from './lessonApi'
export * from './assessmentApi'
export * from './bookletApi'
export * from './progressApi'
export * from './notificationsApi'