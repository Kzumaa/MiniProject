import { NavLink, Link } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

type Item = { to: string; label: string; end?: boolean };

const itemClass = ({ isActive }: { isActive: boolean }) =>
  "block px-3 py-2 rounded-xl text-sm " +
  (isActive ? "bg-gray-900 text-white" : "text-gray-700 hover:bg-gray-200");

export default function Sidebar() {
  const { isAuthenticated, user, logout } = useAuth();

  // Base items
  const items: Item[] = [{ to: "/", label: "Dashboard", end: true }];

  // Role-specific items
  if (user?.role === "admin") {
    items.push(
      { to: "/admin", label: "Admin" },
      { to: "/users", label: "Users" }
    );
  }
  if (user?.role === "mentor") items.push({ to: "/mentor", label: "Mentor" });
  if (user?.role === "mentee") items.push({ to: "/mentee", label: "Mentee" });

  // Always available
  items.push({ to: "/about", label: "About" });
  if (!isAuthenticated) items.push({ to: "/login", label: "Login" });

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 border-r bg-white flex flex-col">
      <div className="h-14 flex items-center justify-between px-4 border-b">
        <Link to="/" className="font-semibold">
          FE Base
        </Link>
      </div>

      <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
        {items.map((it) => (
          <NavLink key={it.to} to={it.to} end={it.end} className={itemClass}>
            {it.label}
          </NavLink>
        ))}
      </nav>

      <div className="border-t p-3 text-sm text-gray-600 flex items-center justify-between">
        {isAuthenticated ? (
          <>
            <div className="min-w-0">
              <div className="truncate font-medium">{user?.name}</div>
              <div className="text-xs text-gray-500">{user?.role}</div>
            </div>
            <button className="px-3 py-1.5 rounded-lg border" onClick={logout}>
              Logout
            </button>
          </>
        ) : (
          <div className="text-xs">Not signed in</div>
        )}
      </div>
    </aside>
  );
}
