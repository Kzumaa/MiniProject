import { Routes, Route } from "react-router-dom";
import BaseLayout from "@/layouts/BaseLayout";
import Dashboard from "@/pages/Dashboard";
import About from "@/pages/About";
import Login from "@/pages/auth/Login";
import NotAuthorized from "@/pages/system/NotAuthorized";
import AdminPage from "@/pages/admin/AdminPage";
import MentorPage from "@/pages/mentor/MentorPage";
import MenteePage from "@/pages/mentee/MenteePage";
import RequireAuth from "@/components/auth/RequireAuth";
import RequireRole from "@/components/auth/RequireRole";

export default function App() {
  return (
    <Routes>
      <Route element={<BaseLayout />}>
        {/* Default page */}
        <Route index element={<Dashboard />} />

        <Route path="about" element={<About />} />
        <Route path="login" element={<Login />} />
        <Route path="not-authorized" element={<NotAuthorized />} />

        <Route
          path="admin"
          element={
            <RequireRole roles={["admin"]}>
              <AdminPage />
            </RequireRole>
          }
        />
        <Route
          path="mentor"
          element={
            <RequireRole roles={["mentor"]}>
              <MentorPage />
            </RequireRole>
          }
        />
        <Route
          path="mentee"
          element={
            <RequireRole roles={["mentee"]}>
              <MenteePage />
            </RequireRole>
          }
        />

        <Route path="*" element={<div className="p-8">Not Found</div>} />
      </Route>
    </Routes>
  );
}
