import { createBrowserRouter, Navigate } from "react-router-dom";
import AppLayout from "@/layout/AppLayout";
// import LoginPage from "@/pages/auth/LoginPage";
import ProtectedRoute from "./ProtectedRoute";
import UserManagementPage from "@/pages/admin/UserManagementPage";
import MyRegistrationsPage from "@/pages/mentee/MyRegistrationsPage";

// import SubjectsPage from "@/pages/admin/SubjectsPage";
// import SubjectForm from "@/pages/admin/SubjectForm";
// import MentorsPage from "@/pages/admin/MentorsPage";
// import MentorForm from "@/pages/admin/MentorForm";
// import AssignSubjectsPage from "@/pages/admin/AssignSubjectsPage";

// import MentorListPage from "@/pages/mentee/MentorListPage";
// import SubjectListPage from "@/pages/mentee/SubjectListPage";
// import RegisterMentorPage from "@/pages/mentee/RegisterMentorPage";
// import RegisterSubjectPage from "@/pages/mentee/RegisterSubjectPage";

// import MyRegistrationsPage from "@/pages/shared/MyRegistrationsPage";
// import MentorMySubjects from "@/pages/mentor/MySubjectsPage";
// import MentorMyRegistrations from "@/pages/mentor/MyRegistrationsPage";

export const router = createBrowserRouter([
  // { path: "/login", element: <LoginPage /> },

  {
    // element: <ProtectedRoute />, // any logged-in user
    children: [
      {
        path: "/",
        element: <AppLayout />,
        children: [
          { index: true, element: <Navigate to="/admin/users" replace /> },

          // Shared
          // { path: "registrations", element: <MyRegistrationsPage /> },

          // Admin only
          {
            // element: <ProtectedRoute roles={["ADMIN"]} />,
            children: [
              { path: "admin/users", element: <MyRegistrationsPage /> },
              //  { path: "admin/users", element: <UserManagementPage /> },


              //   { path: "admin/subjects/new", element: <SubjectForm /> },
              //   { path: "admin/subjects/:id", element: <SubjectForm /> },
              //   { path: "admin/mentors", element: <MentorsPage /> },
              //   { path: "admin/mentors/new", element: <MentorForm /> },
              //   { path: "admin/mentors/:id", element: <MentorForm /> },
              //   { path: "admin/assign", element: <AssignSubjectsPage /> },
            ],
          },

          // Mentee
          {
            element: <ProtectedRoute roles={["MENTEE"]} />,
            children: [
              // { path: "mentee/mentors", element: <MentorListPage /> },
              // { path: "mentee/subjects", element: <SubjectListPage /> },
              // {
              //   path: "mentee/register/mentor/:id",
              //   element: <RegisterMentorPage />,
              // },
              // {
              //   path: "mentee/register/subject/:id",
              //   element: <RegisterSubjectPage />,
              // },
              { path: "mentee/registrations", element: <MyRegistrationsPage /> },
            ],
          },

          // Mentor
          {
            element: <ProtectedRoute roles={["MENTOR"]} />,
            children: [
              // { path: "mentor/subjects", element: <MentorMySubjects /> },
              // {
              //   path: "mentor/registrations",
              //   element: <MentorMyRegistrations />,
              // },
            ],
          },
        ],
      },
    ],
  },

  { path: "*", element: <Navigate to="/" replace /> },
]);
