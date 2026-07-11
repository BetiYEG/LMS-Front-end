// src/components/dashboard/RecentActivities/RecentActivities.jsx
import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { 
  Clock, 
  PlusCircle,
  CheckCircle,
  BookOpen,
  ArrowRight
} from 'lucide-react'
import { Link } from 'react-router-dom'
import { cn } from '@/lib/utils'

export const RecentActivities = ({ activities }) => {
  const recentActivities = [
    {
      id: 1,
      icon: PlusCircle,
      title: 'course add',
      time: 'Yesterday',
    },
    {
      id: 2,
      icon: CheckCircle,
      title: 'Completed Lesson 5',
      time: 'Yesterday',
    },
    {
      id: 3,
      icon: PlusCircle,
      title: 'course add',
      time: 'Yesterday',
    },
  ]

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-xl font-semibold text-gray-900 dark:text-white">
          Recently Activity
        </CardTitle>
        <Link to="/activities" className="text-sm text-indigo-600 hover:text-indigo-700 font-medium">
          View all →
        </Link>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {recentActivities.map((activity) => {
            const Icon = activity.icon
            return (
              <div
                key={activity.id}
                className="flex items-center gap-3 rounded-lg p-3 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
              >
                <div className="rounded-lg bg-indigo-50 dark:bg-indigo-900/20 p-2">
                  <Icon className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    {activity.title}
                  </p>
                </div>
                <span className="text-xs text-gray-400">
                  {activity.time}
                </span>
                <ArrowRight className="h-4 w-4 text-gray-300" />
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}

export default RecentActivities