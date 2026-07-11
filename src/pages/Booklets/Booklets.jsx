import React, { useState } from 'react'
import { BookletCard } from '@/components/booklet'
import { CourseFilters } from '@/components/course'
import { useAuth } from '@/hooks/useAuth'

export const Booklets = () => {
  const { user } = useAuth()
  const [searchQuery, setSearchQuery] = useState('')
  const [filter, setFilter] = useState({})
  const [sort, setSort] = useState('newest')

  // Mock data - replace with actual API call
  const booklets = [
    {
      id: 1,
      title: 'Misooma Gahumsa Hooggansa Barnootaa',
      description: 'Comprehensive booklet on educational leadership',
      subject: 'Education',
      grade: '12',
      totalQuestions: 50,
      duration: '2 hours',
      difficulty: 'medium',
      status: 'in-progress',
      progress: 30,
      type: 'mock',
    },
    // Add more booklets...
  ]

  const handleStart = (id) => {
    console.log('Start booklet:', id)
  }

  const handleContinue = (id) => {
    console.log('Continue booklet:', id)
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Booklets
        </h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">
          Practice with comprehensive booklets and mock exams
        </p>
      </div>

      <CourseFilters
        onSearch={setSearchQuery}
        onFilter={setFilter}
        onSort={setSort}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {booklets.map((booklet) => (
          <BookletCard
            key={booklet.id}
            booklet={booklet}
            showProgress={true}
            onStart={() => handleStart(booklet.id)}
            onContinue={() => handleContinue(booklet.id)}
          />
        ))}
      </div>
    </div>
  )
}

export default Booklets