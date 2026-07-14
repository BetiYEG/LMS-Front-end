import React from 'react'
import { Link } from 'react-router-dom'

export const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-6xl font-bold text-gray-900">404</h1>
      <p className="text-xl text-gray-600 mt-4">Page not found</p>
      <Link to="/dashboard" className="mt-6 text-indigo-600 hover:underline">
        Go back home
      </Link>
    </div>
  )
}

export default NotFound