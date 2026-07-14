import React from 'react'
import { Heart } from 'lucide-react'

interface FooterProps {
  className?: string
  showHeart?: boolean
  companyName?: string
}

export const Footer: React.FC<FooterProps> = ({ 
  className = '',
  showHeart = true,
  companyName = 'OEB Team'
}) => {
  const currentYear: number = new Date().getFullYear()

  return (
    <footer className={`border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 mt-auto ${className}`}>
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-2">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            &copy; {currentYear} LMS Platform. All rights reserved.
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-1">
            {showHeart && (
              <>
                Made with <Heart className="h-4 w-4 text-red-500" /> by {companyName}
              </>
            )}
            {!showHeart && (
              <>Built by {companyName}</>
            )}
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer