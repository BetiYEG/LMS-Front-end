// src/pages/Profile/Profile.jsx
import React from 'react'

export const Profile = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Profile</h1>
      <p className="text-gray-600 dark:text-gray-300 mt-2">
        Manage your personal information
      </p>
      <div className="mt-6 bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
        <div className="flex items-center gap-4">
          <div className="h-20 w-20 rounded-full bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center text-3xl text-indigo-600 dark:text-indigo-300">
            U
          </div>
          <div>
            <h2 className="text-xl font-semibold">User Name</h2>
            <p className="text-gray-500">user@example.com</p>
            <p className="text-sm text-gray-400">Student</p>
          </div>
        </div>
        <div className="mt-6 border-t pt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500">Full Name</p>
              <p className="font-medium">User Name</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Email</p>
              <p className="font-medium">user@example.com</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Role</p>
              <p className="font-medium">Student</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Member Since</p>
              <p className="font-medium">January 2024</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile