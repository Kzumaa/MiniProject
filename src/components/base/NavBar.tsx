import { Link, NavLink } from 'react-router-dom'
import { useAuth } from '@/context/AuthContext'

const active = ({ isActive }: { isActive: boolean }) =>
  'px-3 py-2 rounded-lg text-sm ' + (isActive ? 'bg-gray-900 text-white' : 'text-gray-700 hover:bg-gray-200')

export default function NavBar() {
  const { isAuthenticated, user, logout } = useAuth()

  return (
    <nav className="border-b bg-white">
      <div className="mx-auto container-narrow px-4 h-14 flex items-center justify-between gap-4">
        <Link to="/" className="font-semibold">FE Base</Link>
        <div className="flex items-center gap-1">
          <NavLink to="/" className={active} end>Home</NavLink>
          <NavLink to="/users" className={active}>Users</NavLink>
          {user?.role === 'admin' && <NavLink to="/admin" className={active}>Admin</NavLink>}
          {user?.role === 'mentor' && <NavLink to="/mentor" className={active}>Mentor</NavLink>}
          {user?.role === 'mentee' && <NavLink to="/mentee" className={active}>Mentee</NavLink>}
        </div>
        <div className="flex items-center gap-2">
          {isAuthenticated ? (
            <>
              <span className="text-sm text-gray-600 hidden sm:inline">{user?.name} · {user?.role}</span>
              <button className="px-3 py-1.5 rounded-lg border" onClick={logout}>Logout</button>
            </>
          ) : (
            <NavLink to="/login" className={active}>Login</NavLink>
          )}
        </div>
      </div>
    </nav>
  )
}
