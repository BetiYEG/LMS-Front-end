import React from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  Award, 
  Star, 
  Trophy, 
  Target, 
  BookOpen, 
  Clock,
  Zap,
  Medal,
  CheckCircle,
  Lock,
  Sparkles,
  TrendingUp
} from 'lucide-react'
import { cn } from '@/lib/utils'

export const AchievementBadge = ({
  achievement,
  variant = 'card', // 'card', 'badge', 'compact'
  showProgress = false,
  className,
}) => {
  const {
    id,
    title,
    description,
    icon,
    points,
    unlocked,
    unlockedAt,
    progress,
    target,
    category,
    rarity, // 'common', 'uncommon', 'rare', 'epic', 'legendary'
  } = achievement

  const getIcon = () => {
    const icons = {
      'award': Award,
      'star': Star,
      'trophy': Trophy,
      'target': Target,
      'book': BookOpen,
      'clock': Clock,
      'zap': Zap,
      'medal': Medal,
      'sparkles': Sparkles,
      'trending': TrendingUp,
    }
    const Icon = icons[icon] || Award
    return <Icon className="h-8 w-8" />
  }

  const getRarityColor = () => {
    const colors = {
      'common': 'border-gray-300 bg-gray-50 dark:bg-gray-800 dark:border-gray-600',
      'uncommon': 'border-green-300 bg-green-50 dark:bg-green-900/20 dark:border-green-700',
      'rare': 'border-blue-300 bg-blue-50 dark:bg-blue-900/20 dark:border-blue-700',
      'epic': 'border-purple-300 bg-purple-50 dark:bg-purple-900/20 dark:border-purple-700',
      'legendary': 'border-yellow-300 bg-yellow-50 dark:bg-yellow-900/20 dark:border-yellow-700',
    }
    return colors[rarity] || colors.common
  }

  const getRarityBadgeColor = () => {
    const colors = {
      'common': 'bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300',
      'uncommon': 'bg-green-200 text-green-700 dark:bg-green-900 dark:text-green-300',
      'rare': 'bg-blue-200 text-blue-700 dark:bg-blue-900 dark:text-blue-300',
      'epic': 'bg-purple-200 text-purple-700 dark:bg-purple-900 dark:text-purple-300',
      'legendary': 'bg-yellow-200 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300',
    }
    return colors[rarity] || colors.common
  }

  const getRarityLabel = () => {
    return rarity?.charAt(0).toUpperCase() + rarity?.slice(1) || 'Common'
  }

  if (variant === 'badge') {
    return (
      <div className={cn(
        "flex items-center gap-2 rounded-full px-3 py-1.5 border",
        unlocked ? getRarityColor() : "border-gray-200 bg-gray-100 dark:bg-gray-800 dark:border-gray-600",
        className
      )}>
        <div className={cn(
          "text-gray-500",
          unlocked && "text-gray-700 dark:text-gray-300"
        )}>
          {getIcon()}
        </div>
        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
          {title}
        </span>
        {points && (
          <Badge variant="outline" className="text-xs">
            {points} pts
          </Badge>
        )}
        {!unlocked && <Lock className="h-3 w-3 text-gray-400" />}
      </div>
    )
  }

  if (variant === 'compact') {
    return (
      <div className={cn(
        "flex items-center gap-3 p-3 rounded-lg border",
        unlocked ? getRarityColor() : "border-gray-200 bg-gray-50 dark:bg-gray-800 dark:border-gray-600",
        className
      )}>
        <div className={cn(
          "rounded-full p-2",
          unlocked ? "bg-white dark:bg-gray-700" : "bg-gray-200 dark:bg-gray-600"
        )}>
          {getIcon()}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <p className="text-sm font-medium text-gray-900 dark:text-white">
              {title}
            </p>
            <Badge className={cn("text-xs", getRarityBadgeColor())}>
              {getRarityLabel()}
            </Badge>
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
            {description}
          </p>
        </div>
        {unlocked && points && (
          <Badge variant="outline" className="text-xs">
            {points} pts
          </Badge>
        )}
        {!unlocked && <Lock className="h-4 w-4 text-gray-400" />}
      </div>
    )
  }

  return (
    <Card className={cn(
      "overflow-hidden transition-all hover:shadow-md",
      unlocked ? getRarityColor() : "border-gray-200 bg-gray-50 dark:bg-gray-800 dark:border-gray-600 opacity-60",
      className
    )}>
      <CardContent className="p-6 text-center">
        <div className="flex flex-col items-center">
          {/* Icon */}
          <div className={cn(
            "relative rounded-full p-4",
            unlocked ? "bg-white dark:bg-gray-700 shadow-md" : "bg-gray-200 dark:bg-gray-600"
          )}>
            <div className={cn(
              unlocked ? "text-gray-700 dark:text-gray-300" : "text-gray-400 dark:text-gray-500"
            )}>
              {getIcon()}
            </div>
            {unlocked && (
              <div className="absolute -top-1 -right-1">
                <CheckCircle className="h-5 w-5 text-green-500" />
              </div>
            )}
          </div>

          {/* Title */}
          <h3 className="mt-3 font-semibold text-gray-900 dark:text-white">
            {title}
          </h3>

          {/* Description */}
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            {description}
          </p>

          {/* Badges */}
          <div className="mt-3 flex flex-wrap items-center justify-center gap-2">
            <Badge className={cn("text-xs", getRarityBadgeColor())}>
              {getRarityLabel()}
            </Badge>
            {points && (
              <Badge variant="outline" className="text-xs">
                {points} Points
              </Badge>
            )}
            {category && (
              <Badge variant="secondary" className="text-xs">
                {category}
              </Badge>
            )}
          </div>

          {/* Progress */}
          {showProgress && !unlocked && progress !== undefined && target && (
            <div className="mt-3 w-full">
              <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
                <span>Progress</span>
                <span>{Math.min(Math.round((progress / target) * 100), 100)}%</span>
              </div>
              <div className="mt-1 h-1.5 w-full rounded-full bg-gray-200 dark:bg-gray-700">
                <div 
                  className="h-full rounded-full bg-indigo-600 transition-all"
                  style={{ width: `${Math.min((progress / target) * 100, 100)}%` }}
                />
              </div>
            </div>
          )}

          {/* Unlocked info */}
          {unlocked && unlockedAt && (
            <p className="mt-2 text-xs text-gray-400">
              Unlocked {new Date(unlockedAt).toLocaleDateString()}
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

export default AchievementBadge