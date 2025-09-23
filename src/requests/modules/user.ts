import { httpClient } from '@/requests/HttpClient';
import type { ApiList, ApiResponse, ListRequestParams } from '@/types';
import type { User } from '@/types/uset';

export const userApi = {
  list: async (params?: ListRequestParams<User>) => {
    const { data } = await httpClient.get<ApiResponse<ApiList<User>>>('/users', { params });
    return data;
  },
  get: async (id: number) => {
    const { data } = await httpClient.get<ApiResponse<User>>(`/users/${id}`);
    return data;
  },
  remove: async (id: number) => {
    const { data } = await httpClient.delete<ApiResponse<null>>(`/users/${id}`);
    return data;
  },
};
