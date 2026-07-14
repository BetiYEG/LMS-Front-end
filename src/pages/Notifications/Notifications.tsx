// src/pages/Notifications/Notifications.jsx
import React from 'react'

export const Notifications = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Notifications</h1>
      <p className="text-gray-600 dark:text-gray-300 mt-2">
        Stay updated with your learning
      </p>
      <div className="mt-6 space-y-4">
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow flex items-center justify-between">
          <div>
            <h3 className="font-semibold">Welcome to LMS!</h3>
            <p className="text-sm text-gray-500">Start exploring your courses</p>
          </div>
          <span className="text-xs text-gray-400">2 min ago</span>
        </div>
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow flex items-center justify-between">
          <div>
            <h3 className="font-semibold">Course Available</h3>
            <p className="text-sm text-gray-500">New course added to your list</p>
          </div>
          <span className="text-xs text-gray-400">1 hour ago</span>
        </div>
      </div>
    </div>
  )
}

export default Notifications