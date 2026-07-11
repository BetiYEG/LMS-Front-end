import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { 
  Clock, 
  BookOpen, 
  CheckCircle, 
  Calendar,
  Award,
  TrendingUp
} from 'lucide-react'

export const CourseProgress = ({ course }) => {
  const {
    title,
    progress = 75,
    completed_lessons = 9,
    total_lessons = 12,
    time_spent = '12h 45m',
    last_activity = 'May 8, 2024',
    certificate = false,
  } = course

  const progressData = [
    {
      icon: CheckCircle,
      label: 'Progress',
      value: `${progress}%`,
      description: `${completed_lessons} of ${total_lessons} lessons completed`,
    },
    {
      icon: Clock,
      label: 'Time Spent',
      value: time_spent,
      description: 'Total learning time',
    },
    {
      icon: Calendar,
      label: 'Last Activity',
      value: last_activity,
      description: 'Your last interaction',
    },
    {
      icon: Award,
      label: 'Certificate',
      value: certificate ? 'Earned' : 'Not Yet',
      description: certificate ? 'Certificate available' : 'Complete course to earn',
    },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Your Progress</span>
          <Badge variant="outline" className="text-lg">
            {progress}%
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Main Progress Bar */}
        <div>
          <div className="flex justify-between text-sm mb-2">
            <span className="text-gray-500 dark:text-gray-400">Overall Progress</span>
            <span className="font-medium">{progress}%</span>
          </div>
          <Progress value={progress} className="h-3" />
          <div className="mt-2 flex justify-between text-xs text-gray-400">
            <span>Started</span>
            <span>{completed_lessons} of {total_lessons} lessons</span>
          </div>
        </div>

        {/* Progress Stats Grid */}
        <div className="grid grid-cols-2 gap-4">
          {progressData.map((stat, index) => {
            const Icon = stat.icon
            return (
              <div key={index} className="rounded-lg border p-3">
                <div className="flex items-start gap-3">
                  <div className="rounded-lg bg-indigo-50 dark:bg-indigo-900/20 p-2">
                    <Icon className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {stat.label}
                    </p>
                    <p className="text-sm font-semibold text-gray-900 dark:text-white">
                      {stat.value}
                    </p>
                    <p className="text-xs text-gray-400 mt-0.5">
                      {stat.description}
                    </p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Quick Stats */}
        <div className="flex flex-wrap gap-4 pt-2 border-t text-sm">
          <div className="flex items-center gap-2">
            <BookOpen className="h-4 w-4 text-gray-400" />
            <span className="text-gray-600 dark:text-gray-300">
              {total_lessons} Total Lessons
            </span>
          </div>
          <div className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-gray-400" />
            <span className="text-gray-600 dark:text-gray-300">
              {Math.round(progress / 10)}% Weekly Growth
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default CourseProgress