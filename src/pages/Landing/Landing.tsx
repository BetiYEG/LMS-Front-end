import React from 'react'
import { Link } from 'react-router-dom'

export const Landing = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-indigo-50 to-purple-50">
      <h1 className="text-5xl font-bold text-gray-900 mb-4">LMS Platform</h1>
      <p className="text-xl text-gray-600 mb-8">Learn • Grow • Achieve</p>
      <Link to="/login" className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700">
        Get Started
      </Link>
    </div>
  )
}

export default Landing