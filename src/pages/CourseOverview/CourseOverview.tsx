import React from 'react'
import { useParams, Link } from 'react-router-dom'
import { ArrowLeft, Clock, BookOpen, Users, Star, PlayCircle } from 'lucide-react'

const CourseOverview = () => {
  const { id } = useParams()
  
  const course = {
    id: 1,
    title: 'Misooma Gahumsa Hooggansa Barnoota-KUTAA-1',
    duration: '18h 34m',
    modules: 12,
    language: 'Oromoo',
    certificate: 'Yes',
    progress: 75,
    totalLessons: 74,
    completedLessons: 56,
  }

  return (
    <div className="space-y-6">
      <Link to="/my-courses" className="flex items-center gap-2 text-sm text-indigo-600 hover:text-indigo-700">
        <ArrowLeft className="h-4 w-4" />
        My Courses
      </Link>

      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              {course.title}
            </h1>
            <div className="mt-4 flex flex-wrap items-center gap-4 text-sm">
              <span className="flex items-center gap-1 text-gray-500 dark:text-gray-400">
                <Clock className="h-4 w-4" />
                {course.duration}
              </span>
              <span className="flex items-center gap-1 text-gray-500 dark:text-gray-400">
                <BookOpen className="h-4 w-4" />
                {course.modules} Modules
              </span>
              <span className="flex items-center gap-1 text-gray-500 dark:text-gray-400">
                <Users className="h-4 w-4" />
                {course.language}
              </span>
            </div>
          </div>

          <div className="lg:w-64">
            <div className="bg-indigo-50 dark:bg-indigo-900/20 p-4 rounded-lg">
              <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Your Progress
              </h4>
              <div className="flex items-center gap-3">
                <span className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
                  {course.progress}%
                </span>
                <div className="flex-1 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-indigo-600 rounded-full"
                    style={{ width: `${course.progress}%` }}
                  />
                </div>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">
                {course.completedLessons} of {course.totalLessons} lessons completed
              </p>
            </div>
          </div>
        </div>

        <div className="mt-6 flex gap-3">
          <button className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition-colors">
            <PlayCircle className="h-4 w-4" />
            Continue learning
          </button>
        </div>
      </div>
    </div>
  )
}

export default CourseOverview