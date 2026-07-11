import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import {
  BarChart3,
  TrendingUp,
  Users,
  Clock,
  Award,
  Target,
  Calendar,
  ChevronRight
} from 'lucide-react'
import { cn } from '@/lib/utils'

export const Statistics = ({
  statistics,
  className
}) => {
  // Mock statistics - replace with actual data
  const statsData = statistics || {
    totalAttempts: 45,
    averageScore: 72,
    highestScore: 95,
    passingRate: 68,
    totalTimeSpent: '124h 30m',
    averageTimePerQuiz: '2h 45m',
    recentActivities: [
      { date: 'May 8, 2024', score: 85, status: 'passed' },
      { date: 'May 7, 2024', score: 62, status: 'passed' },
      { date: 'May 5, 2024', score: 45, status: 'failed' },
      { date: 'May 3, 2024', score: 78, status: 'passed' },
    ],
    performanceByTopic: [
      { topic: 'Chapter 1', score: 85, questions: 10 },
      { topic: 'Chapter 2', score: 72, questions: 8 },
      { topic: 'Chapter 3', score: 60, questions: 6 },
      { topic: 'Chapter 4', score: 90, questions: 7 },
    ],
  }

  const mainStats = [
    {
      icon: Award,
      label: 'Average Score',
      value: `${statsData.averageScore}%`,
      change: '+5%',
      trend: 'up',
      color: 'text-blue-500',
      bg: 'bg-blue-50 dark:bg-blue-900/20',
    },
    {
      icon: Target,
      label: 'Highest Score',
      value: `${statsData.highestScore}%`,
      change: 'Personal Best',
      trend: 'up',
      color: 'text-green-500',
      bg: 'bg-green-50 dark:bg-green-900/20',
    },
    {
      icon: Users,
      label: 'Passing Rate',
      value: `${statsData.passingRate}%`,
      change: '+3%',
      trend: 'up',
      color: 'text-purple-500',
      bg: 'bg-purple-50 dark:bg-purple-900/20',
    },
    {
      icon: Clock,
      label: 'Total Time Spent',
      value: statsData.totalTimeSpent,
      change: '12 hours this week',
      trend: 'up',
      color: 'text-orange-500',
      bg: 'bg-orange-50 dark:bg-orange-900/20',
    },
  ]

  const getStatusBadge = (status) => {
    return status === 'passed' 
      ? <Badge className="bg-green-500 text-white">Passed</Badge>
      : <Badge className="bg-red-500 text-white">Failed</Badge>
  }

  return (
    <div className={cn("space-y-6", className)}>
      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {mainStats.map((stat, index) => {
          const Icon = stat.icon
          return (
            <Card key={index}>
              <CardContent className="p-4">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {stat.label}
                    </p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">
                      {stat.value}
                    </p>
                    <p className={cn(
                      "text-xs font-medium mt-1",
                      stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
                    )}>
                      {stat.change}
                    </p>
                  </div>
                  <div className={cn("rounded-lg p-3", stat.bg)}>
                    <Icon className={cn("h-5 w-5", stat.color)} />
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Performance by Topic */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-indigo-600" />
              Performance by Topic
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {statsData.performanceByTopic.map((topic, index) => (
                <div key={index}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600 dark:text-gray-300">
                      {topic.topic}
                    </span>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{topic.score}%</span>
                      <span className="text-xs text-gray-400">
                        ({topic.questions} Qs)
                      </span>
                    </div>
                  </div>
                  <Progress 
                    value={topic.score} 
                    className="h-2"
                  />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Activities */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-indigo-600" />
              Recent Activities
            </CardTitle>
            <Badge variant="outline" className="text-xs">
              {statsData.totalAttempts} Total Attempts
            </Badge>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {statsData.recentActivities.map((activity, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 rounded-lg border border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className={cn(
                      "rounded-lg p-2",
                      activity.status === 'passed'
                        ? "bg-green-50 dark:bg-green-900/20"
                        : "bg-red-50 dark:bg-red-900/20"
                    )}>
                      {activity.status === 'passed' ? (
                        <Award className="h-4 w-4 text-green-500" />
                      ) : (
                        <Target className="h-4 w-4 text-red-500" />
                      )}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900 dark:text-white">
                        Assessment
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {activity.date}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <div className="text-sm font-medium">
                        {activity.score}%
                      </div>
                      {getStatusBadge(activity.status)}
                    </div>
                    <ChevronRight className="h-4 w-4 text-gray-400" />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Summary Card */}
      <Card>
        <CardContent className="p-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Total Attempts
              </p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {statsData.totalAttempts}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Average Score
              </p>
              <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                {statsData.averageScore}%
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Passing Rate
              </p>
              <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                {statsData.passingRate}%
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Avg Time per Quiz
              </p>
              <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                {statsData.averageTimePerQuiz}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default Statistics