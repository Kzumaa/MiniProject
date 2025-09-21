import React from "react";

export type ToastState = {
  show: (
    msg: string,
    severity?: "success" | "error" | "info" | "warning"
  ) => void;
};

export const ToastContext = React.createContext<ToastState | null>(null);