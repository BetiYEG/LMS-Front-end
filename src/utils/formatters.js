import { format, formatDistanceToNow, formatDuration, intervalToDuration } from 'date-fns'

// Format date
export const formatDate = (date, formatString = 'MMMM D, YYYY') => {
  if (!date) return 'N/A'
  try {
    const dateObj = typeof date === 'string' ? new Date(date) : date
    return format(dateObj, formatString)
  } catch {
    return 'Invalid Date'
  }
}

// Format time
export const formatTime = (date, formatString = 'HH:mm') => {
  if (!date) return 'N/A'
  try {
    const dateObj = typeof date === 'string' ? new Date(date) : date
    return format(dateObj, formatString)
  } catch {
    return 'Invalid Time'
  }
}

// Format datetime
export const formatDateTime = (date, formatString = 'MMMM D, YYYY HH:mm') => {
  if (!date) return 'N/A'
  try {
    const dateObj = typeof date === 'string' ? new Date(date) : date
    return format(dateObj, formatString)
  } catch {
    return 'Invalid Date'
  }
}

// Format relative time (e.g., "2 hours ago")
export const formatRelativeTime = (date) => {
  if (!date) return 'N/A'
  try {
    const dateObj = typeof date === 'string' ? new Date(date) : date
    return formatDistanceToNow(dateObj, { addSuffix: true })
  } catch {
    return 'Invalid Date'
  }
}

// Format duration in seconds to readable string
export const formatDurationFromSeconds = (seconds) => {
  if (!seconds || seconds < 0) return '0s'
  
  const duration = intervalToDuration({ start: 0, end: seconds * 1000 })
  const parts = []
  
  if (duration.hours) parts.push(`${duration.hours}h`)
  if (duration.minutes) parts.push(`${duration.minutes}m`)
  if (duration.seconds) parts.push(`${duration.seconds}s`)
  
  return parts.join(' ') || '0s'
}

// Format duration from minutes
export const formatDurationFromMinutes = (minutes) => {
  return formatDurationFromSeconds(minutes * 60)
}

// Format currency
export const formatCurrency = (amount, currency = 'USD') => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
  }).format(amount)
}

// Format number with commas
export const formatNumber = (number, decimals = 0) => {
  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(number)
}

// Format percentage
export const formatPercentage = (value, decimals = 0) => {
  return new Intl.NumberFormat('en-US', {
    style: 'percent',
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(value / 100)
}

// Format file size
export const formatFileSize = (bytes) => {
  if (bytes === 0) return '0 Bytes'
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}

// Format phone number
export const formatPhoneNumber = (phone) => {
  if (!phone) return ''
  const cleaned = phone.replace(/\D/g, '')
  if (cleaned.length === 10) {
    return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6)}`
  }
  if (cleaned.length === 11) {
    return `+${cleaned.slice(0, 1)} (${cleaned.slice(1, 4)}) ${cleaned.slice(4, 7)}-${cleaned.slice(7)}`
  }
  return phone
}

// Format address
export const formatAddress = (address) => {
  if (!address) return ''
  const parts = []
  if (address.street) parts.push(address.street)
  if (address.city) parts.push(address.city)
  if (address.state) parts.push(address.state)
  if (address.country) parts.push(address.country)
  if (address.zipCode) parts.push(address.zipCode)
  return parts.join(', ')
}

// Truncate text with ellipsis
export const truncateText = (text, maxLength = 100, suffix = '...') => {
  if (!text || typeof text !== 'string') return ''
  if (text.length <= maxLength) return text
  return text.substring(0, maxLength) + suffix
}

// Format lesson duration
export const formatLessonDuration = (duration) => {
  if (!duration) return '0 min'
  if (typeof duration === 'string' && duration.includes(':')) {
    return duration
  }
  const minutes = parseInt(duration)
  if (minutes < 60) {
    return `${minutes} min`
  }
  const hours = Math.floor(minutes / 60)
  const remainingMinutes = minutes % 60
  if (remainingMinutes === 0) {
    return `${hours} hr`
  }
  return `${hours} hr ${remainingMinutes} min`
}

// Format course progress
export const formatProgress = (value) => {
  const percentage = Math.min(Math.max(value, 0), 100)
  return `${Math.round(percentage)}%`
}

// Format ratings
export const formatRating = (rating) => {
  return rating ? rating.toFixed(1) : '0.0'
}

// Format review count
export const formatReviewCount = (count) => {
  if (!count) return '0 reviews'
  if (count < 1000) return `${count} reviews`
  if (count < 1000000) return `${(count / 1000).toFixed(1)}K reviews`
  return `${(count / 1000000).toFixed(1)}M reviews`
}

// Format user initials
export const getInitials = (name) => {
  if (!name) return 'U'
  return name
    .split(' ')
    .map(part => part[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)
}

// Generate color from string
export const getColorFromString = (str) => {
  if (!str) return '#000000'
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash)
  }
  const c = (hash & 0x00FFFFFF).toString(16).toUpperCase()
  return '#' + '00000'.substring(0, 6 - c.length) + c
}

export default {
  formatDate,
  formatTime,
  formatDateTime,
  formatRelativeTime,
  formatDurationFromSeconds,
  formatDurationFromMinutes,
  formatCurrency,
  formatNumber,
  formatPercentage,
  formatFileSize,
  formatPhoneNumber,
  formatAddress,
  truncateText,
  formatLessonDuration,
  formatProgress,
  formatRating,
  formatReviewCount,
  getInitials,
  getColorFromString,
}