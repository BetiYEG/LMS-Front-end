import React from 'react'

export const Dashboard = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
      <p className="text-gray-600 dark:text-gray-300 mt-2">
        Welcome to your LMS dashboard!
      </p>
      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
          <h3 className="font-semibold">Courses</h3>
          <p className="text-2xl font-bold text-indigo-600">12</p>
        </div>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
          <h3 className="font-semibold">Completed</h3>
          <p className="text-2xl font-bold text-green-600">5</p>
        </div>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
          <h3 className="font-semibold">Progress</h3>
          <p className="text-2xl font-bold text-purple-600">65%</p>
        </div>
      </div>
    </div>
  )
}

export default Dashboard