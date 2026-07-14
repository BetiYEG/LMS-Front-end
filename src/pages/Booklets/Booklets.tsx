import React from 'react'
import { Link } from 'react-router-dom'
import { BookOpen, Clock, Award } from 'lucide-react'

const Booklets = () => {
  const booklets = [
    { id: 1, title: 'Misooma Gahumsa Hooggansa Barnootaa', questions: 50, duration: '2 hours', status: 'In Progress' },
    { id: 2, title: 'Mock Exam - Leadership', questions: 100, duration: '3 hours', status: 'Not Started' },
    { id: 3, title: 'Practice Test - Education', questions: 30, duration: '45 min', status: 'Completed' },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Booklets
        </h1>
        <p className="text-gray-600 dark:text-gray-300 mt-1">
          Practice with comprehensive booklets and mock exams
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {booklets.map((booklet) => (
          <div key={booklet.id} className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center mb-4">
              <BookOpen className="h-5 w-5 text-white" />
            </div>
            <h3 className="font-semibold text-gray-900 dark:text-white line-clamp-1">
              {booklet.title}
            </h3>
            <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400 mt-2">
              <span className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                {booklet.duration}
              </span>
              <span>{booklet.questions} questions</span>
            </div>
            <div className="mt-4 flex items-center justify-between">
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                booklet.status === 'In Progress' ? 'bg-yellow-100 text-yellow-700' :
                booklet.status === 'Completed' ? 'bg-green-100 text-green-700' :
                'bg-gray-100 text-gray-700'
              }`}>
                {booklet.status}
              </span>
              <Link to={`/booklet/${booklet.id}`} className="text-indigo-600 hover:text-indigo-700 text-sm font-medium">
                {booklet.status === 'In Progress' ? 'Continue' : 'Start'}
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Booklets