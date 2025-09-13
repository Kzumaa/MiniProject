import { HttpClient } from '@/api/http/HttpClient'
import { PaginatedQuery, PaginatedRes, ID } from '@/types'

export type Subject = {
  id: ID
  code: string
  name: string
  credits?: number
}

export class SubjectApi {
  constructor(private client: HttpClient) {}

  getAll(q: PaginatedQuery = {}): Promise<PaginatedRes<Subject>> {
    return this.client.get<PaginatedRes<Subject>>('/subjects', { params: q as any })
  }

  read(id: ID): Promise<Subject> {
    return this.client.get<Subject>(`/subjects/${id}`)
  }

  create(data: Partial<Subject>): Promise<Subject> {
    return this.client.post<Subject>('/subjects', data)
  }

  update(id: ID, data: Partial<Subject>): Promise<Subject> {
    return this.client.put<Subject>(`/subjects/${id}`, data)
  }

  delete(id: ID): Promise<{ success: boolean }> {
    return this.client.delete<{ success: boolean }>(`/subjects/${id}`)
  }
}
