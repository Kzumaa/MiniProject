import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import type { AuthUser, LoginInput, Role, AuthResponse } from "@/types";
import { useNavigate } from "react-router-dom";
import { AuthApi } from "@/api/resources/AuthApi";
import { HttpClient } from "@/api/http/HttpClient";

const STORAGE_KEY = "auth";

type AuthValue = {
  user: AuthUser | null;
  token: string | null;
  isAuthenticated: boolean;
  hasRole: (r: Role | Role[]) => boolean;
  login: (cred: LoginInput) => Promise<void>;
  logout: () => void;
  setAuth: (payload: { token: string; user: AuthUser } | null) => void;
};

const AuthContext = createContext<AuthValue | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<AuthUser | null>(null);
  const navigate = useNavigate();

  // Local Auth API instance (no useAuth/useApi here -> no circular hooks)
  const authApi = useMemo(() => new AuthApi(new HttpClient()), []);

  useEffect(() => {
    const raw = localStorage.getItem("auth");
    if (raw) {
      try {
        const parsed = JSON.parse(raw);
        setToken(parsed.token ?? null);
        setUser(parsed.user ?? null);
      } catch {}
    }
  }, []);

  const setAuth = (payload: { token: string; user: AuthUser } | null) => {
    if (!payload) {
      setToken(null);
      setUser(null);
      localStorage.removeItem("auth");
      return;
    }
    setToken(payload.token);
    setUser(payload.user);
    localStorage.setItem("auth", JSON.stringify(payload));
  };

  const login = async (cred: LoginInput) => {
    const res: AuthResponse = await authApi.login(cred);
    setAuth(res);
  };

  const logout = () => {
    setAuth(null);
    navigate("/login");
  };

  const hasRole = (r: Role | Role[]) => {
    const roles = Array.isArray(r) ? r : [r];
    return !!user && roles.includes(user.role);
  };

  const value = useMemo(
    () => ({
      user,
      token,
      isAuthenticated: !!token && !!user,
      hasRole,
      login,
      logout,
      setAuth,
    }),
    [user, token]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};
