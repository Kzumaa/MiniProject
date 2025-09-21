import React, { useEffect, useMemo, useRef, useState } from "react";
import { authApi } from "@/requests/modules/auth";
import { AuthContext, type AuthState } from "@/providers/contexts/AuthContext";
import type { User } from "@/types";

export const AuthProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("auth_token")
  );
  const [loading, setLoading] = useState(false);

  // Prevent redundant bootstrap runs (StrictMode mounts twice in dev)
  const lastBootTokenRef = useRef<string | null>(null);

  useEffect(() => {
    // Only run when token actually changes value
    if (token === lastBootTokenRef.current) return;
    lastBootTokenRef.current = token;

    if (!token) {
      // ensure clean state if token removed
      setUser((u) => (u ? null : u));
      return;
    }

    let cancelled = false;
    (async () => {
      setLoading(true);
      try {
        const res = await authApi.me();
        if (!cancelled && res.success && res.data) {
          // avoid useless state churn
          setUser((prev) => (prev?.id === res.data!.id ? prev : res.data!));
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [token]);

  const login = async (username: string, password: string) => {
    setLoading(true);
    try {
      const res = await authApi.login(username, password);
      if (!res.success || !res.data)
        throw new Error(res.message || "Login failed");
      localStorage.setItem("auth_token", res.data.token ?? "");
      setToken(res.data.token ?? null);
      setUser(res.data);
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      await authApi.logout();
    } catch {}
    localStorage.removeItem("auth_token");
    setToken(null);
    setUser(null);
  };

  const value = useMemo<AuthState>(
    () => ({
      user,
      role: user?.role ?? null,
      token,
      login,
      logout,
      loading,
    }),
    [user, token, loading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
