import { HttpClient } from '@/api/http/HttpClient'
import { PaginatedQuery, PaginatedRes, User, ID } from '@/types'

export class UserApi {
  constructor(private client: HttpClient) {}

  getAll(q: PaginatedQuery = {}): Promise<PaginatedRes<User>> {
    return this.client.get<PaginatedRes<User>>('/users', { params: q as any })
  }

  read(id: ID): Promise<User> {
    return this.client.get<User>(`/users/${id}`)
  }

  create(data: Partial<User>): Promise<User> {
    return this.client.post<User>('/users', data)
  }

  update(id: ID, data: Partial<User>): Promise<User> {
    return this.client.put<User>(`/users/${id}`, data)
  }

  delete(id: ID): Promise<{ success: boolean }> {
    return this.client.delete<{ success: boolean }>(`/users/${id}`)
  }
}
