import React from 'react'
import { Link } from 'react-router-dom'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { 
  FileQuestion, 
  Clock, 
  Users, 
  Star, 
  PlayCircle,
  CheckCircle,
  Award,
  AlertCircle
} from 'lucide-react'
import { cn } from '@/lib/utils'

export const AssessmentCard = ({
  assessment,
  variant = 'grid',
  showProgress = false,
  onStart,
  onContinue,
}) => {
  const {
    id,
    title,
    description,
    type,
    totalQuestions,
    duration,
    passingScore,
    attempts,
    status,
    progress,
    score,
    dueDate,
    difficulty,
  } = assessment

  const getStatusColor = (status) => {
    const statuses = {
      'not-started': 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300',
      'in-progress': 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-400',
      'completed': 'bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400',
      'failed': 'bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-400',
      'locked': 'bg-gray-100 text-gray-500 dark:bg-gray-800 dark:text-gray-500',
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

  if (variant === 'list') {
    return (
      <Card className="hover:shadow-md transition-shadow">
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">
                    {title}
                  </h3>
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
                <Button variant="outline" asChild>
                  <Link to={`/assessment/${id}/results`}>View Results</Link>
                </Button>
              ) : status === 'in-progress' ? (
                <Button onClick={onContinue}>
                  <PlayCircle className="mr-2 h-4 w-4" />
                  Continue
                </Button>
              ) : status === 'locked' ? (
                <Button disabled>
                  <AlertCircle className="mr-2 h-4 w-4" />
                  Locked
                </Button>
              ) : (
                <Button onClick={onStart}>
                  Start Assessment
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
      <div className="p-6">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <h3 className="font-semibold text-gray-900 dark:text-white">
                {title}
              </h3>
              <Badge className={cn("text-xs", getStatusColor(status))}>
                {status?.replace('-', ' ').toUpperCase()}
              </Badge>
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              {description}
            </p>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-4">
          <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
            <FileQuestion className="h-4 w-4" />
            <span>{totalQuestions} Questions</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
            <Clock className="h-4 w-4" />
            <span>{duration}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
            <Badge className={cn("text-xs", getDifficultyColor(difficulty))}>
              {difficulty}
            </Badge>
          </div>
          {score !== undefined && (
            <div className="flex items-center gap-2 text-sm text-green-600 dark:text-green-400">
              <Award className="h-4 w-4" />
              <span>Score: {score}%</span>
            </div>
          )}
        </div>

        {showProgress && (
          <div className="mt-4">
            <Progress value={progress || 0} className="h-2" />
            <p className="text-xs text-gray-400 mt-1">
              {progress || 0}% Complete
            </p>
          </div>
        )}

        <div className="mt-4 flex gap-2">
          {status === 'completed' ? (
            <Button variant="outline" className="w-full" asChild>
              <Link to={`/assessment/${id}/results`}>View Results</Link>
            </Button>
          ) : status === 'in-progress' ? (
            <Button className="w-full" onClick={onContinue}>
              <PlayCircle className="mr-2 h-4 w-4" />
              Continue Assessment
            </Button>
          ) : status === 'locked' ? (
            <Button className="w-full" disabled>
              <AlertCircle className="mr-2 h-4 w-4" />
              Locked
            </Button>
          ) : (
            <Button className="w-full" onClick={onStart}>
              Start Assessment
            </Button>
          )}
        </div>
      </div>
    </Card>
  )
}

export default AssessmentCard