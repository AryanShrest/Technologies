import { z } from 'zod'

export const productSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  price: z.coerce.number().positive('Price must be positive'),
  stock: z.coerce.number().int().min(0, 'Stock must be 0 or greater'),
  images: z.array(z.string().url('Each image must be a valid URL')).optional(),
  categoryId: z.string().min(1, 'Category is required'),
})

export type ProductInput = z.infer<typeof productSchema>
