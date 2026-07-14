import React from 'react'
import { Link } from 'react-router-dom'

export const Header = () => {
  return (
    <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/dashboard" className="font-bold text-xl text-indigo-600">
          LMS Platform
        </Link>
        <nav className="flex items-center gap-6">
          <Link to="/dashboard" className="text-sm hover:text-indigo-600">Dashboard</Link>
          <Link to="/my-courses" className="text-sm hover:text-indigo-600">Courses</Link>
        </nav>
      </div>
    </header>
  )
}

export default Header