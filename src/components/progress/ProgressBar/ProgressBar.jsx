import React from 'react'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { Clock, BookOpen, CheckCircle, TrendingUp, Calendar } from 'lucide-react'
import { cn } from '@/lib/utils'

export const ProgressBar = ({
  label,
  value,
  max = 100,
  showLabel = true,
  showPercentage = true,
  variant = 'default', // 'default', 'course', 'lesson', 'module'
  size = 'default', // 'sm', 'default', 'lg'
  color = 'default', // 'default', 'indigo', 'green', 'blue', 'purple', 'orange'
  className,
  details,
  onClick,
}) => {
  const percentage = Math.min(Math.round((value / max) * 100), 100)

  const colorClasses = {
    default: 'bg-indigo-600',
    indigo: 'bg-indigo-600',
    green: 'bg-green-500',
    blue: 'bg-blue-500',
    purple: 'bg-purple-500',
    orange: 'bg-orange-500',
  }

  const sizeClasses = {
    sm: 'h-1.5',
    default: 'h-2.5',
    lg: 'h-4',
  }

  const getVariantIcon = () => {
    switch (variant) {
      case 'course':
        return <BookOpen className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
      case 'lesson':
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case 'module':
        return <TrendingUp className="h-4 w-4 text-purple-500" />
      default:
        return null
    }
  }

  const getStatusColor = () => {
    if (percentage === 100) return 'text-green-600 dark:text-green-400'
    if (percentage >= 60) return 'text-indigo-600 dark:text-indigo-400'
    if (percentage >= 30) return 'text-yellow-600 dark:text-yellow-400'
    return 'text-red-600 dark:text-red-400'
  }

  const getProgressColor = () => {
    if (percentage === 100) return 'bg-green-500'
    if (percentage >= 60) return 'bg-indigo-600'
    if (percentage >= 30) return 'bg-yellow-500'
    return 'bg-red-500'
  }

  return (
    <div className={cn("space-y-2", className)} onClick={onClick}>
      {/* Label and value */}
      {showLabel && (
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {getVariantIcon()}
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              {label || 'Progress'}
            </span>
            {variant === 'course' && (
              <Badge variant="outline" className="text-xs">
                {details?.lessonsCompleted || 0}/{details?.totalLessons || 0} lessons
              </Badge>
            )}
          </div>
          {showPercentage && (
            <div className="flex items-center gap-2">
              <span className={cn(
                "text-sm font-semibold",
                getStatusColor()
              )}>
                {percentage}%
              </span>
              {percentage === 100 && (
                <CheckCircle className="h-4 w-4 text-green-500" />
              )}
            </div>
          )}
        </div>
      )}

      {/* Progress bar */}
      <div className="relative">
        <Progress 
          value={percentage} 
          className={cn(
            "w-full overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700",
            sizeClasses[size]
          )}
        >
          <div 
            className={cn(
              "h-full rounded-full transition-all duration-500 ease-in-out",
              colorClasses[color] || colorClasses.default,
              getProgressColor()
            )}
            style={{ width: `${percentage}%` }}
          />
        </Progress>

        {/* Additional details */}
        {details && variant === 'course' && (
          <div className="mt-2 flex flex-wrap items-center gap-3 text-xs text-gray-500 dark:text-gray-400">
            <span className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              {details.timeSpent || '0h 0m'} spent
            </span>
            <span className="flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              Last activity: {details.lastActivity || 'Today'}
            </span>
          </div>
        )}
      </div>

      {/* Quick stats for course variant */}
      {variant === 'course' && details && (
        <div className="mt-1 flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400">
          <span className="flex items-center gap-1">
            <CheckCircle className="h-3 w-3 text-green-500" />
            {details.completedLessons || 0} completed
          </span>
          <span className="flex items-center gap-1">
            <BookOpen className="h-3 w-3 text-indigo-500" />
            {details.remainingLessons || 0} remaining
          </span>
        </div>
      )}
    </div>
  )
}

export default ProgressBar