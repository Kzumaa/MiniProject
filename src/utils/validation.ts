import * as yup from 'yup';

export const loginSchema = yup.object({
  username: yup.string().required('Username is required'),
  password: yup.string().required('Password is required'),
}).required();

export const subjectSchema = yup.object({
  name: yup.string().required('Name is required'),
  description: yup.string().optional(),
});

export const mentorSchema = yup.object({
  fullName: yup.string().required('Full name is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  bio: yup.string().optional(),
});
