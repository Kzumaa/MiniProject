import { httpClient } from '../HttpClient';
import type { ApiResponse, User } from '@/types';

export const authApi = {
  login: async (username: string, password: string) => {
    const { data } = await httpClient.post<ApiResponse<User>>('/auth/login', { username, password });
    return data;
  },
  logout: async () => {
    const { data } = await httpClient.post<ApiResponse<null>>('/auth/logout', {});
    return data;
  },
  me: async () => {
    const { data } = await httpClient.get<ApiResponse<User>>('/auth/me');
    return data;
  },
};
