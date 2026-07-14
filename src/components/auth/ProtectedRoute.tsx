// src/components/auth/ProtectedRoute.tsx
// ✅ React 17+ - No need to import React with react-jsx
import { Navigate, Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'

interface ProtectedRouteProps {
  children?: React.ReactNode
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { isAuthenticated, isLoading } = useSelector((state: any) => state.auth)

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-indigo-600 border-t-transparent" />
      </div>
    )
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  return children || <Outlet />
}

export default ProtectedRoute