export const config = {
  // App Configuration
  appName: import.meta.env.VITE_APP_NAME || 'OEB LMS',
  appDescription: import.meta.env.VITE_APP_DESCRIPTION || 'Learning Management System',
  appVersion: import.meta.env.VITE_APP_VERSION || '1.0.0',

  // API Configuration
  apiUrl: import.meta.env.VITE_API_URL || '/api',
  apiTimeout: parseInt(import.meta.env.VITE_API_TIMEOUT) || 30000,

  // Client Configuration
  client: import.meta.env.VITE_CLIENT || 'default',
  clientName: import.meta.env.VITE_CLIENT_NAME || 'OEB',

  // Feature Flags
  features: {
    analytics: import.meta.env.VITE_ENABLE_ANALYTICS === 'true',
    chat: import.meta.env.VITE_ENABLE_CHAT === 'true',
    attachments: import.meta.env.VITE_ENABLE_ATTACHMENTS === 'true',
    achievements: import.meta.env.VITE_ENABLE_ACHIEVEMENTS === 'true',
    assessments: import.meta.env.VITE_ENABLE_ASSESSMENTS === 'true',
    booklets: import.meta.env.VITE_ENABLE_BOOKLETS === 'true',
  },

  // Development Configuration
  dev: {
    autoLogin: import.meta.env.VITE_DEV_AUTO_LOGIN === 'true',
    username: import.meta.env.VITE_DEV_USERNAME || 'admin',
    password: import.meta.env.VITE_DEV_PASSWORD || 'admin123',
    mockApi: import.meta.env.VITE_DEV_MOCK_API === 'true',
  },

  // Environment
  env: import.meta.env.VITE_DEPLOY_ENV || 'development',
  isDev: import.meta.env.DEV,
  isProd: import.meta.env.PROD,

  // Pagination
  pagination: {
    defaultPage: 1,
    defaultLimit: 10,
    maxLimit: 100,
  },

  // Upload limits (in bytes)
  uploadLimits: {
    image: 5 * 1024 * 1024, // 5MB
    video: 100 * 1024 * 1024, // 100MB
    document: 10 * 1024 * 1024, // 10MB
    audio: 20 * 1024 * 1024, // 20MB
  },

  // Supported file types
  supportedFileTypes: {
    image: ['image/jpeg', 'image/png', 'image/gif', 'image/svg+xml', 'image/webp'],
    video: ['video/mp4', 'video/webm', 'video/ogg'],
    document: ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'],
    spreadsheet: ['application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'],
    presentation: ['application/vnd.ms-powerpoint', 'application/vnd.openxmlformats-officedocument.presentationml.presentation'],
    audio: ['audio/mpeg', 'audio/wav', 'audio/ogg'],
  },

  // Date format
  dateFormat: {
    default: 'MMMM D, YYYY',
    short: 'MM/DD/YYYY',
    time: 'HH:mm',
    datetime: 'MMMM D, YYYY HH:mm',
    relative: 'relative',
  },

  // Local storage keys
  storageKeys: {
    token: 'token',
    user: 'user',
    theme: 'theme',
    viewMode: 'view-mode',
    recentCourses: 'recent-courses',
    userPreferences: 'user-preferences',
    language: 'language',
  },

  // Routes
  routes: {
    home: '/',
    login: '/login',
    register: '/register',
    dashboard: '/dashboard',
    myCourses: '/my-courses',
    course: (id) => `/course/${id}`,
    lesson: (courseId, lessonId) => `/course/${courseId}/lesson/${lessonId}`,
    assessments: '/assessments',
    assessment: (id) => `/assessment/${id}`,
    booklets: '/booklets',
    booklet: (id) => `/booklet/${id}`,
    progress: '/progress',
    achievements: '/achievements',
    notifications: '/notifications',
    profile: '/profile',
    settings: '/settings',
  },

  // Social links
  social: {
    facebook: import.meta.env.VITE_FACEBOOK_URL || '',
    twitter: import.meta.env.VITE_TWITTER_URL || '',
    linkedin: import.meta.env.VITE_LINKEDIN_URL || '',
    youtube: import.meta.env.VITE_YOUTUBE_URL || '',
    instagram: import.meta.env.VITE_INSTAGRAM_URL || '',
  },

  // Contact
  contact: {
    email: import.meta.env.VITE_CONTACT_EMAIL || 'info@example.com',
    phone: import.meta.env.VITE_CONTACT_PHONE || '',
    address: import.meta.env.VITE_CONTACT_ADDRESS || '',
  },
}

export default config