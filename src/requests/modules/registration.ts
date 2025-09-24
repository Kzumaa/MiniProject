import { httpClient } from '@/requests/HttpClient';
import type { ApiList, ApiResponse, ListRequestParams } from '@/types';
import type { MenteeSubjectRegistration, MenteeMentorRegistration } from '@/types/registration';

export const registrationApi = {
  // Subject registrations
  listSubjectRegistrations: async (params?: ListRequestParams<MenteeSubjectRegistration>) => {
    const { data } = await httpClient.get<ApiResponse<ApiList<MenteeSubjectRegistration>>>('/registrations/subjects', { params });
    return data;
  },
  getSubjectRegistration: async (id: number) => {
    const { data } = await httpClient.get<ApiResponse<MenteeSubjectRegistration>>(`/registrations/subjects/${id}`);
    return data;
  },
  
  // Mentor registrations
  listMentorRegistrations: async (params?: ListRequestParams<MenteeMentorRegistration>) => {
    const { data } = await httpClient.get<ApiResponse<ApiList<MenteeMentorRegistration>>>('/registrations/mentors', { params });
    return data;
  },
  getMentorRegistration: async (id: number) => {
    const { data } = await httpClient.get<ApiResponse<MenteeMentorRegistration>>(`/registrations/mentors/${id}`);
    return data;
  },

  // Mock data for testing
  getMockSubjectRegistrations: () => {
    const mockData: MenteeSubjectRegistration[] = [
      {
        id: 1,
        menteeId: 101,
        subjectId: 201,
        createdAt: '2023-09-10T08:30:00Z',
        updatedAt: '2023-09-10T08:30:00Z',
        subjectName: 'Mathematics',
        menteeFullName: 'John Doe',
        startDate: '2023-09-15T00:00:00Z',
        endDate: '2023-12-15T00:00:00Z'
      },
      {
        id: 2,
        menteeId: 102,
        subjectId: 202,
        createdAt: '2023-09-11T10:15:00Z',
        updatedAt: '2023-09-11T10:15:00Z',
        subjectName: 'Physics',
        menteeFullName: 'Jane Smith',
        startDate: '2023-09-20T00:00:00Z',
        endDate: '2023-12-20T00:00:00Z'
      },
      {
        id: 3,
        menteeId: 103,
        subjectId: 203,
        createdAt: '2023-09-12T14:45:00Z',
        updatedAt: '2023-09-12T14:45:00Z',
        subjectName: 'Chemistry',
        menteeFullName: 'Alex Johnson',
        startDate: '2023-09-25T00:00:00Z',
        endDate: '2023-12-25T00:00:00Z'
      },
      {
        id: 4,
        menteeId: 104,
        subjectId: 204,
        createdAt: '2023-09-13T09:20:00Z',
        updatedAt: '2023-09-13T09:20:00Z',
        subjectName: 'Biology',
        menteeFullName: 'Emma Wilson',
        startDate: '2023-10-01T00:00:00Z',
        endDate: '2024-01-01T00:00:00Z'
      },
      {
        id: 5,
        menteeId: 105,
        subjectId: 205,
        createdAt: '2023-09-14T16:30:00Z',
        updatedAt: '2023-09-14T16:30:00Z',
        subjectName: 'Computer Science',
        menteeFullName: 'Michael Brown',
        startDate: '2023-10-05T00:00:00Z',
        endDate: '2024-01-05T00:00:00Z'
      }
    ];
    
    return {
      success: true,
      message: 'Subject registrations fetched successfully',
      data: {
        items: mockData,
        pagination: {
          page: 1,
          limit: 10,
          total: mockData.length
        }
      }
    };
  },

  getMockMentorRegistrations: () => {
    const mockData: MenteeMentorRegistration[] = [
      {
        id: 1,
        menteeId: 101,
        mentorId: 301,
        createdAt: '2023-09-10T08:30:00Z',
        updatedAt: '2023-09-10T08:30:00Z',
        mentorName: 'Dr. Robert Chen',
        menteeName: 'John Doe',
        startDate: '2023-09-15T00:00:00Z',
        endDate: '2023-12-15T00:00:00Z'
      },
      {
        id: 2,
        menteeId: 102,
        mentorId: 302,
        createdAt: '2023-09-11T10:15:00Z',
        updatedAt: '2023-09-11T10:15:00Z',
        mentorName: 'Prof. Sarah Adams',
        menteeName: 'Jane Smith',
        startDate: '2023-09-20T00:00:00Z',
        endDate: '2023-12-20T00:00:00Z'
      },
      {
        id: 3,
        menteeId: 103,
        mentorId: 303,
        createdAt: '2023-09-12T14:45:00Z',
        updatedAt: '2023-09-12T14:45:00Z',
        mentorName: 'Dr. James Wilson',
        menteeName: 'Alex Johnson',
        startDate: '2023-09-25T00:00:00Z',
        endDate: '2023-12-25T00:00:00Z'
      },
      {
        id: 4,
        menteeId: 104,
        mentorId: 304,
        createdAt: '2023-09-13T09:20:00Z',
        updatedAt: '2023-09-13T09:20:00Z',
        mentorName: 'Prof. Emily Garcia',
        menteeName: 'Emma Wilson',
        startDate: '2023-10-01T00:00:00Z',
        endDate: '2024-01-01T00:00:00Z'
      },
      {
        id: 5,
        menteeId: 105,
        mentorId: 305,
        createdAt: '2023-09-14T16:30:00Z',
        updatedAt: '2023-09-14T16:30:00Z',
        mentorName: 'Dr. Michael Torres',
        menteeName: 'Michael Brown',
        startDate: '2023-10-05T00:00:00Z',
        endDate: '2024-01-05T00:00:00Z'
      }
    ];
    
    return {
      success: true,
      message: 'Mentor registrations fetched successfully',
      data: {
        items: mockData,
        pagination: {
          page: 1,
          limit: 10,
          total: mockData.length
        }
      }
    };
  }
};
