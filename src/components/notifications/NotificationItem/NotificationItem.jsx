import React, { useState } from 'react'
import { 
  Bell, 
  Check, 
  X, 
  Clock,
  AlertCircle,
  Info,
  CheckCircle,
  XCircle,
  MessageSquare,
  Calendar,
  Award,
  BookOpen,
  Users,
  Settings,
  FileText,
  Mail,
  Star,
  TrendingUp,
  Gift,
  Zap,
  Eye,
  Reply,
  Share2,
  MoreVertical,
  Trash2
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { cn } from '@/lib/utils'

export const NotificationItem = ({
  notification,
  onMarkAsRead,
  onDelete,
  isLast = false,
  className,
}) => {
  const [isExpanded, setIsExpanded] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  const {
    id,
    type,
    title,
    message,
    timestamp,
    read,
    icon: Icon,
    action,
    category,
    image,
    sender,
    priority,
  } = notification

  const getTypeStyles = (type) => {
    const styles = {
      info: {
        bg: 'bg-blue-50 dark:bg-blue-900/20',
        border: 'border-blue-200 dark:border-blue-800',
        icon: 'text-blue-600 dark:text-blue-400',
        dot: 'bg-blue-500',
      },
      success: {
        bg: 'bg-green-50 dark:bg-green-900/20',
        border: 'border-green-200 dark:border-green-800',
        icon: 'text-green-600 dark:text-green-400',
        dot: 'bg-green-500',
      },
      warning: {
        bg: 'bg-yellow-50 dark:bg-yellow-900/20',
        border: 'border-yellow-200 dark:border-yellow-800',
        icon: 'text-yellow-600 dark:text-yellow-400',
        dot: 'bg-yellow-500',
      },
      error: {
        bg: 'bg-red-50 dark:bg-red-900/20',
        border: 'border-red-200 dark:border-red-800',
        icon: 'text-red-600 dark:text-red-400',
        dot: 'bg-red-500',
      },
      achievement: {
        bg: 'bg-purple-50 dark:bg-purple-900/20',
        border: 'border-purple-200 dark:border-purple-800',
        icon: 'text-purple-600 dark:text-purple-400',
        dot: 'bg-purple-500',
      },
      message: {
        bg: 'bg-indigo-50 dark:bg-indigo-900/20',
        border: 'border-indigo-200 dark:border-indigo-800',
        icon: 'text-indigo-600 dark:text-indigo-400',
        dot: 'bg-indigo-500',
      },
      reminder: {
        bg: 'bg-orange-50 dark:bg-orange-900/20',
        border: 'border-orange-200 dark:border-orange-800',
        icon: 'text-orange-600 dark:text-orange-400',
        dot: 'bg-orange-500',
      },
    }
    return styles[type] || styles.info
  }

  const typeStyles = getTypeStyles(type)
  const NotificationIcon = Icon || Bell

  const getPriorityBadge = () => {
    if (!priority) return null
    const colors = {
      high: 'bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-400',
      medium: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-400',
      low: 'bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400',
    }
    return colors[priority]
  }

  const formatTimestamp = (timestamp) => {
    // If it's a relative time string, return as is
    if (timestamp.includes('ago') || timestamp.includes('minute') || timestamp.includes('hour') || timestamp.includes('day')) {
      return timestamp
    }
    // Otherwise, format the date
    try {
      const date = new Date(timestamp)
      return date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    } catch {
      return timestamp
    }
  }

  return (
    <div
      className={cn(
        "group relative flex gap-3 p-4 transition-colors",
        !read ? 'bg-gray-50 dark:bg-gray-800/50' : 'hover:bg-gray-50 dark:hover:bg-gray-800/30',
        !isLast && 'border-b border-gray-100 dark:border-gray-800',
        className
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Unread indicator dot */}
      {!read && (
        <div className="absolute left-0 top-4 h-2 w-2 rounded-full bg-indigo-500" />
      )}

      {/* Icon */}
      <div className="flex-shrink-0">
        <div className={cn(
          "flex h-10 w-10 items-center justify-center rounded-full",
          typeStyles.bg
        )}>
          <NotificationIcon className={cn("h-5 w-5", typeStyles.icon)} />
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <p className={cn(
                "text-sm font-medium",
                !read ? 'text-gray-900 dark:text-white' : 'text-gray-600 dark:text-gray-300'
              )}>
                {title}
              </p>
              {priority && (
                <Badge className={cn("text-xs", getPriorityBadge())}>
                  {priority.charAt(0).toUpperCase() + priority.slice(1)}
                </Badge>
              )}
              {category && (
                <Badge variant="outline" className="text-xs">
                  {category}
                </Badge>
              )}
              {!read && (
                <Badge variant="secondary" className="text-xs bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300">
                  New
                </Badge>
              )}
            </div>
            <p className={cn(
              "text-sm",
              !read ? 'text-gray-700 dark:text-gray-300' : 'text-gray-500 dark:text-gray-400'
            )}>
              {message}
            </p>
            {sender && (
              <p className="mt-0.5 text-xs text-gray-400 dark:text-gray-500">
                From: {sender}
              </p>
            )}
          </div>
          <div className="flex flex-shrink-0 items-center gap-1">
            <span className="text-xs text-gray-400 dark:text-gray-500 whitespace-nowrap">
              {formatTimestamp(timestamp)}
            </span>
          </div>
        </div>

        {/* Actions */}
        <div className="mt-2 flex flex-wrap items-center gap-2">
          {action && (
            <Button
              variant="outline"
              size="sm"
              className="h-7 text-xs"
              onClick={action.onClick}
            >
              {action.label}
            </Button>
          )}
          
          <div className={cn(
            "flex items-center gap-1 transition-opacity",
            isHovered ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
          )}>
            {!read && (
              <Button
                variant="ghost"
                size="sm"
                className="h-7 w-7 p-0"
                onClick={() => onMarkAsRead?.(id)}
              >
                <Check className="h-4 w-4" />
              </Button>
            )}
            <Button
              variant="ghost"
              size="sm"
              className="h-7 w-7 p-0"
              onClick={() => onDelete?.(id)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="h-7 w-7 p-0">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem>
                  <Eye className="mr-2 h-4 w-4" />
                  Mark as read
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Reply className="mr-2 h-4 w-4" />
                  Reply
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Share2 className="mr-2 h-4 w-4" />
                  Share
                </DropdownMenuItem>
                <DropdownMenuItem className="text-red-600">
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NotificationItem