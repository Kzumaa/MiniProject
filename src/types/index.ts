export type ID = string | number

export type Role = 'admin' | 'mentor' | 'mentee'

export type PaginatedQuery = {
  page?: number
  pageSize?: number
  search?: string
  sortBy?: string
  sortDir?: 'asc' | 'desc'
}

export type PaginatedRes<T> = {
  data: T[]
  page: number
  pageSize: number
  total: number
}

export type RequestOption = {
  params?: Record<string, any>
  headers?: Record<string, string>
  signal?: AbortSignal
}

export type User = {
  id: ID
  name: string
  email: string
  role: Role
  createdAt?: string
  updatedAt?: string
}

export type AuthUser = {
  id: ID
  name: string
  email: string
  role: Role
}

export type LoginInput = {
  email: string
  password: string
}

export type AuthResponse = {
  token: string
  user: AuthUser
}
