import { ToastContext } from "@/providers/contexts/ToastContext";
import { useContext } from "react";

export const useToast = () => {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used within ToastProvider");
  return ctx;
};