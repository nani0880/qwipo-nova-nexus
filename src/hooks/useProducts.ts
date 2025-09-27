import { useQuery } from '@tanstack/react-query'
import { api } from '@/services/api'

export const useProducts = () => {
  return useQuery({
    queryKey: ['products'],
    queryFn: api.getProducts,
    staleTime: 5 * 60 * 1000, // 5 minutes
  })
}

export const useProduct = (id: string) => {
  return useQuery({
    queryKey: ['product', id],
    queryFn: () => api.getProduct(id),
    enabled: !!id,
  })
}

export const useSearchProducts = (query: string) => {
  return useQuery({
    queryKey: ['products', 'search', query],
    queryFn: () => api.searchProducts(query),
    enabled: query.length > 2,
  })
}

