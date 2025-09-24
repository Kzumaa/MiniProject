import type { SubjectInfo } from "@/types/uset";

export interface Mentor {
    id: number;
    fullName: string;
    email: string;
    description?: string;
    assignedSubjects?: SubjectInfo[];
}
