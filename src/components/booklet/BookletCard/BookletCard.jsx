import React from 'react'
import { Link } from 'react-router-dom'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { 
  BookOpen, 
  Clock, 
  FileQuestion, 
  Users, 
  Star,
  PlayCircle,
  CheckCircle,
  Lock,
  Award,
  Calendar,
  TrendingUp
} from 'lucide-react'
import { cn } from '@/lib/utils'

export const BookletCard = ({
  booklet,
  variant = 'grid',
  showProgress = false,
  onStart,
  onContinue,
}) => {
  const {
    id,
    title,
    description,
    subject,
    grade,
    totalQuestions,
    duration,
    difficulty,
    status,
    progress,
    score,
    attempts,
    rating,
    reviews,
    dueDate,
    type,
  } = booklet

  const getStatusColor = (status) => {
    const statuses = {
      'not-started': 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300',
      'in-progress': 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-400',
      'completed': 'bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400',
      'locked': 'bg-gray-100 text-gray-500 dark:bg-gray-800 dark:text-gray-500',
      'expired': 'bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-400',
    }
    return statuses[status] || statuses['not-started']
  }

  const getDifficultyColor = (difficulty) => {
    const levels = {
      'easy': 'bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400',
      'medium': 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-400',
      'hard': 'bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-400',
    }
    return levels[difficulty] || levels.medium
  }

  const getTypeIcon = (type) => {
    const types = {
      'mock': Award,
      'exercise': BookOpen,
      'exam': FileQuestion,
      'practice': TrendingUp,
    }
    return types[type] || BookOpen
  }

  const TypeIcon = getTypeIcon(type)

  if (variant === 'list') {
    return (
      <Card className="hover:shadow-md transition-shadow">
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <TypeIcon className="h-4 w-4 text-indigo-600" />
                    <h3 className="font-semibold text-gray-900 dark:text-white">
                      {title}
                    </h3>
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    {description}
                  </p>
                </div>
                <Badge className={cn("ml-2", getStatusColor(status))}>
                  {status?.replace('-', ' ').toUpperCase()}
                </Badge>
              </div>
              <div className="mt-2 flex flex-wrap items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                <span className="flex items-center gap-1">
                  <FileQuestion className="h-4 w-4" />
                  {totalQuestions} Questions
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  {duration}
                </span>
                <Badge className={cn("text-xs", getDifficultyColor(difficulty))}>
                  {difficulty}
                </Badge>
                <span className="flex items-center gap-1">
                  <Users className="h-4 w-4" />
                  {subject}
                </span>
                {rating && (
                  <span className="flex items-center gap-1">
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    {rating} ({reviews})
                  </span>
                )}
                {score !== undefined && (
                  <span className="flex items-center gap-1 text-green-600 dark:text-green-400">
                    <Award className="h-4 w-4" />
                    Score: {score}%
                  </span>
                )}
              </div>
              {showProgress && (
                <div className="mt-3">
                  <Progress value={progress || 0} className="h-2" />
                </div>
              )}
            </div>
            <div className="flex items-center gap-2">
              {status === 'completed' ? (
                <Button variant="outline" size="sm" asChild>
                  <Link to={`/booklet/${id}/results`}>View Results</Link>
                </Button>
              ) : status === 'in-progress' ? (
                <Button size="sm" onClick={onContinue}>
                  <PlayCircle className="mr-2 h-4 w-4" />
                  Continue
                </Button>
              ) : status === 'locked' || status === 'expired' ? (
                <Button size="sm" disabled>
                  <Lock className="mr-2 h-4 w-4" />
                  {status === 'expired' ? 'Expired' : 'Locked'}
                </Button>
              ) : (
                <Button size="sm" onClick={onStart}>
                  Start Booklet
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow group">
      {/* Card Header with gradient */}
      <div className={cn(
        "h-2",
        status === 'completed' ? "bg-green-500" :
        status === 'in-progress' ? "bg-yellow-500" :
        status === 'locked' ? "bg-gray-400" :
        "bg-indigo-500"
      )} />

      <CardHeader className="pb-2">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <TypeIcon className="h-4 w-4 text-indigo-600" />
              <h3 className="font-semibold text-gray-900 dark:text-white line-clamp-1">
                {title}
              </h3>
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 line-clamp-2">
              {description}
            </p>
          </div>
          <Badge className={cn("ml-2", getStatusColor(status))}>
            {status?.replace('-', ' ').toUpperCase()}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="pb-2">
        <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500 dark:text-gray-400">
          <span className="flex items-center gap-1">
            <FileQuestion className="h-4 w-4" />
            {totalQuestions} Qs
          </span>
          <span className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            {duration}
          </span>
          <Badge className={cn("text-xs", getDifficultyColor(difficulty))}>
            {difficulty}
          </Badge>
        </div>

        <div className="mt-2 flex items-center justify-between">
          <span className="text-xs text-gray-400">{subject}</span>
          {rating && (
            <span className="flex items-center gap-1 text-xs">
              <Star className="h-3 w-3 text-yellow-400 fill-current" />
              {rating} ({reviews})
            </span>
          )}
        </div>

        {showProgress && (
          <div className="mt-3">
            <div className="flex justify-between text-xs mb-1">
              <span className="text-gray-500 dark:text-gray-400">Progress</span>
              <span className="font-medium">{progress || 0}%</span>
            </div>
            <Progress value={progress || 0} className="h-2" />
          </div>
        )}

        {dueDate && (
          <div className="mt-2 flex items-center gap-1 text-xs text-gray-400">
            <Calendar className="h-3 w-3" />
            Due: {dueDate}
          </div>
        )}
      </CardContent>

      <CardFooter className="pt-2">
        <div className="flex w-full gap-2">
          {status === 'completed' ? (
            <Button variant="outline" className="flex-1" asChild>
              <Link to={`/booklet/${id}/results`}>View Results</Link>
            </Button>
          ) : status === 'in-progress' ? (
            <Button className="flex-1" onClick={onContinue}>
              <PlayCircle className="mr-2 h-4 w-4" />
              Continue
            </Button>
          ) : status === 'locked' || status === 'expired' ? (
            <Button className="flex-1" disabled>
              <Lock className="mr-2 h-4 w-4" />
              {status === 'expired' ? 'Expired' : 'Locked'}
            </Button>
          ) : (
            <Button className="flex-1" onClick={onStart}>
              Start Booklet
            </Button>
          )}
        </div>
      </CardFooter>
    </Card>
  )
}

export default BookletCard