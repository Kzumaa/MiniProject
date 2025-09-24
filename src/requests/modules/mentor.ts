// import { httpClient } from '@/requests/HttpClient'; // Commented out for mock data
import type { ApiList, ApiResponse, ListRequestParams } from '@/types';
import type { Mentor } from '@/types/mentor';

// Mock data for development
const mockMentors: Mentor[] = [
  {
    id: 1,
    fullName: "Dr. Sarah Johnson",
    email: "sarah.johnson@university.edu",
    description: "Experienced software engineer with 10+ years in full-stack development. Specializes in React, Node.js, and cloud architecture. Passionate about mentoring the next generation of developers.",
    assignedSubjects: [
      { id: 1, name: "React Development" },
      { id: 2, name: "JavaScript Fundamentals" },
      { id: 3, name: "Web Architecture" }
    ]
  },
  {
    id: 2,
    fullName: "Prof. Michael Chen",
    email: "m.chen@techcorp.com",
    description: "Senior Data Scientist and ML Engineer. Expert in Python, TensorFlow, and statistical analysis. Published researcher with focus on practical AI applications.",
    assignedSubjects: [
      { id: 4, name: "Machine Learning" },
      { id: 5, name: "Python Programming" },
      { id: 6, name: "Data Analysis" }
    ]
  },
  {
    id: 3,
    fullName: "Emily Rodriguez",
    email: "emily.rodriguez@startup.io",
    description: "Mobile app developer and UI/UX specialist. Created multiple successful iOS and Android applications. Strong advocate for user-centered design principles.",
    assignedSubjects: [
      { id: 7, name: "Mobile Development" },
      { id: 8, name: "UI/UX Design" },
      { id: 9, name: "Swift Programming" }
    ]
  },
  {
    id: 4,
    fullName: "David Kumar",
    email: "david.kumar@cloudtech.com",
    description: "DevOps engineer and cloud infrastructure specialist. Extensive experience with AWS, Docker, and Kubernetes. Helps teams build scalable and reliable systems.",
    assignedSubjects: [
      { id: 10, name: "DevOps Practices" },
      { id: 11, name: "Cloud Computing" },
      { id: 12, name: "System Administration" }
    ]
  },
  {
    id: 5,
    fullName: "Dr. Lisa Wang",
    email: "lisa.wang@research.org",
    description: "Cybersecurity researcher and ethical hacking expert. Focuses on network security, penetration testing, and security awareness training.",
    assignedSubjects: [
      { id: 13, name: "Cybersecurity" },
      { id: 14, name: "Network Security" },
      { id: 15, name: "Ethical Hacking" }
    ]
  },
  {
    id: 6,
    fullName: "James Thompson",
    email: "james.thompson@gamedev.com",
    description: "Game developer with expertise in Unity and Unreal Engine. Created several indie games and worked on AAA titles. Passionate about interactive storytelling.",
    assignedSubjects: [
      { id: 16, name: "Game Development" },
      { id: 17, name: "Unity 3D" },
      { id: 18, name: "C# Programming" }
    ]
  },
  {
    id: 7,
    fullName: "Anna Kowalski",
    email: "anna.kowalski@fintech.com",
    description: "Backend engineer specializing in microservices and distributed systems. Expert in Java, Spring Boot, and database optimization.",
    assignedSubjects: [
      { id: 19, name: "Backend Development" },
      { id: 20, name: "Java Programming" },
      { id: 21, name: "Database Design" }
    ]
  },
  {
    id: 8,
    fullName: "Robert Lee",
    email: "robert.lee@aicompany.ai",
    description: "AI researcher working on natural language processing and computer vision. Published multiple papers on deep learning applications.",
    assignedSubjects: [
      { id: 22, name: "Artificial Intelligence" },
      { id: 23, name: "Deep Learning" },
      { id: 24, name: "Computer Vision" }
    ]
  },
  {
    id: 9,
    fullName: "Maria Gonzalez",
    email: "maria.gonzalez@webagency.com",
    description: "Frontend specialist and creative developer. Expert in modern CSS, animations, and accessibility. Advocates for inclusive web design.",
    assignedSubjects: [
      { id: 25, name: "Frontend Development" },
      { id: 26, name: "CSS Advanced" },
      { id: 27, name: "Web Accessibility" }
    ]
  },
  {
    id: 10,
    fullName: "Ahmed Hassan",
    email: "ahmed.hassan@blockchain.org",
    description: "Blockchain developer and cryptocurrency expert. Builds decentralized applications and smart contracts on various blockchain platforms.",
    assignedSubjects: [
      { id: 28, name: "Blockchain Development" },
      { id: 29, name: "Smart Contracts" },
      { id: 30, name: "Cryptocurrency" }
    ]
  }
];

export const mentorApi = {
  list: async (params?: ListRequestParams<Mentor>): Promise<ApiResponse<ApiList<Mentor>>> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    let filteredMentors = [...mockMentors];
    
    // Apply search filter
    if (params?.search) {
      const searchTerm = params.search.toLowerCase();
      filteredMentors = filteredMentors.filter(mentor =>
        mentor.fullName.toLowerCase().includes(searchTerm) ||
        mentor.email.toLowerCase().includes(searchTerm) ||
        mentor.description?.toLowerCase().includes(searchTerm) ||
        mentor.assignedSubjects?.some(subject => 
          subject.name.toLowerCase().includes(searchTerm)
        )
      );
    }
    
    // Apply sorting
    if (params?.name && params?.sort) {
      const sortField = params.name;
      const sortOrder = params.sort;
      
      filteredMentors.sort((a, b) => {
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
    const paginatedMentors = filteredMentors.slice(startIndex, endIndex);
    
    return {
      success: true,
      message: "Mentors retrieved successfully",
      data: {
        items: paginatedMentors,
        pagination: {
          page,
          limit: pageSize,
          total: filteredMentors.length
        }
      }
    };
  },
  
  get: async (id: number): Promise<ApiResponse<Mentor>> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const mentor = mockMentors.find(m => m.id === id);
    
    if (mentor) {
      return {
        success: true,
        message: "Mentor retrieved successfully",
        data: mentor
      };
    } else {
      return {
        success: false,
        message: "Mentor not found",
        errorCode: 404
      };
    }
  },
}