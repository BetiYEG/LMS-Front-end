import React, { useState } from 'react'
import { Bell, Settings, CheckCheck, Trash2 } from 'lucide-react'
import { NotificationList } from '@/components/notifications'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { toast } from 'sonner'

export const Notifications = () => {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'info',
      title: 'New Course Available',
      message: 'A new course "Advanced React" has been added to your learning path.',
      timestamp: '2 minutes ago',
      read: false,
      icon: 'BookOpen',
      category: 'course',
      action: {
        label: 'View Course',
        onClick: () => console.log('View course'),
      },
    },
    // Add more notifications...
  ])

  const handleMarkAsRead = (id) => {
    setNotifications(prev =>
      prev.map(n =>
        n.id === id ? { ...n, read: true } : n
      )
    )
    toast.success('Notification marked as read')
  }

  const handleMarkAllAsRead = () => {
    setNotifications(prev =>
      prev.map(n => ({ ...n, read: true }))
    )
    toast.success('All notifications marked as read')
  }

  const handleDelete = (id) => {
    setNotifications(prev => prev.filter(n => n.id !== id))
    toast.success('Notification deleted')
  }

  const unreadCount = notifications.filter(n => !n.read).length

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Notifications
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">
            Stay updated with your learning progress and announcements
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          {unreadCount > 0 && (
            <Button variant="outline" size="sm" onClick={handleMarkAllAsRead}>
              <CheckCheck className="mr-2 h-4 w-4" />
              Mark all as read
            </Button>
          )}
          <Button variant="outline" size="sm">
            <Settings className="mr-2 h-4 w-4" />
            Preferences
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Total</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {notifications.length}
                </p>
              </div>
              <div className="rounded-lg bg-gray-100 dark:bg-gray-800 p-2">
                <Bell className="h-5 w-5 text-gray-500" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Unread</p>
                <p className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
                  {unreadCount}
                </p>
              </div>
              <div className="rounded-lg bg-indigo-50 dark:bg-indigo-900/20 p-2">
                <Bell className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Read</p>
                <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                  {notifications.filter(n => n.read).length}
                </p>
              </div>
              <div className="rounded-lg bg-green-50 dark:bg-green-900/20 p-2">
                <CheckCheck className="h-5 w-5 text-green-600 dark:text-green-400" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <NotificationList
        notifications={notifications}
        onMarkAsRead={handleMarkAsRead}
        onMarkAllAsRead={handleMarkAllAsRead}
        onDelete={handleDelete}
      />
    </div>
  )
}

export default Notifications