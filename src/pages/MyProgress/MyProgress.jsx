import React, { useState } from 'react'
import { Search, Filter, ChevronDown, Grid, List, BookOpen, Clock, CheckCircle, TrendingUp } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ProgressBar, AchievementBadge, Leaderboard } from '@/components/progress'

export const MyProgress = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [viewMode, setViewMode] = useState('grid')

  // Mock data
  const coursesInProgress = [
    {
      id: 1,
      title: 'Mobile Video Editing Course',
      description: 'Zero to Hero',
      progress: 40,
      totalLessons: 12,
      completedLessons: 5,
      timeSpent: '12h 30m',
      lastActivity: 'Today',
      level: 'intermediate',
    },
    // Add more courses...
  ]

  const achievements = [
    {
      id: 1,
      title: 'First Course Completed',
      description: 'Completed your first course',
      icon: 'trophy',
      points: 100,
      unlocked: true,
      unlockedAt: '2024-05-01',
      rarity: 'common',
      category: 'Course',
    },
    // Add more achievements...
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          My Learning Progress
        </h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">
          Track your learning and continue where you left off.
        </p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-indigo-50 dark:bg-indigo-900/20 p-2">
                <BookOpen className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">In Progress</p>
                <p className="text-xl font-bold text-gray-900 dark:text-white">12</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-green-50 dark:bg-green-900/20 p-2">
                <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Completed</p>
                <p className="text-xl font-bold text-gray-900 dark:text-white">24</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-purple-50 dark:bg-purple-900/20 p-2">
                <TrendingUp className="h-5 w-5 text-purple-600 dark:text-purple-400" />
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Average Progress</p>
                <p className="text-xl font-bold text-gray-900 dark:text-white">65%</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-yellow-50 dark:bg-yellow-900/20 p-2">
                <Clock className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Total Hours</p>
                <p className="text-xl font-bold text-gray-900 dark:text-white">48.5h</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="courses" className="space-y-6">
        <TabsList>
          <TabsTrigger value="courses">Courses</TabsTrigger>
          <TabsTrigger value="achievements">Achievements</TabsTrigger>
          <TabsTrigger value="leaderboard">Leaderboard</TabsTrigger>
        </TabsList>

        <TabsContent value="courses" className="space-y-4">
          {coursesInProgress.map((course) => (
            <Card key={course.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex flex-col md:flex-row md:items-center gap-4">
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 dark:text-white">
                      {course.title}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {course.description}
                    </p>
                    <div className="mt-2">
                      <ProgressBar
                        label={`${course.progress}% Complete`}
                        value={course.progress}
                        variant="course"
                        details={{
                          lessonsCompleted: course.completedLessons,
                          totalLessons: course.totalLessons,
                          timeSpent: course.timeSpent,
                          lastActivity: course.lastActivity,
                        }}
                      />
                    </div>
                  </div>
                  <Button className="shrink-0">Continue</Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="achievements">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {achievements.map((achievement) => (
              <AchievementBadge
                key={achievement.id}
                achievement={achievement}
                showProgress={true}
              />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="leaderboard">
          <Leaderboard type="global" />
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default MyProgress