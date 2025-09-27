import { useQuery } from '@tanstack/react-query'
import { api } from '@/services/api'

export const useAnalytics = () => {
  return useQuery({
    queryKey: ['analytics'],
    queryFn: api.getAnalytics,
    staleTime: 2 * 60 * 1000, // 2 minutes
  })
}

