import type { ApiResponse, ApiList, Registration, Subject } from '@/types';

interface RegistrationWithSubject extends Registration {
  subject?: Subject;
}

export const mockMenteeRegistrations: ApiResponse<ApiList<RegistrationWithSubject>> = {
  success: true,
  message: 'Success',
  data: {
    pagination: {
      page: 1,
      limit: 10,
      total: 5
    },
    items: [
      {
        id: 1,
        menteeId: 1,
        mentorId: 2,
        subjectId: 1,
        createdAt: '2025-09-20T08:00:00Z',
        subject: {
          id: 1,
          name: 'Mathematics',
          description: 'Advanced calculus and algebra',
          createdAt: '2025-09-01T00:00:00Z',
          updatedAt: '2025-09-01T00:00:00Z'
        }
      },
      {
        id: 2,
        menteeId: 1,
        mentorId: undefined,
        subjectId: 2,
        createdAt: '2025-09-21T10:30:00Z',
        subject: {
          id: 2,
          name: 'Physics',
          description: 'Classical mechanics and electromagnetism',
          createdAt: '2025-09-01T00:00:00Z',
          updatedAt: '2025-09-01T00:00:00Z'
        }
      },
      {
        id: 3,
        menteeId: 1,
        mentorId: 3,
        subjectId: 3,
        createdAt: '2025-09-22T14:15:00Z',
        subject: {
          id: 3,
          name: 'Computer Science',
          description: 'Programming fundamentals and algorithms',
          createdAt: '2025-09-01T00:00:00Z',
          updatedAt: '2025-09-01T00:00:00Z'
        }
      },
      {
        id: 4,
        menteeId: 1,
        mentorId: undefined,
        subjectId: 4,
        createdAt: '2025-09-23T09:45:00Z',
        subject: {
          id: 4,
          name: 'Chemistry',
          description: 'Organic and inorganic chemistry',
          createdAt: '2025-09-01T00:00:00Z',
          updatedAt: '2025-09-01T00:00:00Z'
        }
      },
      {
        id: 5,
        menteeId: 1,
        mentorId: 4,
        subjectId: 5,
        createdAt: '2025-09-24T11:20:00Z',
        subject: {
          id: 5,
          name: 'Biology',
          description: 'Cell biology and genetics',
          createdAt: '2025-09-01T00:00:00Z',
          updatedAt: '2025-09-01T00:00:00Z'
        }
      }
    ]
  }
};