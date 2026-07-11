import React from 'react'
import { NavLink } from 'react-router-dom'
import {
  Home,
  BookOpen,
  Award,
  BarChart3,
  Bell,
  User,
  Settings,
  LogOut,
} from 'lucide-react'
import { cn } from '@/lib/utils'

const navItems = [
  { icon: Home, label: 'Dashboard', path: '/dashboard' },
  { icon: BookOpen, label: 'My Courses', path: '/my-courses' },
  { icon: Award, label: 'Achievements', path: '/achievements' },
  { icon: BarChart3, label: 'Progress', path: '/progress' },
  { icon: Bell, label: 'Notifications', path: '/notifications' },
  { icon: User, label: 'Profile', path: '/profile' },
]

export const Navigation = ({ className, onItemClick }) => {
  return (
    <nav className={cn('space-y-1', className)}>
      {navItems.map((item) => (
        <NavLink
          key={item.path}
          to={item.path}
          className={({ isActive }) =>
            cn(
              'flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all hover:bg-gray-100 dark:hover:bg-gray-800',
              isActive
                ? 'bg-gray-100 dark:bg-gray-800 text-primary font-medium'
                : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
            )
          }
          onClick={onItemClick}
        >
          <item.icon className="h-4 w-4" />
          <span>{item.label}</span>
        </NavLink>
      ))}
    </nav>
  )
}

export default Navigation