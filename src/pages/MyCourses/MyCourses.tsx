import React from 'react'
import { Link } from 'react-router-dom'

const MyCourses = () => {
  const courses = [
    { id: 1, title: 'Misooma Gahumsa Hooggansa Barnoota-KUTAA-1', progress: 75, total: 74 },
    { id: 2, title: 'Mobile Video Editing Course', progress: 46, total: 50 },
    { id: 3, title: 'Dagaagina Ga\'umsa', progress: 30, total: 50 },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          My Learning
        </h1>
        <p className="text-gray-600 dark:text-gray-300 mt-1">
          Track your progress and continue learning
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {courses.map((course) => (
          <Link
            key={course.id}
            to={`/course/${course.id}`}
            className="block bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow"
          >
            <h3 className="font-semibold text-gray-900 dark:text-white">
              {course.title}
            </h3>
            <div className="mt-3 flex items-center gap-3">
              <div className="flex-1 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-indigo-600 rounded-full transition-all"
                  style={{ width: `${course.progress}%` }}
                />
              </div>
              <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
                {course.progress}%
              </span>
            </div>
            <p className="text-xs text-gray-400 mt-2">
              {course.progress}% complete • {course.total} lessons
            </p>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default MyCourses