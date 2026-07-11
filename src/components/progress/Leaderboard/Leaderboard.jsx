import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { 
  Trophy, 
  Medal, 
  Crown, 
  Star, 
  TrendingUp,
  ArrowUp,
  ArrowDown,
  Minus,
  Award,
  Clock,
  Users,
  ChevronRight
} from 'lucide-react'
import { cn } from '@/lib/utils'

export const Leaderboard = ({
  data,
  title = 'Leaderboard',
  type = 'global', // 'global', 'friends', 'course'
  limit = 10,
  showAll = true,
  onViewAll,
  className,
}) => {
  const [viewAll, setViewAll] = useState(false)

  // Mock data - replace with actual data
  const leaderboardData = data || [
    { 
      id: 1, 
      name: 'Abdi Ali', 
      points: 2450, 
      level: 42, 
      streak: 15,
      avatar: '/avatars/1.jpg',
      rank: 1,
      trend: 'up',
      coursesCompleted: 12,
      badges: 24,
    },
    { 
      id: 2, 
      name: 'Sara Ahmed', 
      points: 2100, 
      level: 38, 
      streak: 12,
      avatar: '/avatars/2.jpg',
      rank: 2,
      trend: 'up',
      coursesCompleted: 10,
      badges: 20,
    },
    { 
      id: 3, 
      name: 'Mohamed Hussein', 
      points: 1850, 
      level: 35, 
      streak: 8,
      avatar: '/avatars/3.jpg',
      rank: 3,
      trend: 'down',
      coursesCompleted: 8,
      badges: 18,
    },
    { 
      id: 4, 
      name: 'Fatima Ibrahim', 
      points: 1600, 
      level: 32, 
      streak: 5,
      avatar: '/avatars/4.jpg',
      rank: 4,
      trend: 'same',
      coursesCompleted: 7,
      badges: 15,
    },
    { 
      id: 5, 
      name: 'Khalid Omar', 
      points: 1450, 
      level: 30, 
      streak: 4,
      avatar: '/avatars/5.jpg',
      rank: 5,
      trend: 'down',
      coursesCompleted: 6,
      badges: 12,
    },
  ]

  const displayData = viewAll ? leaderboardData : leaderboardData.slice(0, limit)

  const getRankIcon = (rank) => {
    switch (rank) {
      case 1:
        return <Crown className="h-5 w-5 text-yellow-500" />
      case 2:
        return <Medal className="h-5 w-5 text-gray-400" />
      case 3:
        return <Medal className="h-5 w-5 text-amber-600" />
      default:
        return <span className="text-sm font-medium text-gray-400">#{rank}</span>
    }
  }

  const getTrendIcon = (trend) => {
    switch (trend) {
      case 'up':
        return <ArrowUp className="h-4 w-4 text-green-500" />
      case 'down':
        return <ArrowDown className="h-4 w-4 text-red-500" />
      default:
        return <Minus className="h-4 w-4 text-gray-400" />
    }
  }

  const getInitials = (name) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
  }

  return (
    <Card className={cn("overflow-hidden", className)}>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="flex items-center gap-2">
          <Trophy className="h-5 w-5 text-yellow-500" />
          {title}
          {type === 'friends' && (
            <Badge variant="outline" className="ml-2 text-xs">
              <Users className="mr-1 h-3 w-3" />
              Friends
            </Badge>
          )}
        </CardTitle>
        {showAll && leaderboardData.length > limit && (
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => {
              if (viewAll) {
                setViewAll(false)
              } else {
                setViewAll(true)
                onViewAll?.()
              }
            }}
          >
            {viewAll ? 'Show Less' : 'View All'}
            <ChevronRight className={cn(
              "ml-1 h-4 w-4 transition-transform",
              viewAll && "rotate-90"
            )} />
          </Button>
        )}
      </CardHeader>

      <CardContent>
        {/* Top 3 Highlights */}
        {!viewAll && leaderboardData.length >= 3 && (
          <div className="mb-6 grid grid-cols-3 gap-4">
            {leaderboardData.slice(0, 3).map((user) => (
              <div
                key={user.id}
                className="flex flex-col items-center p-3 rounded-lg bg-gray-50 dark:bg-gray-800/50"
              >
                <div className="relative">
                  <Avatar className="h-14 w-14 border-2 border-indigo-200 dark:border-indigo-800">
                    <AvatarImage src={user.avatar} />
                    <AvatarFallback className="bg-indigo-100 text-indigo-700 dark:bg-indigo-900 dark:text-indigo-300">
                      {getInitials(user.name)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="absolute -top-1 -right-1">
                    {getRankIcon(user.rank)}
                  </div>
                </div>
                <p className="mt-2 text-sm font-medium text-gray-900 dark:text-white text-center">
                  {user.name}
                </p>
                <div className="flex items-center gap-1">
                  <Star className="h-3 w-3 text-yellow-400 fill-current" />
                  <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                    {user.points}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* List */}
        <div className="space-y-2">
          {displayData.map((user) => (
            <div
              key={user.id}
              className={cn(
                "flex items-center gap-3 rounded-lg p-3 transition-colors",
                user.rank <= 3 && !viewAll 
                  ? "bg-gradient-to-r from-indigo-50/50 to-transparent dark:from-indigo-900/10"
                  : "hover:bg-gray-50 dark:hover:bg-gray-800/50"
              )}
            >
              {/* Rank */}
              <div className="flex w-8 items-center justify-center">
                {getRankIcon(user.rank)}
              </div>

              {/* Avatar */}
              <Avatar className="h-10 w-10">
                <AvatarImage src={user.avatar} />
                <AvatarFallback className="bg-indigo-100 text-indigo-700 dark:bg-indigo-900 dark:text-indigo-300">
                  {getInitials(user.name)}
                </AvatarFallback>
              </Avatar>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                    {user.name}
                  </p>
                  {user.rank === 1 && (
                    <Badge className="bg-yellow-500 text-white text-xs">
                      #1
                    </Badge>
                  )}
                  {user.streak >= 10 && (
                    <Badge variant="outline" className="text-xs border-orange-400 text-orange-600 dark:border-orange-600 dark:text-orange-400">
                      🔥 {user.streak} day streak
                    </Badge>
                  )}
                </div>
                <div className="flex flex-wrap items-center gap-3 text-xs text-gray-500 dark:text-gray-400">
                  <span className="flex items-center gap-1">
                    <Award className="h-3 w-3" />
                    {user.badges} badges
                  </span>
                  <span className="flex items-center gap-1">
                    <BookOpen className="h-3 w-3" />
                    {user.coursesCompleted} courses
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    Level {user.level}
                  </span>
                </div>
              </div>

              {/* Points & Trend */}
              <div className="flex flex-col items-end">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold text-gray-900 dark:text-white">
                    {user.points}
                  </span>
                  {getTrendIcon(user.trend)}
                </div>
                <span className="text-xs text-gray-400">points</span>
              </div>
            </div>
          ))}
        </div>

        {/* Your Rank */}
        {type === 'global' && (
          <div className="mt-4 rounded-lg border border-indigo-200 dark:border-indigo-800 bg-indigo-50 dark:bg-indigo-900/20 p-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Badge className="bg-indigo-500 text-white">Your Rank</Badge>
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  #8 of 1,234 learners
                </span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <span className="text-gray-600 dark:text-gray-400">1,850 pts</span>
                <TrendingUp className="h-4 w-4 text-green-500" />
                <span className="text-green-500 text-xs">+12%</span>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

export default Leaderboard