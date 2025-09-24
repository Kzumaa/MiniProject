export interface MenteeSubjectRegistration  {
    id: number;
    menteeId: number;
    subjectId: number;
    createdAt: string;
    updatedAt: string;
    subjectName: string; 
    menteeFullName: string;
    startDate?: string;
    endDate?: string;
}

export interface MenteeMentorRegistration  {
    id: number;
    menteeId: number;
    mentorId: number;
    createdAt: string;
    updatedAt: string;
    mentorName: string; 
    menteeName: string;
    startDate?: string;
    endDate?: string;
}