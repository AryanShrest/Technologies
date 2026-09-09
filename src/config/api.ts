export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? 'http://localhost:4000/api'

export const ENDPOINTS = {
  auth: {
    login: `${API_BASE_URL}/auth/login`,
    register: `${API_BASE_URL}/auth/register`,
    logout: `${API_BASE_URL}/auth/logout`,
    me: `${API_BASE_URL}/auth/me`,
  },
  products: {
    list: `${API_BASE_URL}/products`,
    detail: (id: string) => `${API_BASE_URL}/products/${id}`,
  },
  cart: {
    get: `${API_BASE_URL}/cart`,
    add: `${API_BASE_URL}/cart/add`,
    remove: `${API_BASE_URL}/cart/remove`,
    update: `${API_BASE_URL}/cart/update`,
    clear: `${API_BASE_URL}/cart/clear`,
  },
  orders: {
    list: `${API_BASE_URL}/orders`,
    create: `${API_BASE_URL}/orders`,
    detail: (id: string) => `${API_BASE_URL}/orders/${id}`,
  },
} as const
