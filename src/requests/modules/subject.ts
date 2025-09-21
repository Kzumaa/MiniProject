import { httpClient } from '@/requests/HttpClient';
import type { ApiList, ApiResponse, Subject } from '@/types';

export const subjectsApi = {
  list: async (params?: { page?: number; size?: number; search?: string }) => {
    const { data } = await httpClient.get<ApiResponse<ApiList<Subject>>>('/subjects', { params });
    return data;
  },
  create: async (payload: Pick<Subject, 'name' | 'description'>) => {
    const { data } = await httpClient.post<ApiResponse<Subject>>('/subjects', payload);
    return data;
  },
  update: async (id: number, payload: Partial<Subject>) => {
    const { data } = await httpClient.put<ApiResponse<Subject>>(`/subjects/${id}`, payload);
    return data;
  },
  remove: async (id: number) => {
    const { data } = await httpClient.delete<ApiResponse<null>>(`/subjects/${id}`);
    return data;
  },
  assignMentors: async (subjectId: number, mentorIds: number[]) => {
    const { data } = await httpClient.post<ApiResponse<Subject>>(`/subjects/${subjectId}/assign-mentors`, { mentorIds });
    return data;
  },
};
