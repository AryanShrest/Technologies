export interface Product {
  id: string
  name: string
  slug: string
  description: string
  price: number
  stock: number
  images: string[]
  categoryId: string
  createdAt: string
  updatedAt: string
}

export interface Category {
  id: string
  name: string
  slug: string
  description?: string
}
