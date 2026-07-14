import React from 'react'
import { useParams, Link } from 'react-router-dom'
import { ArrowLeft, PlayCircle, Clock, FileText, Download, HelpCircle } from 'lucide-react'

const LessonLearning = () => {
  const { courseId, lessonId } = useParams()

  return (
    <div className="space-y-6">
      <Link to={`/course/${courseId}`} className="flex items-center gap-2 text-sm text-indigo-600 hover:text-indigo-700">
        <ArrowLeft className="h-4 w-4" />
        Back to Course
      </Link>

      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Lesson {lessonId}
        </h1>
        <p className="text-gray-500 dark:text-gray-400 mt-2">
          This is where the lesson content will be displayed.
        </p>

        <div className="mt-6 aspect-video bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center">
          <div className="text-center">
            <PlayCircle className="h-16 w-16 text-gray-400 mx-auto" />
            <p className="text-gray-500 dark:text-gray-400 mt-2">Video Player</p>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg text-center">
            <Clock className="h-5 w-5 text-indigo-600 mx-auto mb-2" />
            <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Duration</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">22 min</p>
          </div>
          <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg text-center">
            <FileText className="h-5 w-5 text-indigo-600 mx-auto mb-2" />
            <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Resources</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">3 files</p>
          </div>
          <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg text-center">
            <HelpCircle className="h-5 w-5 text-indigo-600 mx-auto mb-2" />
            <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Need Help?</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">Contact Support</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LessonLearning