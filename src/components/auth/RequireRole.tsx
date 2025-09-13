import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '@/context/AuthContext'
import type { Role } from '@/types'

export default function RequireRole({ roles, children }: { roles: Role[]; children: JSX.Element }) {
  const { hasRole, isAuthenticated } = useAuth()
  const location = useLocation()

  if (!isAuthenticated) return <Navigate to="/login" replace state={{ from: location }} />
  if (!hasRole(roles)) return <Navigate to="/not-authorized" replace />
  return children
}
