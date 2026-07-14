export const config = {
  apiUrl: import.meta.env.VITE_API_URL || '/api',
  appName: import.meta.env.VITE_APP_NAME || 'LMS Platform',
  environment: import.meta.env.VITE_ENVIRONMENT || 'development',
  debug: import.meta.env.VITE_DEBUG === 'true',
}

export default config