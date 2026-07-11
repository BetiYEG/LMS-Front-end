import React, { useState } from 'react'
import { AssessmentCard } from '@/components/assessment'
import { CourseFilters } from '@/components/course'
import { useAuth } from '@/hooks/useAuth'

export const Assessments = () => {
  const { user } = useAuth()
  const [searchQuery, setSearchQuery] = useState('')
  const [filter, setFilter] = useState({})
  const [sort, setSort] = useState('newest')

  // Mock data - replace with actual API call
  const assessments = [
    {
      id: 1,
      title: 'Module 1 Quiz',
      description: 'Test your understanding of Module 1 concepts',
      type: 'quiz',
      totalQuestions: 20,
      duration: '30 min',
      passingScore: 70,
      attempts: 2,
      status: 'in-progress',
      progress: 60,
      score: 65,
      difficulty: 'medium',
    },
    // Add more assessments...
  ]

  const handleStart = (id) => {
    console.log('Start assessment:', id)
  }

  const handleContinue = (id) => {
    console.log('Continue assessment:', id)
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Assessments
        </h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">
          Test your knowledge and track your progress
        </p>
      </div>

      <CourseFilters
        onSearch={setSearchQuery}
        onFilter={setFilter}
        onSort={setSort}
      />

      <div className="grid grid-cols-1 gap-4">
        {assessments.map((assessment) => (
          <AssessmentCard
            key={assessment.id}
            assessment={assessment}
            variant="list"
            showProgress={true}
            onStart={() => handleStart(assessment.id)}
            onContinue={() => handleContinue(assessment.id)}
          />
        ))}
      </div>
    </div>
  )
}

export default Assessments