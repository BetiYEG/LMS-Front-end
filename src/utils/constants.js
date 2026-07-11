// App Constants
export const APP_NAME = import.meta.env.VITE_APP_NAME || 'OEB LMS'
export const APP_VERSION = import.meta.env.VITE_APP_VERSION || '1.0.0'
export const API_URL = import.meta.env.VITE_API_URL || '/api'

// User Roles
export const ROLES = {
  ADMIN: 'admin',
  TEACHER: 'teacher',
  STUDENT: 'student',
}

// Course Levels
export const COURSE_LEVELS = {
  BEGINNER: 'beginner',
  INTERMEDIATE: 'intermediate',
  ADVANCED: 'advanced',
}

export const COURSE_LEVEL_LABELS = {
  [COURSE_LEVELS.BEGINNER]: 'Beginner',
  [COURSE_LEVELS.INTERMEDIATE]: 'Intermediate',
  [COURSE_LEVELS.ADVANCED]: 'Advanced',
}

// Lesson Types
export const LESSON_TYPES = {
  VIDEO: 'video',
  READING: 'reading',
  QUIZ: 'quiz',
  ASSIGNMENT: 'assignment',
  PDF: 'pdf',
}

export const LESSON_TYPE_ICONS = {
  [LESSON_TYPES.VIDEO]: 'Video',
  [LESSON_TYPES.READING]: 'FileText',
  [LESSON_TYPES.QUIZ]: 'FileQuestion',
  [LESSON_TYPES.ASSIGNMENT]: 'FileCheck',
  [LESSON_TYPES.PDF]: 'File',
}

// Assessment Types
export const ASSESSMENT_TYPES = {
  QUIZ: 'quiz',
  EXAM: 'exam',
  ASSIGNMENT: 'assignment',
}

// Notification Types
export const NOTIFICATION_TYPES = {
  INFO: 'info',
  SUCCESS: 'success',
  WARNING: 'warning',
  ERROR: 'error',
  ACHIEVEMENT: 'achievement',
  MESSAGE: 'message',
  REMINDER: 'reminder',
}

// Achievement Rarity
export const ACHIEVEMENT_RARITY = {
  COMMON: 'common',
  UNCOMMON: 'uncommon',
  RARE: 'rare',
  EPIC: 'epic',
  LEGENDARY: 'legendary',
}

export const ACHIEVEMENT_RARITY_COLORS = {
  [ACHIEVEMENT_RARITY.COMMON]: 'border-gray-300 bg-gray-50',
  [ACHIEVEMENT_RARITY.UNCOMMON]: 'border-green-300 bg-green-50',
  [ACHIEVEMENT_RARITY.RARE]: 'border-blue-300 bg-blue-50',
  [ACHIEVEMENT_RARITY.EPIC]: 'border-purple-300 bg-purple-50',
  [ACHIEVEMENT_RARITY.LEGENDARY]: 'border-yellow-300 bg-yellow-50',
}

// Status
export const STATUS = {
  NOT_STARTED: 'not-started',
  IN_PROGRESS: 'in-progress',
  COMPLETED: 'completed',
  LOCKED: 'locked',
  EXPIRED: 'expired',
  PASSED: 'passed',
  FAILED: 'failed',
}

export const STATUS_COLORS = {
  [STATUS.NOT_STARTED]: 'bg-gray-100 text-gray-700',
  [STATUS.IN_PROGRESS]: 'bg-yellow-100 text-yellow-700',
  [STATUS.COMPLETED]: 'bg-green-100 text-green-700',
  [STATUS.LOCKED]: 'bg-gray-100 text-gray-500',
  [STATUS.EXPIRED]: 'bg-red-100 text-red-700',
  [STATUS.PASSED]: 'bg-green-500 text-white',
  [STATUS.FAILED]: 'bg-red-500 text-white',
}

// Pagination
export const DEFAULT_PAGE = 1
export const DEFAULT_LIMIT = 10
export const DEFAULT_SORT = 'newest'

// Sort Options
export const SORT_OPTIONS = [
  { value: 'newest', label: 'Newest' },
  { value: 'popular', label: 'Most Popular' },
  { value: 'rating', label: 'Highest Rated' },
  { value: 'progress', label: 'Progress' },
]

// File Types
export const FILE_TYPES = {
  PDF: 'application/pdf',
  DOC: 'application/msword',
  DOCX: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  XLS: 'application/vnd.ms-excel',
  XLSX: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  PPT: 'application/vnd.ms-powerpoint',
  PPTX: 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
  MP4: 'video/mp4',
  MP3: 'audio/mpeg',
  JPG: 'image/jpeg',
  PNG: 'image/png',
  GIF: 'image/gif',
  SVG: 'image/svg+xml',
}

