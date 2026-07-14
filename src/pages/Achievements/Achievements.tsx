// src/pages/Achievements/Achievements.jsx
import React from 'react'

export const Achievements = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Achievements</h1>
      <p className="text-gray-600 dark:text-gray-300 mt-2">
        Your earned badges and certificates
      </p>
      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow text-center">
          <div className="text-4xl mb-2">🏆</div>
          <h3 className="font-semibold">First Course</h3>
          <p className="text-sm text-gray-500">Completed your first course</p>
        </div>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow text-center">
          <div className="text-4xl mb-2">⭐</div>
          <h3 className="font-semibold">10 Lessons</h3>
          <p className="text-sm text-gray-500">Completed 10 lessons</p>
        </div>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow text-center">
          <div className="text-4xl mb-2">🔥</div>
          <h3 className="font-semibold">7 Day Streak</h3>
          <p className="text-sm text-gray-500">Active for 7 days</p>
        </div>
      </div>
    </div>
  )
}

export default Achievements