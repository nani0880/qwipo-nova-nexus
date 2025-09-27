import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface User {
  id: string
  name: string
  email: string
  role: 'retailer' | 'distributor' | 'admin'
  company?: string
  preferences: string[]
}

// Helper function to validate if a role can be created via registration
export const isRegistrationAllowedRole = (role: string): role is 'retailer' | 'distributor' => {
  return role === 'retailer' || role === 'distributor'
}

interface AuthState {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  login: (user: User) => void
  logout: () => void
  updateUser: (updates: Partial<User>) => void
  setLoading: (loading: boolean) => void
  getDashboardPath: () => string
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      login: (user) => set({ user, isAuthenticated: true, isLoading: false }),
      logout: () => set({ user: null, isAuthenticated: false, isLoading: false }),
      updateUser: (updates) =>
        set((state) => ({
          user: state.user ? { ...state.user, ...updates } : null,
        })),
      setLoading: (loading) => set({ isLoading: loading }),
      getDashboardPath: () => {
        const user = get().user
        if (!user) return '/login'
        
        switch (user.role) {
          case 'retailer':
            return '/dashboard/retailer'
          case 'distributor':
            return '/dashboard/distributor'
          case 'admin':
            return '/dashboard/admin'
          default:
            return '/'
        }
      },
    }),
    {
      name: 'auth-storage',
    }
  )
)

