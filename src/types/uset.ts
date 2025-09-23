import type { Role } from "@/types";

export interface User {
    id: number;
    role: Role;
    fullName: string;
    username: string;
    email: string;
    description?: string;
    createdAt: string;
    updatedAt: string;
    assignedSubjects?: SubjectInfo[];
}

export interface SubjectInfo {
    id: number;
    name: string;
}