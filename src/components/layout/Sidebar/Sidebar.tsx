import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { 
  Home, BookOpen, Award, BarChart3, Bell, 
  Settings, LogOut, GraduationCap, FileQuestion, BookMarked 
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/hooks/useAuth'
import { getSidebarItems } from '@/utils/config'  // ✅ Import sidebar items

const Sidebar: React.FC = () => {
  const location = useLocation()
  const { user, logout } = useAuth()
  
  // ✅ Get sidebar items from config
  const sidebarItems = getSidebarItems()

  return (
    <aside className="fixed left-0 top-0 z-50 h-full w-64 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700">
      <div className="flex h-full flex-col">
        <div className="flex h-16 items-center border-b border-gray-200 dark:border-gray-700 px-4">
          <Link to="/dashboard" className="flex items-center gap-2">
            <span className="text-lg font-bold text-primary">LMS</span>
          </Link>
        </div>
        <nav className="flex-1 overflow-y-auto p-4">
          <div className="space-y-1">
            {sidebarItems.map((item) => {
              const isActive = location.pathname === item.path
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={cn(
                    'flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all hover:bg-gray-100 dark:hover:bg-gray-800',
                    isActive
                      ? 'bg-primary text-white hover:bg-primary/90'
                      : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
                  )}
                >
                  <item.icon className="h-4 w-4" />
                  <span>{item.name}</span>
                </Link>
              )
            })}
          </div>
        </nav>
        <div className="border-t border-gray-200 dark:border-gray-700 p-4">
          <div className="flex items-center gap-3 rounded-lg p-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10">
              <span className="text-sm font-medium text-primary">
                {user?.name?.charAt(0) || 'U'}
              </span>
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-900 dark:text-white">
                {user?.name || 'User'}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {user?.email || 'user@example.com'}
              </p>
            </div>
          </div>
          <Button
            variant="ghost"
            className="w-full justify-start gap-2 text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 mt-2"
            onClick={logout}
          >
            <LogOut className="h-4 w-4" />
            Logout
          </Button>
        </div>
      </div>
    </aside>
  )
}

export default Sidebar