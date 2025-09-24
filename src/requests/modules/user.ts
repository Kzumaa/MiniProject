// import { httpClient } from '@/requests/HttpClient'; // Commented out for mock data
import type { ApiList, ApiResponse, ListRequestParams } from '@/types';
import type { User } from '@/types/uset';

// Mock data for development
const mockUsers: User[] = [
  {
    id: 1,
    role: "ADMIN",
    fullName: "John Administrator",
    username: "admin",
    email: "admin@university.edu",
    description: "System administrator with full access to all features",
    createdAt: "2024-01-15T08:00:00Z",
    updatedAt: "2024-09-20T14:30:00Z",
    assignedSubjects: []
  },
  {
    id: 2,
    role: "MENTOR",
    fullName: "Dr. Sarah Johnson",
    username: "sarah.johnson",
    email: "sarah.johnson@university.edu",
    description: "Senior software engineer and mentor",
    createdAt: "2024-02-10T09:15:00Z",
    updatedAt: "2024-09-22T16:45:00Z",
    assignedSubjects: [
      { id: 1, name: "React Development" },
      { id: 2, name: "JavaScript Fundamentals" }
    ]
  },
  {
    id: 3,
    role: "MENTEE",
    fullName: "Alice Smith",
    username: "alice.smith",
    email: "alice.smith@student.edu",
    description: "Computer Science student interested in web development",
    createdAt: "2024-03-05T10:30:00Z",
    updatedAt: "2024-09-23T11:20:00Z",
    assignedSubjects: []
  },
  {
    id: 4,
    role: "MENTOR",
    fullName: "Prof. Michael Chen",
    username: "m.chen",
    email: "m.chen@university.edu",
    description: "Data Science professor and AI researcher",
    createdAt: "2024-01-20T07:45:00Z",
    updatedAt: "2024-09-21T13:15:00Z",
    assignedSubjects: [
      { id: 4, name: "Machine Learning" },
      { id: 5, name: "Python Programming" }
    ]
  },
  {
    id: 5,
    role: "MENTEE",
    fullName: "Bob Wilson",
    username: "bob.wilson",
    email: "bob.wilson@student.edu",
    description: "Engineering student focusing on mobile app development",
    createdAt: "2024-04-12T12:00:00Z",
    updatedAt: "2024-09-24T09:30:00Z",
    assignedSubjects: []
  },
  {
    id: 6,
    role: "MENTOR",
    fullName: "Emily Rodriguez",
    username: "emily.rodriguez",
    email: "emily.rodriguez@university.edu",
    description: "Mobile development specialist and UI/UX expert",
    createdAt: "2024-02-28T15:20:00Z",
    updatedAt: "2024-09-20T17:10:00Z",
    assignedSubjects: [
      { id: 7, name: "Mobile Development" },
      { id: 8, name: "UI/UX Design" }
    ]
  },
  {
    id: 7,
    role: "MENTEE",
    fullName: "Charlie Brown",
    username: "charlie.brown",
    email: "charlie.brown@student.edu",
    description: "Computer Science major with interest in cybersecurity",
    createdAt: "2024-05-08T14:45:00Z",
    updatedAt: "2024-09-22T08:20:00Z",
    assignedSubjects: []
  },
  {
    id: 8,
    role: "ADMIN",
    fullName: "Diana Manager",
    username: "diana.manager",
    email: "diana.manager@university.edu",
    description: "Academic program coordinator and system administrator",
    createdAt: "2024-01-10T06:30:00Z",
    updatedAt: "2024-09-23T12:45:00Z",
    assignedSubjects: []
  }
];

export const userApi = {
  list: async (params?: ListRequestParams<User>): Promise<ApiResponse<ApiList<User>>> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 600));
    
    let filteredUsers = [...mockUsers];
    
    // Apply search filter
    if (params?.search) {
      const searchTerm = params.search.toLowerCase();
      filteredUsers = filteredUsers.filter(user =>
        user.fullName.toLowerCase().includes(searchTerm) ||
        user.username.toLowerCase().includes(searchTerm) ||
        user.email.toLowerCase().includes(searchTerm) ||
        user.role.toLowerCase().includes(searchTerm) ||
        user.description?.toLowerCase().includes(searchTerm)
      );
    }
    
    // Apply sorting
    if (params?.name && params?.sort) {
      const sortField = params.name;
      const sortOrder = params.sort;
      
      filteredUsers.sort((a, b) => {
        let aValue = a[sortField];
        let bValue = b[sortField];
        
        // Handle undefined values
        if (aValue === undefined && bValue === undefined) return 0;
        if (aValue === undefined) return sortOrder === 'asc' ? 1 : -1;
        if (bValue === undefined) return sortOrder === 'asc' ? -1 : 1;
        
        // Handle string comparisons
        if (typeof aValue === 'string' && typeof bValue === 'string') {
          aValue = aValue.toLowerCase();
          bValue = bValue.toLowerCase();
        }
        
        if (aValue < bValue) return sortOrder === 'asc' ? -1 : 1;
        if (aValue > bValue) return sortOrder === 'asc' ? 1 : -1;
        return 0;
      });
    }
    
    // Apply pagination
    const page = params?.page || 1;
    const pageSize = params?.pageSize || 10;
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const paginatedUsers = filteredUsers.slice(startIndex, endIndex);
    
    return {
      success: true,
      message: "Users retrieved successfully",
      data: {
        items: paginatedUsers,
        pagination: {
          page,
          limit: pageSize,
          total: filteredUsers.length
        }
      }
    };
  },
  
  get: async (id: number): Promise<ApiResponse<User>> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 400));
    
    const user = mockUsers.find(u => u.id === id);
    
    if (user) {
      return {
        success: true,
        message: "User retrieved successfully",
        data: user
      };
    } else {
      return {
        success: false,
        message: "User not found",
        errorCode: 404
      };
    }
  },
  
  remove: async (id: number): Promise<ApiResponse<null>> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const userIndex = mockUsers.findIndex(u => u.id === id);
    
    if (userIndex !== -1) {
      // Remove user from mock data (simulate deletion)
      mockUsers.splice(userIndex, 1);
      return {
        success: true,
        message: "User deleted successfully",
        data: null
      };
    } else {
      return {
        success: false,
        message: "User not found",
        errorCode: 404
      };
    }
  },
};
