import { httpClient } from '@/requests/HttpClient';
import type { ApiList, ApiResponse, ListRequestParams } from '@/types';
import type { Mentor } from '@/types/mentor';

export const mentorApi = {
  list: async (params?: ListRequestParams<Mentor>) => {
    const { data } = await httpClient.get<ApiResponse<ApiList<Mentor>>>('/mentors', { params });
    return data;
  },
  get: async (id: number) => {
    const { data } = await httpClient.get<ApiResponse<Mentor>>(`/mentors/${id}`);
    return data;
  },
}