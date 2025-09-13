import { HttpClient } from '@/api/http/HttpClient'
import type { AuthResponse, LoginInput, AuthUser } from '@/types'

export class AuthApi {
  constructor(private client: HttpClient) {}

  login(input: LoginInput): Promise<AuthResponse> {
    return this.client.post<AuthResponse>('/auth/login', input)
  }

  me(): Promise<AuthUser> {
    return this.client.get<AuthUser>('/auth/me')
  }
}
