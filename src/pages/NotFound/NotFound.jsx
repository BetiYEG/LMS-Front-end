import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Home, ArrowLeft, Search } from 'lucide-react'

export const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-900 dark:to-indigo-950 p-4">
      <div className="text-center max-w-md">
        <div className="text-8xl font-bold text-indigo-600 dark:text-indigo-400">404</div>
        <h1 className="mt-4 text-3xl font-bold text-gray-900 dark:text-white">
          Page Not Found
        </h1>
        <p className="mt-2 text-gray-600 dark:text-gray-300">
          Oops! The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link to="/">
            <Button className="w-full sm:w-auto">
              <Home className="mr-2 h-4 w-4" />
              Go Home
            </Button>
          </Link>
          <Link to="/dashboard">
            <Button variant="outline" className="w-full sm:w-auto">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Dashboard
            </Button>
          </Link>
        </div>
        <div className="mt-8">
          <div className="flex items-center justify-center gap-2 text-sm text-gray-400">
            <Search className="h-4 w-4" />
            <span>Need help? Contact support</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NotFound