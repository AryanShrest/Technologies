import { useQuery, useMutation, useQueryClient, type UseQueryOptions } from '@tanstack/react-query'
import { ENDPOINTS } from '@/config/api'
import type { Product, Category } from '@/types/product'
import type { PaginationResult } from '@/types/common'

interface ListProductsParams {
  page?: number
  limit?: number
  search?: string
  categoryId?: string
  minPrice?: number
  maxPrice?: number
  sortBy?: 'price' | 'createdAt' | 'name'
  order?: 'asc' | 'desc'
}

async function fetchProducts(params: ListProductsParams): Promise<PaginationResult<Product>> {
  const searchParams = new URLSearchParams()
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined) searchParams.append(key, String(value))
  })
  const res = await fetch(`${ENDPOINTS.products.list}?${searchParams.toString()}`)
  if (!res.ok) throw new Error('Failed to fetch products')
  return res.json()
}

async function fetchProduct(id: string): Promise<{ product: Product }> {
  const res = await fetch(ENDPOINTS.products.detail(id))
  if (!res.ok) throw new Error('Failed to fetch product')
  return res.json()
}

export function useProducts(
  params: ListProductsParams = {},
  options?: Omit<UseQueryOptions<PaginationResult<Product>, Error>, 'queryKey' | 'queryFn'>,
) {
  return useQuery({
    queryKey: ['products', params],
    queryFn: () => fetchProducts(params),
    ...options,
  })
}

export function useProduct(id: string, options?: Omit<UseQueryOptions<{ product: Product }, Error>, 'queryKey' | 'queryFn'>) {
  return useQuery({
    queryKey: ['product', id],
    queryFn: () => fetchProduct(id),
    enabled: !!id,
    ...options,
  })
}

export function useCreateProduct() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (data: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>) => {
      const res = await fetch(ENDPOINTS.products.list, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      if (!res.ok) throw new Error('Failed to create product')
      return res.json()
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['products'] }),
  })
}
