export type Role = 'ADMIN' | 'MENTEE' | 'MENTOR';

export interface User {
  id: number;
  role: Role;
  fullName: string;
  username: string;
  email: string;
  description?: string;
  createdAt: string;
  updatedAt: string;
  token?: string; // FE only
}

export interface Subject {
  id: number;
  name: string;
  description?: string;
  createdAt: string;
  updatedAt: string;
  mentorIds?: number[];
}

export interface Mentor {
  id: number;
  fullName: string;
  email: string;
  bio?: string;
  subjectIds?: number[];
  createdAt: string;
  updatedAt: string;
}

export interface Registration {
  id: number;
  menteeId: number;
  mentorId?: number;
  subjectId?: number;
  createdAt: string;
}

export interface ApiPagination {
  page: number;
  limit: number;
  total: number;
}

export interface ApiList<T> {
  pagination: ApiPagination;
  items: T[];
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data?: T;
  errorCode?: number;
}
