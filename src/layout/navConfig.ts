import type { Role } from '@/types';

type NavItem = { label: string; to: string; icon?: React.ReactNode };

export const navByRole: Record<Role, NavItem[]> = {
  ADMIN: [
    { label: 'Subjects', to: '/admin/subjects' },
    { label: 'Mentors', to: '/admin/mentors' },
    { label: 'Assign', to: '/admin/assign' },
    { label: 'Registrations', to: '/registrations' },
  ],
  MENTEE: [
    { label: 'Mentors', to: '/mentee/mentors' },
    { label: 'Subjects', to: '/mentee/subjects' },
    { label: 'My Registrations', to: '/registrations' },
  ],
  MENTOR: [
    { label: 'My Subjects', to: '/mentor/subjects' },
    { label: 'My Registrations', to: '/mentor/registrations' },
  ],
};
