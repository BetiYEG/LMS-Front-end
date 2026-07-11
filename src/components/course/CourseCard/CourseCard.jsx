import React from 'react'
import { Link } from 'react-router-dom'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { BookOpen, Clock, Users, Star, PlayCircle } from 'lucide-react'
import { cn } from '@/lib/utils'

export const CourseCard = ({ 
  course, 
  variant = 'grid', // 'grid' or 'list'
  showProgress = false,
  onContinue,
}) => {
  const {
    id,
    title,
    description,
    level,
    duration,
    modules,
    language,
    certificate,
    thumbnail,
    instructor,
    rating,
    reviews,
    progress,
    enrolled_students,
    status,
  } = course

  const getLevelColor = (level) => {
    const levels = {
      beginner: 'bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400',
      intermediate: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-400',
      advanced: 'bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-400',
    }
    return levels[level?.toLowerCase()] || levels.beginner
  }

  if (variant === 'list') {
    return (
      <Card className="hover:shadow-md transition-shadow">
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="md:w-48 h-32 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-500 flex-shrink-0" />
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
                {showProgress && (
                  <Badge variant="outline" className="ml-2">
                    {progress}% Complete
                  </Badge>
                )}
              </div>
              <div className="mt-2 flex flex-wrap items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                <span className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  {duration}
                </span>
                <span className="flex items-center gap-1">
                  <BookOpen className="h-4 w-4" />
                  {modules} Modules
                </span>
                <Badge className={cn("text-xs", getLevelColor(level))}>
                  {level}
                </Badge>
              </div>
              {showProgress && (
                <div className="mt-3">
                  <Progress value={progress} className="h-2" />
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow group">
      <div className="relative h-48 bg-gradient-to-r from-indigo-500 to-purple-500">
        {thumbnail && (
          <img src={thumbnail} alt={title} className="h-full w-full object-cover" />
        )}
        {showProgress && (
          <div className="absolute top-2 right-2">
            <Badge variant="secondary" className="bg-white/90 text-gray-700">
              {progress}% Complete
            </Badge>
          </div>
        )}
        <div className="absolute bottom-2 left-2">
          <Badge className={cn("text-xs", getLevelColor(level))}>
            {level}
          </Badge>
        </div>
      </div>
      
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white line-clamp-1">
              {title}
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 line-clamp-2">
              {description}
            </p>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="pb-2">
        <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500 dark:text-gray-400">
          <span className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            {duration}
          </span>
          <span className="flex items-center gap-1">
            <BookOpen className="h-4 w-4" />
            {modules} Modules
          </span>
          {rating && (
            <span className="flex items-center gap-1">
              <Star className="h-4 w-4 text-yellow-400 fill-current" />
              {rating} ({reviews})
            </span>
          )}
        </div>
        
        {instructor && (
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
            By {instructor}
          </p>
        )}
        
        {showProgress && (
          <div className="mt-3">
            <Progress value={progress} className="h-2" />
          </div>
        )}
      </CardContent>
      
      <CardFooter className="pt-2">
        <div className="flex w-full gap-2">
          {showProgress ? (
            <>
              <Button 
                className="flex-1" 
                onClick={onContinue}
              >
                <PlayCircle className="mr-2 h-4 w-4" />
                Continue Learning
              </Button>
              <Button variant="outline" asChild>
                <Link to={`/course/${id}`}>Details</Link>
              </Button>
            </>
          ) : (
            <Button className="w-full" asChild>
              <Link to={`/course/${id}`}>View Course</Link>
            </Button>
          )}
        </div>
      </CardFooter>
    </Card>
  )
}

export default CourseCard