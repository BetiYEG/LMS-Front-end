import React from 'react'
import { TrendingUp, Award, BookOpen, Clock } from 'lucide-react'

const MyProgress = () => {
  const stats = [
    { label: 'Overall Progress', value: '65%', icon: TrendingUp, color: 'text-indigo-600' },
    { label: 'Achievements', value: '24', icon: Award, color: 'text-purple-600' },
    { label: 'Courses Completed', value: '5', icon: BookOpen, color: 'text-green-600' },
    { label: 'Hours Spent', value: '48.5', icon: Clock, color: 'text-orange-600' },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          My Progress
        </h1>
        <p className="text-gray-600 dark:text-gray-300 mt-1">
          Track your learning journey and achievements
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <div key={stat.label} className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
              <Icon className={`h-5 w-5 ${stat.color} mb-2`} />
              <p className="text-xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">{stat.label}</p>
            </div>
          )
        })}
      </div>

      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
        <h3 className="font-semibold text-gray-900 dark:text-white mb-4">
          Recent Activity
        </h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between py-2 border-b border-gray-100 dark:border-gray-700">
            <span className="text-gray-600 dark:text-gray-300">Completed Lesson 5</span>
            <span className="text-sm text-gray-400">2 hours ago</span>
          </div>
          <div className="flex items-center justify-between py-2 border-b border-gray-100 dark:border-gray-700">
            <span className="text-gray-600 dark:text-gray-300">Started New Course</span>
            <span className="text-sm text-gray-400">Yesterday</span>
          </div>
          <div className="flex items-center justify-between py-2">
            <span className="text-gray-600 dark:text-gray-300">Earned Achievement</span>
            <span className="text-sm text-gray-400">2 days ago</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MyProgress