// File Size Limits (in bytes)
export const FILE_SIZE_LIMITS = {
  IMAGE: 5 * 1024 * 1024, // 5MB
  VIDEO: 100 * 1024 * 1024, // 100MB
  DOCUMENT: 10 * 1024 * 1024, // 10MB
  AUDIO: 20 * 1024 * 1024, // 20MB
}

// Time Formats
export const TIME_FORMATS = {
  FULL: 'MMMM D, YYYY HH:mm',
  DATE: 'MMMM D, YYYY',
  TIME: 'HH:mm',
  SHORT: 'MM/DD/YYYY',
  RELATIVE: 'relative',
}

// Local Storage Keys
export const STORAGE_KEYS = {
  TOKEN: 'token',
  USER: 'user',
  THEME: 'theme',
  VIEW_MODE: 'view-mode',
  RECENT_COURSES: 'recent-courses',
  USER_PREFERENCES: 'user-preferences',
  LANGUAGE: 'language',
}

// API Endpoints
export const API_ENDPOINTS = {
  // Auth
  LOGIN: '/login',
  REGISTER: '/register',
  LOGOUT: '/logout',
  REFRESH_TOKEN: '/refresh-token',
  FORGOT_PASSWORD: '/forgot-password',
  RESET_PASSWORD: '/reset-password',

  // User
  PROFILE: '/profile',
  UPDATE_PROFILE: '/profile',
  USER_PROFILE: '/user-profile',

  // Courses
  COURSES: '/courses',
  COURSE: (id) => `/courses/${id}`,
  MY_COURSES: '/my-courses',
  ENROLL_COURSE: (id) => `/courses/${id}/enroll`,
  COURSE_PROGRESS: (id) => `/courses/${id}/progress`,
  COURSE_ASSESSMENT: (id) => `/course-assessment/${id}`,
  TOPIC_CONTENT: (id) => `/topic-content/${id}`,

  // Lessons
  LESSONS: '/lessons',
  LESSON: (id) => `/lessons/${id}`,
  LESSON_CONTENTS: (id) => `/lesson-contents/${id}`,
  LESSON_PROGRESS: '/lesson-progress',
  COMPLETE_LESSON: (id) => `/lessons/${id}/complete`,
  VIDEO_ANALYTICS: '/save-video-analytics',

  // Assessments
  ASSESSMENTS: '/assessments',
  ASSESSMENT: (id) => `/assessments/${id}`,
  ASSESSMENT_QUESTIONS: (id) => `/assessment-questions/${id}`,
  ASSESSMENT_RESULT: (id) => `/assessment-result/${id}`,
  ASSESSMENT_STATISTICS: (id) => `/assessment-statistics/${id}`,
  SUBMIT_ASSESSMENT: (id) => `/assessments/${id}/submit`,

  // Booklets
  BOOKLETS: '/booklets',
  BOOKLET: (id) => `/booklets/${id}`,
  STUDENT_BOOKLET: (id) => `/student/booklets/${id}`,
  BOOKLET_QUESTIONS: (id) => `/booklet-questions/${id}`,
  MOCK_BOOKLETS: '/mock-booklets',
  MY_SCHEDULES: '/my-schedules',

  // Progress
  MY_PROGRESS: '/my-progress',
  ACHIEVEMENTS: '/achievements',
  PROGRESS: '/progress',

  // Notifications
  NOTIFICATIONS: '/my-notifications',
  NOTIFICATION: (id) => `/notifications/${id}`,

  // Others
  LEADERSHIP_TYPES: '/leadership-types',
  WOREDAS: '/woredas',
  ACADEMIC_UNIT_COURSES: '/academic-unit-courses',
}

// Route Paths
export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  DASHBOARD: '/dashboard',
  MY_COURSES: '/my-courses',
  COURSE: (id) => `/course/${id}`,
  LESSON: (courseId, lessonId) => `/course/${courseId}/lesson/${lessonId}`,
  ASSESSMENTS: '/assessments',
  ASSESSMENT: (id) => `/assessment/${id}`,
  BOOKLETS: '/booklets',
  BOOKLET: (id) => `/booklet/${id}`,
  PROGRESS: '/progress',
  ACHIEVEMENTS: '/achievements',
  NOTIFICATIONS: '/notifications',
  PROFILE: '/profile',
  SETTINGS: '/settings',
}

export default {
  APP_NAME,
  APP_VERSION,
  API_URL,
  ROLES,
  COURSE_LEVELS,
  COURSE_LEVEL_LABELS,
  LESSON_TYPES,
  LESSON_TYPE_ICONS,
  ASSESSMENT_TYPES,
  NOTIFICATION_TYPES,
  ACHIEVEMENT_RARITY,
  ACHIEVEMENT_RARITY_COLORS,
  STATUS,
  STATUS_COLORS,
  SORT_OPTIONS,
  FILE_TYPES,
  FILE_SIZE_LIMITS,
  TIME_FORMATS,
  STORAGE_KEYS,
  API_ENDPOINTS,
  ROUTES,
}