import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useAuthStore } from '@/stores/authStore'

interface ProtectedRouteProps {
  children: React.ReactNode
  roles?: string[]
  requireAuth?: boolean
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children, 
  roles, 
  requireAuth = true 
}) => {
  const { isAuthenticated, user, isLoading } = useAuthStore()
  const location = useLocation()

  // Show loading state while checking authentication
  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="glass-card p-8 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    )
  }

  // Redirect to login if authentication is required but user is not authenticated
  if (requireAuth && !isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  // Check role-based access
  if (roles && user && !roles.includes(user.role)) {
    return <Navigate to="/unauthorized" replace />
  }

  // If user is authenticated but trying to access login/signup, redirect to their dashboard
  if (isAuthenticated && (location.pathname === '/login' || location.pathname === '/signup')) {
    const dashboardPath = useAuthStore.getState().getDashboardPath()
    return <Navigate to={dashboardPath} replace />
  }

  return <>{children}</>
}

export default ProtectedRoute