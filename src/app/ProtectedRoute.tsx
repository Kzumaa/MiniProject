import { Navigate, Outlet } from "react-router-dom";
import type { Role } from "@/types";
import { useAuth } from "@/providers/hooks/useAuth";

export default function ProtectedRoute({ roles }: { roles?: Role[] }) {
  const { user, loading } = useAuth();
  if (loading) return null; // could show a spinner
  if (!user) return <Navigate to="/login" replace />;
  if (roles && !roles.includes(user.role)) return <Navigate to="/" replace />;
  return <Outlet />;
}
