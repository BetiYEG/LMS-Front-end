// // src/components/auth/route-protection.jsx
// import React from 'react'
// import { Navigate, Outlet } from 'react-router-dom'
// import { useSelector } from 'react-redux'
// import { Loader2 } from 'lucide-react'

// export const ProtectedRoute = ({ children }) => {
//   const { isAuthenticated, isLoading } = useSelector((state) => state.auth)

//   if (isLoading) {
//     return (
//       <div className="flex min-h-screen items-center justify-center">
//         <div className="text-center">
//           <Loader2 className="mx-auto h-12 w-12 animate-spin text-primary" />
//           <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">Loading...</p>
//         </div>
//       </div>
//     )
//   }

//   if (!isAuthenticated) {
//     return <Navigate to="/login" replace />
//   }

//   return children || <Outlet />
// }

// export const PublicOnlyRoute = ({ children }) => {
//   const { isAuthenticated, isLoading } = useSelector((state) => state.auth)

//   if (isLoading) {
//     return (
//       <div className="flex min-h-screen items-center justify-center">
//         <Loader2 className="h-12 w-12 animate-spin text-primary" />
//       </div>
//     )
//   }

//   if (isAuthenticated) {
//     return <Navigate to="/dashboard" replace />
//   }

//   return children || <Outlet />
// }

// // Default export for the module
// export default { ProtectedRoute, PublicOnlyRoute }
// src/components/auth/ProtectedRoute.jsx
// src/components/auth/route-protection.jsx
import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Loader2 } from 'lucide-react'

export const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, isLoading } = useSelector((state) => state.auth)

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <Loader2 className="mx-auto h-12 w-12 animate-spin text-primary" />
          <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">Loading...</p>
        </div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  return children || <Outlet />
}

export const PublicOnlyRoute = ({ children }) => {
  const { isAuthenticated, isLoading } = useSelector((state) => state.auth)

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    )
  }

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />
  }

  return children || <Outlet />
}

// Also export as default for backwards compatibility
export default { ProtectedRoute, PublicOnlyRoute }