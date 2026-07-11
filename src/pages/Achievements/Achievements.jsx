import React, { useState } from 'react'
import { AchievementBadge } from '@/components/progress'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { Award, Lock, Sparkles } from 'lucide-react'

export const Achievements = () => {
  const [activeTab, setActiveTab] = useState('all')

  // Mock data - replace with actual data
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
    {
      id: 2,
      title: '10 Lessons Mastered',
      description: 'Completed 10 lessons',
      icon: 'star',
      points: 150,
      unlocked: true,
      unlockedAt: '2024-05-05',
      rarity: 'uncommon',
      category: 'Lessons',
    },
    {
      id: 3,
      title: '7 Day Streak',
      description: 'Active for 7 consecutive days',
      icon: 'zap',
      points: 200,
      unlocked: false,
      progress: 5,
      target: 7,
      rarity: 'rare',
      category: 'Streak',
    },
    {
      id: 4,
      title: 'Perfect Score',
      description: 'Scored 100% on an assessment',
      icon: 'target',
      points: 250,
      unlocked: false,
      progress: 80,
      target: 100,
      rarity: 'epic',
      category: 'Assessment',
    },
    {
      id: 5,
      title: 'Course Master',
      description: 'Completed 10 courses',
      icon: 'medal',
      points: 500,
      unlocked: false,
      progress: 6,
      target: 10,
      rarity: 'legendary',
      category: 'Course',
    },
  ]

  const unlocked = achievements.filter(a => a.unlocked)
  const locked = achievements.filter(a => !a.unlocked)

  const filteredAchievements = activeTab === 'all' 
    ? achievements 
    : activeTab === 'unlocked' 
      ? unlocked 
      : locked

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Achievements
        </h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">
          Track your progress and earn badges
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-indigo-50 dark:bg-indigo-900/20 p-2">
                <Award className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Total Achievements</p>
                <p className="text-xl font-bold text-gray-900 dark:text-white">
                  {achievements.length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-green-50 dark:bg-green-900/20 p-2">
                <Sparkles className="h-5 w-5 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Unlocked</p>
                <p className="text-xl font-bold text-green-600 dark:text-green-400">
                  {unlocked.length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-gray-50 dark:bg-gray-800 p-2">
                <Lock className="h-5 w-5 text-gray-500" />
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Locked</p>
                <p className="text-xl font-bold text-gray-500">
                  {locked.length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="unlocked">
            Unlocked
            <Badge variant="secondary" className="ml-2 text-xs">
              {unlocked.length}
            </Badge>
          </TabsTrigger>
          <TabsTrigger value="locked">
            Locked
            <Badge variant="secondary" className="ml-2 text-xs">
              {locked.length}
            </Badge>
          </TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="mt-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredAchievements.map((achievement) => (
              <AchievementBadge
                key={achievement.id}
                achievement={achievement}
                showProgress={true}
                variant="card"
              />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default Achievements