import React from 'react'
import { CourseCard } from '../CourseCard'

export const CourseGrid = ({ 
  courses, 
  variant = 'grid',
  showProgress = false,
  columns = 3,
  onContinue,
}) => {
  if (!courses || courses.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 dark:text-gray-400">No courses found</p>
      </div>
    )
  }

  return (
    <div className={cn(
      'grid gap-6',
      variant === 'grid' ? `grid-cols-1 sm:grid-cols-2 lg:grid-cols-${columns}` : 'grid-cols-1'
    )}>
      {courses.map((course) => (
        <CourseCard
          key={course.id}
          course={course}
          variant={variant}
          showProgress={showProgress}
          onContinue={() => onContinue?.(course.id)}
        />
      ))}
    </div>
  )
}

export default CourseGrid