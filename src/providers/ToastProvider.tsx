import React, { useState, useCallback, useMemo } from "react";
import { Alert, Snackbar } from "@mui/material";
import {
  ToastContext,
  type ToastState,
} from "@/providers/contexts/ToastContext";

export const ToastProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const [open, setOpen] = useState(false);
  const [msg, setMsg] = useState("");
  const [severity, setSeverity] = useState<
    "success" | "error" | "info" | "warning"
  >("info");

  const show = useCallback(
    (m: string, s: "success" | "error" | "info" | "warning" = "info") => {
      setMsg(m);
      setSeverity(s);
      setOpen(true);
    },
    []
  );

  const value = useMemo<ToastState>(
    () => ({
      show,
    }),
    [show]
  );

  return (
    <ToastContext.Provider value={value}>
      {children}
      <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={() => setOpen(false)}
      >
        <Alert
          onClose={() => setOpen(false)}
          severity={severity}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {msg}
        </Alert>
      </Snackbar>
    </ToastContext.Provider>
  );
};
