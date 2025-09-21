import type { Role, User } from "@/types";
import React from "react";

export type AuthState = {
  user: User | null;
  role: Role | null;
  token: string | null;
  login: (username: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  loading: boolean;
};

export const AuthContext = React.createContext<AuthState | null>(null);