import { useAuthStore } from '@/stores/authStore'

export const useAuth = () => {
  const { user, isAuthenticated, login, logout, updateUser } = useAuthStore()

  const hasRole = (role: string) => {
    return user?.role === role
  }

  const hasAnyRole = (roles: string[]) => {
    return user ? roles.includes(user.role) : false
  }

  return {
    user,
    isAuthenticated,
    login,
    logout,
    updateUser,
    hasRole,
    hasAnyRole,
  }
}

