import React, { useState } from 'react'
import { 
  Bell, 
  CheckCheck, 
  Filter, 
  ChevronDown,
  Clock,
  Circle,
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
  FileText
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { NotificationItem } from '../NotificationItem'
import { cn } from '@/lib/utils'

export const NotificationList = ({
  notifications,
  onMarkAsRead,
  onMarkAllAsRead,
  onDelete,
  onFilter,
  title = 'Notifications',
  showFilters = true,
  className,
}) => {
  const [filter, setFilter] = useState('all')
  const [selectedTab, setSelectedTab] = useState('all')

  // Mock notifications - replace with actual data
  const notificationData = notifications || [
    {
      id: 1,
      type: 'info',
      title: 'New Course Available',
      message: 'A new course "Advanced React" has been added to your learning path.',
      timestamp: '2 minutes ago',
      read: false,
      icon: BookOpen,
      action: {
        label: 'View Course',
        onClick: () => console.log('View course'),
      },
      category: 'course',
    },
    {
      id: 2,
      type: 'success',
      title: 'Lesson Completed!',
      message: 'You have completed "Introduction to JavaScript" lesson.',
      timestamp: '15 minutes ago',
      read: false,
      icon: CheckCircle,
      action: {
        label: 'View Lesson',
        onClick: () => console.log('View lesson'),
      },
      category: 'lesson',
    },
    {
      id: 3,
      type: 'warning',
      title: 'Assessment Due Soon',
      message: 'Your assessment "Module 3 Quiz" is due in 2 days.',
      timestamp: '1 hour ago',
      read: true,
      icon: AlertCircle,
      action: {
        label: 'Take Assessment',
        onClick: () => console.log('Take assessment'),
      },
      category: 'assessment',
    },
    {
      id: 4,
      type: 'achievement',
      title: 'Achievement Unlocked!',
      message: 'You earned the "Quick Learner" badge for completing 10 lessons.',
      timestamp: '3 hours ago',
      read: true,
      icon: Award,
      action: {
        label: 'View Achievements',
        onClick: () => console.log('View achievements'),
      },
      category: 'achievement',
    },
    {
      id: 5,
      type: 'message',
      title: 'New Message from Instructor',
      message: 'Your instructor has sent you a message regarding the course material.',
      timestamp: '5 hours ago',
      read: true,
      icon: MessageSquare,
      action: {
        label: 'Reply',
        onClick: () => console.log('Reply to message'),
      },
      category: 'message',
    },
    {
      id: 6,
      type: 'reminder',
      title: 'Upcoming Live Session',
      message: 'Live session "Q&A with Instructor" starts in 30 minutes.',
      timestamp: '6 hours ago',
      read: true,
      icon: Calendar,
      action: {
        label: 'Join Session',
        onClick: () => console.log('Join session'),
      },
      category: 'reminder',
    },
    {
      id: 7,
      type: 'info',
      title: 'New Resource Available',
      message: 'Study materials for Module 4 have been uploaded.',
      timestamp: '1 day ago',
      read: true,
      icon: FileText,
      action: {
        label: 'Download',
        onClick: () => console.log('Download resource'),
      },
      category: 'resource',
    },
    {
      id: 8,
      type: 'success',
      title: 'Course Completed!',
      message: 'Congratulations! You completed "Digital Marketing Fundamentals".',
      timestamp: '2 days ago',
      read: true,
      icon: Award,
      action: {
        label: 'Share',
        onClick: () => console.log('Share achievement'),
      },
      category: 'course',
    },
  ]

  const unreadCount = notificationData.filter(n => !n.read).length

  const getFilteredNotifications = () => {
    let filtered = notificationData

    // Filter by tab
    if (selectedTab === 'unread') {
      filtered = filtered.filter(n => !n.read)
    } else if (selectedTab === 'read') {
      filtered = filtered.filter(n => n.read)
    }

    // Filter by category
    if (filter !== 'all') {
      filtered = filtered.filter(n => n.category === filter)
    }

    return filtered
  }

  const getCategories = () => {
    const categories = new Set(notificationData.map(n => n.category))
    return ['all', ...Array.from(categories)]
  }

  const handleMarkAllAsRead = () => {
    onMarkAllAsRead?.()
  }

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter)
    onFilter?.(newFilter)
  }

  const filteredNotifications = getFilteredNotifications()

  return (
    <Card className={cn("overflow-hidden", className)}>
      <CardHeader className="border-b border-gray-200 dark:border-gray-700">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="relative">
              <Bell className="h-5 w-5 text-gray-500" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-medium text-white">
                  {unreadCount}
                </span>
              )}
            </div>
            <CardTitle className="text-lg">{title}</CardTitle>
            {unreadCount > 0 && (
              <Badge variant="destructive" className="text-xs">
                {unreadCount} new
              </Badge>
            )}
          </div>
          <div className="flex items-center gap-2">
            {unreadCount > 0 && (
              <Button
                variant="ghost"
                size="sm"
                className="text-xs"
                onClick={handleMarkAllAsRead}
              >
                <CheckCheck className="mr-2 h-4 w-4" />
                Mark all as read
              </Button>
            )}
          </div>
        </div>

        {/* Tabs */}
        <Tabs 
          value={selectedTab} 
          onValueChange={setSelectedTab} 
          className="mt-4"
        >
          <div className="flex items-center justify-between">
            <TabsList>
              <TabsTrigger value="all">
                All
                <Badge variant="secondary" className="ml-2 text-xs">
                  {notificationData.length}
                </Badge>
              </TabsTrigger>
              <TabsTrigger value="unread">
                Unread
                {unreadCount > 0 && (
                  <Badge variant="destructive" className="ml-2 text-xs">
                    {unreadCount}
                  </Badge>
                )}
              </TabsTrigger>
              <TabsTrigger value="read">
                Read
                <Badge variant="secondary" className="ml-2 text-xs">
                  {notificationData.filter(n => n.read).length}
                </Badge>
              </TabsTrigger>
            </TabsList>

            {showFilters && (
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-xs"
                >
                  <Filter className="mr-2 h-3 w-3" />
                  Filter
                  <ChevronDown className="ml-2 h-3 w-3" />
                </Button>
              </div>
            )}
          </div>
        </Tabs>
      </CardHeader>

      <CardContent className="p-0">
        {/* Category filters */}
        {showFilters && (
          <div className="flex flex-wrap gap-2 p-3 border-b border-gray-100 dark:border-gray-800">
            {getCategories().map((category) => (
              <Badge
                key={category}
                variant={filter === category ? 'default' : 'outline'}
                className={cn(
                  "cursor-pointer transition-colors",
                  filter === category 
                    ? "bg-indigo-500 hover:bg-indigo-600" 
                    : "hover:bg-gray-100 dark:hover:bg-gray-800"
                )}
                onClick={() => handleFilterChange(category)}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </Badge>
            ))}
          </div>
        )}

        {/* Notification list */}
        {filteredNotifications.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
            <div className="rounded-full bg-gray-100 dark:bg-gray-800 p-4">
              <Bell className="h-8 w-8 text-gray-400" />
            </div>
            <h3 className="mt-4 text-sm font-medium text-gray-900 dark:text-white">
              No notifications
            </h3>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              {selectedTab === 'unread' 
                ? 'You have no unread notifications' 
                : 'You\'re all caught up!'}
            </p>
          </div>
        ) : (
          <div className="divide-y divide-gray-100 dark:divide-gray-800">
            {filteredNotifications.map((notification, index) => (
              <NotificationItem
                key={notification.id}
                notification={notification}
                onMarkAsRead={() => onMarkAsRead?.(notification.id)}
                onDelete={() => onDelete?.(notification.id)}
                isLast={index === filteredNotifications.length - 1}
              />
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}

export default NotificationList