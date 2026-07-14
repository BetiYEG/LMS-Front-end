import React from 'react'
import { Link } from 'react-router-dom'
import { FileQuestion, Clock, Award } from 'lucide-react'

const Assessments = () => {
  const assessments = [
    { id: 1, title: 'Module 1 Quiz', questions: 20, duration: '30 min', status: 'In Progress', score: 65 },
    { id: 2, title: 'Module 2 Quiz', questions: 15, duration: '20 min', status: 'Not Started', score: null },
    { id: 3, title: 'Final Exam', questions: 50, duration: '2 hours', status: 'Locked', score: null },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Assessments
        </h1>
        <p className="text-gray-600 dark:text-gray-300 mt-1">
          Test your knowledge and track your progress
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {assessments.map((assessment) => (
          <div key={assessment.id} className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white">
                  {assessment.title}
                </h3>
                <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 dark:text-gray-400 mt-1">
                  <span className="flex items-center gap-1">
                    <FileQuestion className="h-4 w-4" />
                    {assessment.questions} Questions
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    {assessment.duration}
                  </span>
                  {assessment.score && (
                    <span className="flex items-center gap-1 text-green-600">
                      <Award className="h-4 w-4" />
                      Score: {assessment.score}%
                    </span>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  assessment.status === 'In Progress' ? 'bg-yellow-100 text-yellow-700' :
                  assessment.status === 'Completed' ? 'bg-green-100 text-green-700' :
                  'bg-gray-100 text-gray-700'
                }`}>
                  {assessment.status}
                </span>
                <Link
                  to={`/assessment/${assessment.id}`}
                  className="text-indigo-600 hover:text-indigo-700 text-sm font-medium"
                >
                  {assessment.status === 'In Progress' ? 'Continue' : 'Start'}
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Assessments